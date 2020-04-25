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
 

let sizes = document.querySelector(".main__right_size");

sizes.addEventListener("click",(event) => {

    event.stopPropagation();

    let elements = sizes.querySelectorAll(".main__right_size_item");

    for(let i=0;i<elements.length;i++){
        elements[i].classList.remove("active");
    }

    let target = event.target;
    target.classList.add("active");
});


let colours = document.querySelector(".main__right_color");

colours.addEventListener("click",(event) => {

    event.stopPropagation();

    let elements = colours.querySelectorAll(".main__right_color_item");

    for(let i=0;i<elements.length;i++){
        elements[i].classList.remove("active");
    }

    let target = event.target;
    target.classList.add("active");
});

import * as data from '../data/catalog.js';

let buy = document.querySelector(".main__right_add");
buy.addEventListener("click",(event) => {
    event.preventDefault();

    let item_name = document.querySelector(".main__right_head");
    let item_obj;

    for(let i=0;i<data.catalog.length;i++){
        if(item_name.innerText == data.catalog[i].title){
            item_obj = data.catalog[i];
        }
    }
    itemsArray.push(item_obj.discountedPrice);
    localStorage.setItem("items",JSON.stringify(itemsArray));
    quantity.innerText = parseInt(quantity.innerText) + 1
    ;
    quantityArr.push(1)
    localStorage.setItem("quantity",JSON.stringify(quantityArr))
    if(price.innerText === "Bag"){
        price.innerText = "£" +item_obj.discountedPrice;
    }
    else {
        price.innerText = parseInt(price.innerText.slice(1)) + item_obj.discountedPrice;
        price.innerText = "£" +price.innerText;
    }
});

let big_photo = document.querySelector(".big_picture")
let small_photos = document.querySelectorAll(".small_picture")
for(let i =0;i<small_photos.length;i++){
    small_photos[i].addEventListener("click",(event) => {
        let bufer;
        let target  =  event.target
        bufer = big_photo.src;
        big_photo.src = target.src;
        big_photo.setAttribute("height","395px");
        target.src = bufer;
        target.setAttribute("height","130px");
    })
}
