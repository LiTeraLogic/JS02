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
                            this.$data.amount += find.price;
                        }

                    })
            } else {
                const prod = Object.assign({quantity: 1}, item);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if(data.result === 1){
                            this.cartItems.push(prod);
                            this.$data.amount += item.price;
                        }
                    })
            }
        },
        remove(item){
            if (item.quantity > 1){
                this.$parent.putJson(`/api/cart/${item.id_product}`, {quantity: -1})
                    .then(data => {
                        if(data.result === 1){
                            item.quantity--;
                            this.$data.amount -= item.price;
                        }

                    });
            } else {
                this.$parent.deleteJson(`/api/cart/${item.id_product}`)
                    .then(data => {
                        if (data.result === 1) {
                            this.$data.amount -= item.price;
                            this.cartItems.splice(this.cartItems.indexOf(item), 1)
                        }
                    })
            }
        },
        minusItem(item){}
    },
    template: `
     <div class="header-right">
    <div class="header-right__cart" @click="showCart = !showCart">
        <img src="img/cart.svg" alt="cart">
    </div>
    
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
    
            <div class="header-cart__flex header-cart__flex_price pink">
                <p>TOTAL</p>
                <p>{{ this.$data.amount }}</p>
            </div>    
         </div>
    </div>
</div>`
});

Vue.component('cart-item', {
    props: ['img', 'cartItem'],
    template: `
            <div class="cart_flex cart__block border">
                <img :src="img" alt="product" width="72" height="85">
                <div class="cart__product">
                    <a class="header__cart_a" href="#">{{ cartItem.product_name }}</a>    
                    <p class="header__cart_p">
                        {{ cartItem.quantity }} 
                        <span class="header__cart_span"> x </span> 
                        $ {{ cartItem.price }}
                    </p>
                </div>
                <div class="cart__action circle" @click="$emit('remove', cartItem)">
                    <i class="fas fa-times-circle"></i>
                </div>
        
            </div>`
})


