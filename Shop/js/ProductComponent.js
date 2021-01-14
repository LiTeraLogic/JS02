Vue.component('products', {
    props: ['products', 'img'],
    template: `<div class="products products-flex">
                    <product v-for="item of products" 
                    :key="item.id_product" 
                    :img="img" 
                    :product="item"></product>   
                </div>`
});

Vue.component('product', {
    props: ['product', 'img'],
    template: `<div class="product-item">
                    <div class="">
                        <img :src="img" alt="image">
                    </div>
                    <h3>{{product.product_name}}</h3>
                    <p>$ {{product.price}}</p>
    
                    <input type="button" class="buy-btn" @click="$parent.$emit('add-product', product)" 
                        value="Купить">
                </div>`
});