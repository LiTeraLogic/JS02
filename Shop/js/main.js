class ProductsList{
    constructor(container = '.products'){
        this.container = container;
        this.goods = []; //массив товаров
//        this.allProducts=[]; //массив объектов
        this._fetchProducts();
    }
    _fetchProducts(){
        this.goods = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Mouse', price: 20},
            {id: 3, title: 'Keyboard', price: 200},
            {id: 4, title: 'Gamepad', price: 50},
        ];

        this.totalPrice();
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
    constructor(product,img='https://placehold.it/200x150'){
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
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

    // генерация товаров на страницу
    render(){
        const block = document.querySelector(this.container);
        for(let product of this.goods){
            const productObject = new ProductItem(product);
//            this.allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.render());
        }
    }
}

/**
 *
 */
class Cart{
    constructor(container = '.cart'){
        this.container = container;
        this.goods = []; //массив товаров в корзине
//        this.allProducts=[]; //массив объектов
        this.amount = 0; // сумма заказа
        this.countGoods = 0; // количество товаров в корзине
        this._fetchProducts();
    }

    _fetchProducts(){}

    // генерация корзины
    render(){}

    // увеличить количество товаров на 1
    addItem(){}

    // уменьшить количество товаров на 1
    delete(){}
}

/**
 *  Класс генерации одного элемента корзины
 */
class CartItem{
    constructor(product,img='https://placehold.it/200x150'){
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;
        this.count = 1;
    }

    // генерация одного товара в корзине
    render(){}
}

let list = new ProductsList();
list.render();
list.totalPrice();