"use strict";
import {getData} from ".//data/catalog.js";

let drop_list = document.getElementsByClassName("header__filters_navigation_submenu");
drop_list.onclick = (event) => {
    let target  = event.target;
    console.log(target)
    let container = target.closest(".user_chosen")
    container.innerText = target.innerText;
};

let basket = document.querySelector(".header__top-line_right_bag-desc");
basket.innerText ="Bag(+" JSON.parse(localStorage.getItem("price")) +")";
 let items = [];
 for( let i=0;i<catalog.length;i++){
     items.i = catalog[i];
 }
 console.log(items);



let oldPrice = JSON.stringify(localStorage.getItem("price"));
let add = document.querySelector(".article__total_add");
add.addEventListener("click",(event) => {
    localStorage.removeItem("price");
    let newprice = add.innerText + oldPrice
    localStorage.setItem("price",JSON.parse(newprice))
    basket = JSON.stringify(localStorage.getItem("price"))
})
let remove  = document.getElementsByClassName("main__item_text_remove");
remove.addEventListener("click",(event) => {
 let target = event.taget;
 let container = taget.closest("div.main__item");
 container.setAttribute("display","none");
})

