import * as data from '../data/catalog.js';

let basket = document.querySelector(".bag_price");
let bottom_price = document.querySelector(".bottom_price");
let red_discount = document.querySelector(".section-2_main_total_discount");
let plus = document.getElementsByClassName("plus")
let counters = document.getElementsByClassName("counter")
let prices = document.getElementsByClassName("main__item_text_price")
let item_name = document.querySelectorAll(".main__item_text_head");
let items = document.getElementsByClassName("main__item");

let price = document.querySelector(".bag_price");
let quantity = document.querySelector(".quantity");

let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
let quantityArr = localStorage.getItem('quantity') ? JSON.parse(localStorage.getItem('quantity')) : [];

localStorage.setItem("items",JSON.stringify(itemsArray));
localStorage.setItem("quantity",JSON.stringify(quantityArr))

let saved = JSON.parse(localStorage.getItem("items"));
let savequan = JSON.parse(localStorage.getItem("quantity"));
let total_price = saved.reduce((summary,current) => summary + current,0);


price.innerText  = saved.length == 0 ? "Bag":saved.reduce(function(summary,current){
   return summary + current;
},0);

quantity.innerText  = savequan.length == 0 ? "0":savequan.reduce(function(summary,current){
    return summary + current;
 },0);

let remove  = document.getElementsByClassName("remove");
for( let i=0;i<remove.length;i++){
    remove[i].addEventListener("click",(event) => {
        event.preventDefault();

        let container = remove[i].closest(".main__item");
        container.setAttribute("style","display:none");
        let item_price = document.querySelectorAll(".main__item_text_price");
        let counter = document.querySelectorAll(".counter");

        quantity.innerText = Number(quantity.innerText) - Number(counter[i].innerText);

        total_price = total_price - Math.ceil(item_price[i].innerText.slice(1)*1000)/1000;
        basket.innerText = total_price;

        bottom_price.innerText = +bottom_price.innerText.slice(1) -  Math.ceil(item_price[i].innerText.slice(1)*1000)/1000;
        bottom_price.innerText = "£" + bottom_price.innerText;
        itemsArray[item_price] = 0;
        localStorage.setItem("items",JSON.stringify(itemsArray));
       })   
}

function cleanBasket(){
    basket.innerText = "";
    quantity.innerText = "0"
}

let empty = document.querySelector(".section-2_main_empty");
empty.addEventListener("click",(event) => {
    event.preventDefault();
    let main = document.querySelector(".main");
    main.setAttribute("style","display:flex;justify-content:center;align-items:center;height:200px");
    main.innerHTML = "<span class='after_click' style=' font-size:35px; color:black'>Your Basket Is empty.Use Catalog to add new items</span>" ;
    cleanBasket();
    localStorage.clear();
    bottom_price.innerText ="£"+0;
    red_discount.style.display = "none";
})

let purchase = document.querySelector(".section_main_checkout");
purchase.addEventListener("click",(event) => {
    event.preventDefault();
    let main = document.querySelector(".main");
    main.setAttribute("style","display:flex;justify-content:center;align-items:center;height:200px");
    main.innerHTML = "<span class='after_click' style='font-size:35px; color:black'>Thank you for your purchase</span>";
    localStorage.clear();
    cleanBasket();
});


for(let i =0; i<items.length;i++){
    let item_price = items[i].querySelector(".main__item_text_price");
    let counter = items[i].querySelector(".counter");

    total_price+= Math.ceil(item_price.innerText.slice(1)*1000)/1000;
    quantity.innerText = Number(quantity.innerText) +Number(counter.innerText);

}

basket.innerText = total_price;

bottom_price.innerText = "£"+total_price;


for(let i=0;i<plus.length;i++){
    plus[i].addEventListener("click",(event) =>{
        event.preventDefault();
        let item_price;

        for(let j=0;j<data.catalog.length;j++){
            if(item_name[i].innerText == data.catalog[j].title){
               let item_obj = data.catalog[j];

                item_price = item_obj.discountedPrice;

                prices[i].innerText= Math.ceil(prices[i].innerText.slice(1)*1000)/1000 + Math.ceil(item_price*1000)/1000;
                prices[i].innerText= "£"+ prices[i].innerText;
                counters[i].innerText = parseInt(counters[i].innerText) +1;
            }
        }
        quantity.innerText = Number(quantity.innerText) +1;
        quantityArr.push(1)
    localStorage.setItem("quantity",JSON.stringify(quantityArr))
    itemsArray.push(item_price);
        localStorage.setItem("items",JSON.stringify(itemsArray));
        total_price = total_price + Math.ceil(item_price*1000)/1000;
        basket.innerText = total_price;

        bottom_price.innerText = +bottom_price.innerText.slice(1) +  Math.ceil(item_price*1000)/1000;
        bottom_price.innerText = "£" + bottom_price.innerText;

    })
}


let minus = document.getElementsByClassName("minus");

for(let i=0;i<minus.length;i++){
    minus[i].addEventListener("click",(event) =>{
        event.preventDefault();
        let item_price;

        for(let j=0;j<data.catalog.length;j++){
            if(item_name[i].innerText == data.catalog[j].title){
               let item_obj = data.catalog[j];

                item_price = item_obj.discountedPrice;

                prices[i].innerText= Math.ceil(prices[i].innerText.slice(1)*1000)/1000 - Math.ceil(item_price*1000)/1000;
                prices[i].innerText= "£"+ prices[i].innerText;
                counters[i].innerText = parseInt(counters[i].innerText) -1;
            }
        }
        quantity.innerText = Number(quantity.innerText) -1;
        if(counters[i].innerText == "0"){
                    let container = minus[i].closest(".main__item");
                    container.setAttribute("style","display:none"); 
        }
        total_price = total_price - Math.ceil(item_price*1000)/1000;
        basket.innerText = total_price;
        itemsArray[item_price] = 0;
        localStorage.setItem("items",JSON.stringify(itemsArray))

        bottom_price.innerText = +bottom_price.innerText.slice(1) -  Math.ceil(item_price*1000)/1000;
        bottom_price.innerText = "£" + bottom_price.innerText;
    })
}