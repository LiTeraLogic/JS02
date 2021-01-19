Vue.component('products', {
    data(){
        return {
            // catalogUrl: '/catalogData.json',
            filtered: [],
            products: []
        }
    },
    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data){
                    item.imgPath = `img/product-card-${item.id_product}.jpg`;
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    },
    methods: {
        filter(userSearch){
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
            console.log(userSearch);
        }
    },
    template: `<div class="product-flex">
                    <product v-for="item of filtered" 
                    :key="item.id_product"                    
                    :product="item"
                    :img="item.imgPath" 
                    @add-product="$parent.$refs.cart.addProduct"></product>   
                </div>`
});

Vue.component('product', {
    props: ['product', 'img'],
    template: `<div class="product">
            <a href="#">
                <img class="product-img" :src="img" alt="product">
            </a>
            <div class="product-text">
                <a class="product-text-name" href="#">{{product.product_name}}</a>
                <p class="product-text-price">$ {{product.price}}</p>
            </div>
            <a class="product-add product-add__border " href="#" @click="$emit('add-product', product)">
                <img class="cart_of_add" src="img/cart_of_add.svg" alt="add">Add to Cart</a>
            <a class="product-add2 product-add__border" href="#">
                <i class="fas fa-retweet"></i></a>
            <a class="product-add3 product-add__border" href="#">
                <i class="far fa-heart"></i></a>
 </div>`
});


