let sizes = document.querySelector(".main__right_size");
sizes.addEventListener("click",(event) => {
    event.stopPropagation();
    let target = event.target;
    target.classList.toggle("active");
});
let colours = document.querySelector(".main__right_color");
colours.addEventListener("click",(event) => {
    event.stopPropagation();
    let target = event.target;
    target.classList.toggle("active");
});

let basket = document.querySelector(".header__top-line_right_bag-desc")
basket = JSON.stringify(localStorage.getItem("price"))


let add = document.querySelector(".main__right_add");
add.onclick = () =>{
    let price = document.querySelector(".main__right_price");
    let oldPrice = JSON.parse(localStorage.getItem("price"));
    localStorage.removeItem("price");
    let newprice = price.innerText +oldPrice;
    basket = newprice;
    localStorage.setItem("price",JSON.stringify(newprice));
}