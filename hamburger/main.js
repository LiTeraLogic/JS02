
class Argument{
    constructor(element) {
        this.price = +element.dataset['price'];
        this.calories = +element.dataset['calories'];
    }
}

class Humburger {
    constructor(size, filling, sauce) {
        this.size = this.getArgument(size);
        this.filling = this.getArgument(filling);
        this.sauce = this.getArguments(sauce);

        this.returnSum();
    }


    getArgument(key) {
        let argument = document.querySelector(`input[name='${key}']:checked`);
        return new Argument(argument);
    }

    getArguments(key) {
        let argument = [...document.querySelectorAll(`input[name="${key}"]:checked`)];
        let getElements = [];
        argument.forEach(element => getElements.push(new Argument(element)));
        return getElements;
    }

    count(key) {
        let cost = 0;
        this.sauce.forEach(element => cost += element[key]);

        return this.size[key] + this.filling[key] + cost;

    }

    returnSum() {
        alert(`Стоимость: ${this.count('price')} рублей  \nКалорийность: ${this.count('calories')} калорий`);
    }

}




