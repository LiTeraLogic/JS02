const products = [
    {id: 1, title: 'Notebook', price: 2000},
    {id: 2, title: 'Mouse', price: 20},
    {id: 3, title: 'Keyboard', price: 200},
    {id: 4, title: 'Gamepad', price: 50},
];
//Функция для формирования верстки каждого товара
const renderProduct = (product = {}) => {
    if (!Object.keys(product).length)    {
        return ``;
    }
    return `<div class="product-item">
                <div class="product-img"></div>
                <h3 class="text">${product.title}</h3>
                <p class="text">${product.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};

const renderPage = list => {
    document.querySelector('.products').innerHTML = list.map(item => renderProduct(item)).join('');
};

renderPage(products);