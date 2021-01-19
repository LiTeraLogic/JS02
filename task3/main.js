class Feedback{
    constructor(){
        this.isValid = false;
        this.checks = {};
        this.errors = {};
        this._init();
        }

    _init() {
        let checkValid = new CheckValid();
        this.checks = checkValid.checks;
        this.errors = checkValid.errors;
        let i = 0;
        for (let key in this.checks){
            let el = document.querySelector(`input[name="${key}"]`);
            let isValid = this.checks[key].test(el.value);

            this._rewriteError(key);
            if (!isValid){
                this._setError(el, key);
            }
            else {
                i++;
            }

        }

        if (i === 3){
            this.isValid = true;
        }

    }

    _setError(el, errorKey){
        let error = this.errors[errorKey];
        let insertError = `<p class="red" id="${errorKey}Type">${error}</p>`;
        el.insertAdjacentHTML('afterend', insertError);
    }

    _rewriteError(key){
        let tagP = document.getElementById(`${key}Type`);
        if (tagP) {
            tagP.textContent = '';
        }
    }
}

class CheckValid{
    constructor() {
        this.errors = {
            name: 'В имени могут быть только буквы',
            tel: 'Номер телефона имеет вид +7(000)000-0000',
            email: 'E-mail должен иметь вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru',
        };

        this.checks = {
            name: /^[a-zа-яё]{3,15}$/i,
            tel: /^\+7\([\d]{3}\)[\d]{3}-[\d]{4}$/,
            email: /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i,
        }
    }
}

document.querySelector('.form-valid').addEventListener('submit', e => {
    let feedback = new Feedback(e);
    if (!feedback.isValid){
        //если не прошла, отменить e
        e.preventDefault();
    }
    else{
        alert('Данные отправлены');
    }
});
