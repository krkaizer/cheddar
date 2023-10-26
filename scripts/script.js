document.getElementById("main-action-button").onclick = function () {
    document.getElementById("products").scrollIntoView({behavior:"smooth"});
}

let links = document.querySelectorAll('.menu-item > a');

for (let i = 0; i < links.length; i++) {
    links[i].onclick = function () {
        document.getElementById(links[i].getAttribute("data-link")).scrollIntoView({behavior:"smooth"});
    }
}

let buttons = document.getElementsByClassName("product-button");

for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function () {
        document.getElementById("order").scrollIntoView({behavior:"smooth"});
        //заполнение формы
        document.getElementById('burger').value = this.closest('.products-item').querySelector('.products-item-title').innerText;
    }
}

//движение
document.getElementById('mainBurger').onmousemove = function (e) {
    document.getElementById('mainBurger').style.transform = 'translate(-' + ((e.clientX * 0.3) / 8) + 'px, -' + ((e.clientY * 0.3) / 8) + 'px)';
}

document.getElementById('mainOrder').onmousemove = function (e) {
    document.getElementById('mainOrder').style.transform = 'translate(-' + ((e.clientX * 0.3) / 8) + 'px, -' + ((e.clientY * 0.3) / 8) + 'px)';
}

//заказ
let burger = document.getElementById("burger");
let name = document.getElementById("name");
let phone = document.getElementById("phone");
document.getElementById("order-action").onclick = function () {
    let hasError = false;

    [burger, name, phone].forEach(item => {
        if (!item.value) {
            item.parentElement.style.background = "red";
            hasError = true;
        } else {
            item.parentElement.style.background = "";
        }
    });

    if (!hasError) {
        [burger, name, phone].forEach(item => {
            item.value = "";
        });
        alert("Спасибо за заказ! Мы скоро свяжемся с вами!");
    }
}

let prices = document.getElementsByClassName("products-item-price");

document.getElementById("change-currency").onclick = function (e) {
    let currentCurrency = e.target.innerText;

    let newCurrency = "$";
    let coefficient = 1;

    if (currentCurrency === "$") {
        newCurrency = "₽";
        coefficient = 80;
    } else if (currentCurrency === "₽") {
        newCurrency = "BYN";
        coefficient = 3; //т.к. работает от базовой валюты, коэфф к бел. руб = 3
    } else if (currentCurrency === 'BYN') {
        newCurrency = '€';
        coefficient = 0.9;
    } else if (currentCurrency === '€') {
        newCurrency = '¥';
        coefficient = 6.9;
    } else if (currentCurrency === "¥") {
        newCurrency = "RSD"; //сербский динар
        coefficient = 110;
    } else if (currentCurrency === "RSD") {
        newCurrency = "₺"; //турецкая лира
        coefficient = 28;
    }

    e.target.innerText = newCurrency;

    for (let i = 0; i < prices.length; i++) {
        prices[i].innerText = +(prices[i].getAttribute("data-base-price") * coefficient).toFixed(1) + " " + newCurrency;
    }
}