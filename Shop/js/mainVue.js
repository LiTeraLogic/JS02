const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: "#app",
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        imgCatalog: 'https://placehold.it/200x150',

        cartUrl: '/getBasket.json',
        imgCart: 'https://placehold.it/50x100',
        productsCart: [],
        amount: 0, // сумма заказа
        countGoods:  0,  // количество товаров в корзине

        userSearch: '',
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(element){
            console.log(element.id_product);
            this.getJson(`${API}/addToBasket.json`) // проверка связи с  JSON документом
                .then(data => {
                    if(data.result === 1){
                        // console.log(product);
                        let productId = +element.id_product;
                        let find = this.productsCart.find(product => product.id_product === productId);
                        if(find){
                            find.quantity++;
                            this.amount = this.amount + find.price;
                            this._updateCart(find);
                            // сумма заказа
                        } else {
                            let product = {
                                id_product: productId,
                                price: +element.price,
                                product_name: element.product_name,
                                quantity: 1
                            };
                            // this.productsCart = [product];
                            this.amount = this.amount + product.price; // сумма заказа
                            ++this.countGoods;
                            this.productsCart.push(product);
                            console.log(this.productsCart)
                            // this.render();
                        }
                    } else {
                        alert('Error');
                    }
                })
        },

        _updateCart(product){
            let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
            block.querySelector('.product-number').textContent = `Количество: ${product.quantity}`;
            block.querySelector('.product-cost').textContent = `Стоимость: $${product.quantity*product.price}`;
        },

        removeProduct(element){
            this.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if(data.result === 1){
                        let productId = +element.id_product;
                        let find = this.productsCart.find(product => product.id_product === productId);
                        if(find.quantity > 1){
                            find.quantity--;
                            this.amount = this.amount - find.price;
                            this._updateCart(find);

                        } else {
                            this.amount = this.amount - find.price; // сумма заказа
                            --this.countGoods;
                            this.productsCart.splice(this.productsCart.indexOf(find), 1);
                            document.querySelector(`.cart-item[data-id="${productId}"]`).remove();


                        }
                    } else {
                        alert('Error');
                    }
                })
        },

        toggleVisible(container){
            document.querySelector(container).classList.toggle('invisible');
        },

        // фильтрация товаров по строке
        filter(){
            const regexp = new RegExp(this.userSearch, 'i');
            this.filtered = this.products.filter(product => regexp.test(product.product_name));
            this.products.forEach(el => {
                const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
                if(!this.filtered.includes(el)){
                    block.classList.add('invisible');
                } else {
                    block.classList.remove('invisible');
                }
            })
        },
    },
    mounted(){
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                }
            });

        this.getJson(`${API + this.cartUrl}`)
            .then(data => {
                this.amount = data.amount;
                this.countGoods = data.countGoods;

                for(let el of data.contents){
                    this.productsCart.push(el);
                }
            });
    }
});


/**
 * Класс списка товаров
 */
class List {
    constructor(url, container, list = list2) {
        this.container = container;
        this.list = list;
        this.url=url;
        this.goods = []; //массив товаров
        this.allProducts=[]; //массив объектов
        this.filtered = [];
        this._init();
    }

    getJson(url){
        return fetch(url ? url : `${API + this.url}`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    handleData(data){
        this.goods = [...data];
        this.render();
    }

    calcSum(){
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }

    render(){
        const block = document.querySelector(this.container);
        for(let product of this.goods){
            // const productObject = new ProductItem(product);
            // {ProductsList: ProductItem,
            //     Cart: CartItem}
            const productObject = new this.list[this.constructor.name](product); // создаем мовый объект класса ProductItem или класса CartItem
            this.allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.render());
        }
    }

    // фильтрация товаров по строке
    filter(value){
        // const regexp = new RegExp(value, 'i');
        // this.filtered = this.allProducts.filter(product => regexp.test(product.product_name));
        // this.allProducts.forEach(el => {
        //     const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
        //     if(!this.filtered.includes(el)){
        //         block.classList.add('invisible');
        //     } else {
        //         block.classList.remove('invisible');
        //     }
        // })
    }

    /**
     * Заглушка в родителе
     */
    _init(){
        return false;
    }

}

/**
 * Общий класс товара
 */
class Item {

    // constructor(el, img='https://placehold.it/50x150'){
    constructor(el, img = 'img/product.jpg') {
        this.product_name = el.product_name;
        this.price = el.price;
        this.id_product = el.id_product;
        this.img = img;
    }

    // генерация карточки товара
    render(){
        // <button class="buy-btn"
        //     data-id="${this.id_product}"
        //     data-name="${this.product_name}"
        //     data-price="${this.price}">Купить</button>

        //    <img class="cart-image" src="${this.img}" alt="image">
        return `<div class="product-item" data-id="${this.id_product}">
                <div class=""><img src="${this.img}" alt="image"></div>
                <h3>${this.product_name}</h3>
                <p>${this.price}</p>
                
                <input type="button" value="Купить" class="buy-btn"
                data-id="${this.id_product}"
                data-name="${this.product_name}" 
                data-price="${this.price}">
            </div>`
    }
}

/**
 * Список товаров каталога
 */
class ProductsList extends List{
    // constructor(container = '.products'){
    constructor(cart, container = '.products', url =  '/catalogData.json'){
        super(url, container); // в конце вызывается _init()
        this.cart = cart;
        this.getJson()
            .then(data => this.handleData(data)); // handleData запускает отрисовку каталога товаров или
    }
    _init(){
        document.querySelector(this.container).addEventListener('click', e =>{
            if (e.target.classList.contains('buy-btn')){
                // e.target — источник события, кнопка
                this.cart.addProduct(e.target);
            }
        });

        document.querySelector('.search-form').addEventListener('submit', e => {
            // отменить действие браузера по умолчанию
            e.preventDefault();
            this.filter(document.querySelector('.search-field').value)
        })
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

/**
 * Товар каталога
 */
class ProductItem extends Item{ }

/**
 * Список товаров корзины
 */
class Cart extends List{
    constructor(container = '.cart', url = '/getBasket.json'){
        super(url, container);
        // this.catrItems = []; //массив товаров в корзине
        this.amount = 0; // сумма заказа
        this.countGoods = 0; // количество товаров в корзине
        this.getJson()
            .then(data => {
                this.handleData(data.contents);
            })
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

    _init() {
        // возможно заменить на btn-cart-btn
        document.querySelector('.btn-cart-btn').addEventListener('click', e => {
            document.querySelector(this.container).classList.toggle('invisible');
        });

        document.querySelector(this.container).addEventListener('click', e => {
            if (e.target.classList.contains('del-btn')){
                // e.target — источник события, кнопка
                this.removeProduct(e.target);
            }
        });
    }

    // уменьшить количество товаров на 1
    removeProduct(element){
        this.getJson(`${API}/deleteFromBasket.json`)
            .then(data => {
                if(data.result === 1){
                    let productId = +element.dataset['id'];
                    let find = this.allProducts.find(product => product.id_product === productId);
                    if(find.quantity > 1){
                        find.quantity--;
                        this._updateCart(find);
                    } else {
                        this.allProducts.splice(this.allProducts.indexOf(find), 1);
                        document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
                    }
                } else {
                    alert('Error');
                }
            })
    }

    // обновление корзины
    // _updateCart(product){
    //     let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
    //     block.querySelector('.product-number').textContent = `Количество: ${product.quantity}`;
    //     block.querySelector('.product-cost').textContent = `Стоимость: ${product.quantity*product.price}`;
    // }
}

/**
 *  Класс генерации одного элемента корзины
 */
class CartItem extends Item{
    constructor(el, img='https://placehold.it/50x100'){
        super(el, img);
        this.quantity = el.quantity;
    }

    // генерация одного товара в корзине
    render() {
        return `
        <div class="cart-item" data-id="${this.id_product}">
                <div class="left-block">
                    <img class="cart-image" src="${this.img}" alt="image">
                    <div class="product-list">
                        <p class="product-name">Наименование: ${this.product_name}</p>
                        <p class="product-price">Цена: ${this.price}</p>
                        <p class="product-number">Количество: ${this.quantity}</p>
                    </div>
                </div>
                <div class="right-block">     
                    <p class="product-cost">Стоимость: ${this.price*this.quantity}</p>      
                    <button class="del-btn" data-id="${this.id_product}">&times;</button>
                </div>
            </div>`;
    }
}

const list2 = {
    ProductsList: ProductItem,
    Cart: CartItem,
}
