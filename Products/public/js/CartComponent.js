Vue.component('cart', {
    data(){
        return {
            cartUrl: '/getBasket.json',
            cartItems: [],
            amount: 0,
            imgCart: 'https://placehold.it/50x100',
            showCart: false
        }
    },
    mounted(){
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents){
                    item.imgPath = `img/product-card-${item.id_product}.jpg`;
                    this.$data.cartItems.push(item);
                }
                this.$data.amount = data.amount;
            });
    },
    methods: {
        addProduct(item){
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if(find){
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
                    .then(data => {
                        if(data.result === 1){
                            find.quantity++;
                        }

                    })
            } else {
                const prod = Object.assign({quantity: 1}, item);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if(data.result === 1){
                            this.cartItems.push(prod);
                        }
                    })
            }
        },
        remove(item){
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        this.cartItems.splice(this.cartItems.indexOf(item), 1);
                    }
                })
        },
        minusItem(item){
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if (item.quantity > 1) {
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    }
                })
        }
    },
    template: `
     <div class="header-right">
    <div class="header-right__cart" @click="showCart = !showCart">
        <img src="img/cart.svg" alt="cart">
    </div>
    <a class="account__button" href="#">My Account<i class="triangle fas fa-caret-down account__icon"></i></a>


    <div class=" header__cart" v-show="showCart">
        <div class="header__cart2">
            
            <cart-item v-for="item of cartItems" 
            :key="item.id_product" 
            :img="item.imgPath" 
            :cart-item="item" 
            @remove="remove" 
            @minus="minusItem" 
            @add="addProduct">
            </cart-item>
    
            <div class="header-cart__flex header-cart__flex_price">
               
            </div>
            <div class="cart__button">
                <a class="cart__button_a" href="#">
                <p>Checkout</p>
                </a>
            </div>
    
            <div class="cart__button">
                <a class="cart__button_a" href="#">
                <p>Go to cart</p>
                </a>
            </div>
    
         </div>
    </div>
</div>`
});

Vue.component('cart-item', {
    props: ['img', 'cartItem'],
    template: `
            <div class="cart_flex cart__block border">
                <img src="img/cart_img_1.jpg" alt="product" width="72" height="85">
                <div class="cart__product">
                    <a class="header__cart_a" href="#">{{ cartItem.product_name }}</a>    
                    <p class="header__cart_p">
                        {{ cartItem.quantity }} 
                        <span class="header__cart_span"> x </span> 
                        $ {{ cartItem.price }}
                    </p>
                </div>
                <div class="cart__action circle" @click="$emit('minus', cartItem)">
                    <i class="fas fa-times-circle"></i>
                </div>
        
            </div>`
})


// template: `
//      <div class="header-right">
//     <div class="header-right__cart" @click="showCart = !showCart">
//         <img src="img/cart.svg" alt="cart">
//     </div>
//     <a class="account__button" href="#">My Account<i class="triangle fas fa-caret-down account__icon"></i></a>
//
//
//     <div class=" header__cart" v-show="showCart">
//         <div class="header__cart2">
//
//             <cart-item v-for="item of cartItems"
//             :key="item.id_product"
//             :img="item.imgPath"
//             :cart-item="item"
//             @remove="remove"
//             @minus="minusItem"
//             @add="addProduct">
//             </cart-item>
//
//             <div class="header-cart__flex header-cart__flex_price">
//                 <p>TOTAL</p>
//                 <p>$ {{amount}}</p>
//             </div>
//             <div class="cart__button">
//                 <a class="cart__button_a" href="#">
//                 <p>Checkout</p>
//                 </a>
//             </div>
//
//             <div class="cart__button">
//                 <a class="cart__button_a" href="#">
//                 <p>Go to cart</p>
//                 </a>
//             </div>
//
//          </div>
//     </div>
// </div>`

