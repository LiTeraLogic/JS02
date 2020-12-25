// 'use strict'

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductsList{
    constructor(container = '.products'){
        this.container = container;
        this.goods = []; //массив товаров
        this.allProducts=[]; //массив объектов
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = [...data];
                this.render()
            });
    }
    _getProducts(){
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    // генерация товаров на страницу
    render(){
        const block = document.querySelector(this.container);
        for(let product of this.goods){
            const productObject = new ProductItem(product);
//            this.allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.render());
        }
    }

    // итоговая сумма всех товаров на странице
    totalPrice(){
        let price = 0;

        for(let product of this.goods){
            price += product.price;
        }
        console.log(price);
        return price;
    }
}

class ProductItem{
    constructor(product, img='https://placehold.it/200x150'){
        // this.title = product.title;
        this.title = product.product_name;
        this.price = product.price;
        // this.id = product.id;
        this.id = product.id_product;
        this.img = img;
    }

    // генерация карточки товара
    render(){
        return `<div class="product-item">
                <img src="${this.img}">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}

/**
 *
 */
class Cart{
    constructor(container = '.cart'){
        this.container = container;
        this.catrItems = []; //массив товаров в корзине
        this.amount = 0; // сумма заказа
        this.countGoods = 0; // количество товаров в корзине
        this._getCartItems()
            .then(data => {
                this.amount = data['amount'];
                this.countGoods = data['countGoods'];
                this.catrItems = [...data['contents']];
            })
            .then(() => this._render());
    }

    _getCartItems(){
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })

    }


    // генерация корзины
    _render(){
        const block = document.querySelector(this.container);
        for(let item of this.catrItems){
            const productObject = new CartItem(item);
//            this.allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.render());
        }
        block.insertAdjacentHTML('beforeend', this._renderAmount());
    }

    _renderAmount(){
        return `
            <div class="products-price">
                <p > Кол-во наименований: ${this.countGoods}</p>
                 <p > Итого: ${this.amount}</p>
            </div>
            `;
    }

    // увеличить количество товаров на 1
    addItem(){}

    // уменьшить количество товаров на 1
    delete(){}
}

/**
 *  Класс генерации одного элемента корзины
 */
class CartItem{
    constructor(product, img='https://placehold.it/50x100'){
        this.product_name = product.product_name;
        this.price = product.price;
        this.id_product = product.id_product;
        this.img = img;
        this.quantity = product.quantity;
    }

    // генерация одного товара в корзине
    render(){
        return `
        <div class="cart-item">
                <div class="left-block">
                    <img class="cart-image" src="${this.img}" alt="image">
                    <div class="product-list">
                        <p class="product-name">Наименование: ${this.product_name}</p>
                        <p class="product-price">Цена: ${this.price}</p>
                        <p class="product-number">Количество: ${this.quantity}</p>
                    </div>
                </div>
                <div class="right-block">                    
                    <button class="delete-btn">Del</button>
                </div>
            </div>`;
    }
}

let list = new ProductsList();
list.render();
list.totalPrice();

let cart = new Cart();