import * as items from "../data/catalog.js";

let filters = document.getElementsByClassName("header__filters_navigation_submenu");
let containers = document.getElementsByClassName("user_chosen");
let allItems = items.catalog;
let usedArr = [];
for(let i=0; i<allItems.length;i++){
    usedArr[i] = allItems[i];
}

for(let i=0;i<filters.length;i++){
    filters[i].addEventListener("click",(event) =>{
        let target = event.target;
        containers[i].innerText = target.innerText;
        for(let j = 0; j<usedArr.length;j++){
            usedArr.filter(function(item){
                return item[j].containers[i] == target.innerText;
            });
        }
    })
}

