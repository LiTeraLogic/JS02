document.getElementById('order').addEventListener('click', event =>{
    // console.log(event.target);
    let hamburger = new Hamburger('size', 'filling', 'topping')
})

class Hamburger {
    constructor(size, filling, toppings) {
        this.size =  this.getElement(size);
        this.filling =  this.getElement(filling);
        this.toppings =  this.getElements(toppings);
        this._total();
    }



    getElement(name) {
        let element = document.querySelector(`input[name = "${name}"]:checked`);
        return  {
            name: '${name}',
            price: +element.dataset['price'],
            calories: +element.dataset['calories']
        };
    }

    getElements(name) {
        let  elements= [...document.querySelectorAll(`input[name = "${name}"]:checked`)];
        let list = [];
        elements.forEach(element => {
            list.push({
                name: `${name}`,
                price: +element.dataset['price'],
                calories: +element.dataset['calories']
            })
        });
        // console.log(list);
        return  list;
    }

    countPrise(){
        let count = this.size.price + this.filling.price;
        this.toppings.forEach(element =>{
            count +=element.price
        })
        return count;
    }

    countCalories(){
        let count = this.size.calories + this.filling.calories;
        this.toppings.forEach(element =>{
            count +=element.calories
        })
        return count;
    }

    _total() {
        let elem = document.getElementById('total');
        if (elem){
            elem.remove();
        }
        document.body.insertAdjacentHTML('beforeend',
            `<div id="total">
                            <p>Итоговая стоимость: ${this.countPrise()} рублей.<p>
                            <p>Калорийность: ${this.countCalories()} калорий.<p>
                        </div>`);

    }
}