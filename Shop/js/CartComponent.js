Vue.component('cart', {
    props: ['productsCart', 'img', 'visibility', 'countGoods', 'amount'],
    template: ` <div class="cart" v-show="visibility">
                    <cart-item class="cart-item" 
                    v-for="item of productsCart" 
                    :key="item.id_product"
                    :cart-item="item"
                    :img="img">                      
                    </cart-item>

                    <div class="products-price">
                        <p > Кол-во наименований: {{countGoods}}</p>
                        <p > Итого: $ {{amount}}</p>
                    </div>

                </div>
    `
});

Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `<div><div class="left-block">
                            <img class="cart-image"  :src="img" alt="image">
                            <div class="product-list">
                                <p class="product-name">Наименование: {{cartItem.product_name}}</p>
                                <p class="product-price">Цена: $ {{cartItem.price}}</p>
                                <p class="product-number">Количество: {{cartItem.quantity}}</p>
                            </div>
                        </div>
                        <div class="right-block">
                            <p class="product-cost">Стоимость: $ {{cartItem.price*cartItem.quantity}}</p>
                            <button class="del-btn" @click="$parent.$emit('remove', cartItem)">&times;</button>
                        </div></div>`
});