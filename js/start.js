"use strict";
import * as data from "../data/best-offer.js";
import * as items from "../data/catalog.js"

let buy = document.querySelector(".article__total_add");
let price = document.querySelector(".bag_price");
let quantity = document.querySelector(".quantity");

let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
let quantityArr = localStorage.getItem('quantity') ? JSON.parse(localStorage.getItem('quantity')) : [];

localStorage.setItem("items",JSON.stringify(itemsArray));
localStorage.setItem("quantity",JSON.stringify(quantityArr))

let saved = JSON.parse(localStorage.getItem("items"));
let savequan = JSON.parse(localStorage.getItem("quantity"));

price.innerText  = saved.length == 0 ? "Bag":saved.reduce(function(summary,current){
   return summary + current;
},0);

quantity.innerText  = savequan.length == 0 ? "0":savequan.reduce(function(summary,current){
    return summary + current;
 },0);

function updateQuantity(updated){
    quantity.innerText = +(quantity.innerText) +updated ;
    quantityArr.push(+(updated))
    localStorage.setItem("quantity",JSON.stringify(quantityArr))
}

function checkBag(){
    if( price.innerText == "Bag"){
        price.innerText ="0";
    }
}

buy.onclick = (event) => {
    event.preventDefault();
    let offer_price = document.querySelector(".article__total_new");
    checkBag();

    price.innerText = +(price.innerText) + +(offer_price.innerText.slice(1));
    updateQuantity(2);

    itemsArray.push(+(offer_price.innerText.slice(1)));
    localStorage.setItem("items",JSON.stringify(itemsArray));

}
let goods =document.querySelectorAll(".aside__goods-item");
for(let i =0; i<goods.length;i++){
    goods[i].onclick = () =>{
        let item_price = goods[i].querySelector(".aside__goods_item_photo_desc");
        checkBag();
        price.innerText = +(price.innerText) + +(item_price.innerText.slice(1));
        updateQuantity(1);
        itemsArray.push(+(item_price.innerText.slice(1)));
        localStorage.setItem("items",JSON.stringify(itemsArray));
    }
}

let best_offer1 = document.querySelector(".article__new_content")
let best_offer2 = document.querySelector(".article__jeans_content")

let picture_offer1 = document.querySelector(".article__new_content_photo");
let text_offer1 = document.querySelector(".article__new_content_head");
let price_offer1 = document.querySelector(".article__new_content_desc");
let price_offer2 = document.querySelector(".article__new_content_desc");

let slider_content = data.bestOffer.left;
let content_flag = 0;

let totalgray =document.querySelector(".old");
let totaldisc = document.querySelector(".article__total_new");

function updateTotal(){
totaldisc.innerText =  +(price_offer1.innerText.slice(1)) +  +(price_offer2.innerText.slice(1));
totalgray.innerText = +(totaldisc.innerText) - 15;
totaldisc.innerText =  "G" + totaldisc.innerText;
}


let up = best_offer1.querySelector(".up");
up.addEventListener("click",(event) => {
    event.preventDefault();
    content_flag++;

	if( content_flag === slider_content.length){
        content_flag = 0;
     }
     let item_obj;

     for(let j=0;j<items.catalog.length;j++){
         if(slider_content[content_flag] == items.catalog[j].id){
             item_obj = items.catalog[j];
         }
     }
     text_offer1.innerText = item_obj.title;
    price_offer1.innerText = "G" +item_obj.price;
    updateTotal()
})

let down = best_offer1.querySelector(".down");
down.addEventListener('click', function (event) {
    event.preventDefault();
    content_flag--;

    if( content_flag< 0){
        content_flag = slider_content.length;
        content_flag--;
    }
	
     let item_obj;

     for(let j=0;j<items.catalog.length;j++){
         if(slider_content[content_flag] == items.catalog[j].id){
             item_obj = items.catalog[j];
         }
     }
     text_offer1.innerText = item_obj.title;
    price_offer1.innerText = "G" +item_obj.price;
    updateTotal()
  });  
