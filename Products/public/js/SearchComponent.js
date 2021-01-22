Vue.component('search', {
    data(){
        return {
            userSearch: ''
        }
    },
    template: `
            <form class="form" action="#" @submit.prevent="$parent.$refs.products.filter(userSearch)">
                <div class="form-browses">
                    <div class="form-browse"><p class="browse__text">Browse<span><i
                            class="fas fa-caret-down browse__icon"></i></span></p></div>
                    <div class="browse__drop">
                        <div class="browse__drop-flex">
                            <h3 class="browse__drop-h3">Woman</h3>
                            <ul class="browse__drop-ul">
                                <li><a href="#" class="browse__drop-link">Dresses</a>
                                </li>
                                <li><a href="#" class="browse__drop-link">Tops</a>
                                </li>
                                <li><a href="#" class="browse__drop-link">Sweaters/Knits</a>
                                </li>
                                <li><a href="#" class="browse__drop-link">Jackets/Coats</a>
                                </li>
                                <li><a href="#" class="browse__drop-link">Blazers</a>
                                </li>
                                <li><a href="#" class="browse__drop-link">Denim</a>
                                </li>
                                <li><a href="#" class="browse__drop-link">Leggings/Pants</a>
                                </li>
                                <li><a href="#" class="browse__drop-link">Skirts/Shorts</a>
                                </li>
                                <li><a href="#" class="browse__drop-link">Accessories </a>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>

                <input class="form-text" type="text" placeholder="Search for Item..." v-model="userSearch">
                <button class="form-button" type="submit" ><i class="fas fa-search btn_search"></i></button>

            </form>`
})
