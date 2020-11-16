'use strict';

const data = [
    {id: 1, title: 'Mango People T-shirt', price: '$51.00', img: 'img/product-1.jpg'},
    {id: 2, title: 'Mango People T-shirt', price: '$52.00', img: 'img/product-2.jpg'},
    {id: 3, title: 'Mango People T-shirt', price: '$53.00', img: 'img/product-3.jpg'},
    {id: 4, title: 'Mango People T-shirt', price: '$54.00', img: 'img/product-4.jpg'},
    {id: 5, title: 'Mango People T-shirt', price: '$55.00', img: 'img/product-5.jpg'},
    {id: 6, title: 'Mango People T-shirt', price: '$56.00', img: 'img/product-6.jpg'},
    {id: 7, title: 'Mango People T-shirt', price: '$57.00', img: 'img/product-7.jpg'},
    {id: 8, title: 'Mango People T-shirt', price: '$58.00', img: 'img/product-8.jpg'},
];

class ProductsAll{
    constructor(selector, products) {
        this.selector = selector;
        this.data = [...products];
        this.render();
    }

    render() {
        let block = document.querySelector(this.selector);
        for (let item of this.data){
            let product = new ProductOne(item);
            block.insertAdjacentHTML('beforeend', product.render());
            console.log(product.render());
        }

    }

    // Метод определяет суммарную стоимость всех товаров на странице
    countProductsPrice()
    {
        let sum = 0;
        this.data.forEach(element => {
            sum += element.price;
        });
        return sum;
    }
}

class ProductOne{
    constructor(product) {
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.img = product.img;
    }

    render() {
  return ` <div class="product">
            <a href="#">
                <img class="product-img" src="${this.img}" alt="${this.title}">
            </a>
            <div class="product-text">
            <a class="product-text-name" href="#">${this.title}</a>
            <p class="product-text-price">${this.price}</p>
            </div>
            <a class="product-add" href="#">
                <img class="cart_of_add" src="img/cart_of_add.svg" alt="add">Add to Cart
             </a>
    </div>`
    }
}

class CartList{
    // cartData - все товары в корзине
    constructor(cartData) {
        this.data = [...cartData];
        this.render();
    }

    // отобразить корзину
    render() {

    }

    // Посчитать итоговую стоимость всех товаров
    countCostCart(){}
}

class CartItem {
    // cartData - один товар из корзины
    constructor(cartData) {
        this.id = cartData.id;
        this.title = cartData.title;
        this.price = cartData.price;
        this.img = cartData.img;
        this.count = cartData.count;
    }

    // отобразить товар
    render() {

    }

    // Посчитать стоимость одного наименования товара в корзине
    countCost(){
        return this.totalPrice = this.price * this.count;
    }

    // Увеличить количество одного товара в корзине на 1
    increaseCount(){
        this.count++;
    }

    // Удалить товар из корзины
    removeItem(){
        this.count--;
    }
}


const products = new ProductsAll(".product-flex", data);


