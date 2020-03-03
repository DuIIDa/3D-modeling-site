'use strict';
class Validator {
    constructor({selector, pattern = {}, method}){
        this.form = document.querySelector(selector);
        this.pattern = pattern;
        this.method = method;
        this.elementsForm = [...this.form.elements].filter((item) => {
            return item.tagName.toLowerCase() !== 'button' &&
            item.type !== 'button';
        });
        this.error =  new Set();

    }

    init(){
        let statusMessage;
        const errorMessage = 'Что-то пошло не так';
        const successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

        this.applyStyle();
        this.setPattern();
        this.elementsForm.forEach((elem) => {
            elem.addEventListener('change', this.checkIt.bind(this));
        });
        this.form.addEventListener('submit', e => {
            event.preventDefault();

            this.elementsForm.forEach(elem => {
                this.checkIt({target: elem});
            });
            if(this.error.size){
                return;
            }else{

                const postData = (formData) => {
                    return fetch('./server.php',{
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: formData
                    });

                    /*const request = new XMLHttpRequest();
                    request.open('POST', './server.php');
                    return new Promise ((resolve,reject) => {
                        request.addEventListener('readystatechange', () => {
                            if(request.readyState !== 4){
                                return;
                            }
                            if(request.status === 200){
                                resolve();
                            }else{
                                reject(request.status);
                            }
                        });
                        request.setRequestHeader('Content-Type', 'application/json');
                        request.send(JSON.stringify(body));
                    });*/
                };

                const messagePost = () => {
                    if(statusMessage){
                        this.form.removeChild(statusMessage);
                    }else{
                        statusMessage = document.createElement('div');
                        statusMessage.style.cssText = 'font-size: 2rem';
                    }

                    this.form.appendChild(statusMessage);
                    statusMessage.innerHTML = `<div class="spinner">
                    <div class="spinner-circle spinner-circle-outer"></div>
                    <div class="spinner-circle-off spinner-circle-inner"></div>
                    <div class="spinner-circle spinner-circle-single-1"></div>
                    <div class="spinner-circle spinner-circle-single-2"></div>
                    </div>`;

                    const formData = new FormData(this.form);
                    
                    postData(formData)
                        .then((response) => {
                            console.log('response: ', response);
                            if(response.status !== 200){
                                throw new Error('Status network not 200');
                            }
                            statusMessage.textContent = successMessage;
                        })               
                        .catch((error) => {
                            statusMessage.textContent = errorMessage;
                            console.error(error);
                    });
                    
                    this.elementsForm.forEach(elem => {
                        elem.value = '';
                        elem.classList.remove('success');
                    });
    
                };

                messagePost();
   
            }
        });
    }

    isValid(elem){
        const valudatorMathod = {
            notEmpty(elem){
                if(elem.value.trim() === ''){
                    return false;
                }
                return true;
            },
            pattern(elem, pattern){
                return pattern.test(elem.value);
            }
        };
        if(this.method){
            const method = this.method[elem.id];
            if(method) {
                return method.every(item => {
                    return  valudatorMathod[item[0]](elem, this.pattern[item[1]]);
                });
            }
        }else {
            console.warn('Необходимо передать ID полей ввода и методы проверки этих полей');
        }
        return true;
    }

    checkIt(event){
        const target = event.target;
        if(this.isValid(target)){
            this.showSucces(target);
            this.error.delete(target);
        }else{
            this.showError(target);
            this.error.add(target);
        }

    }

    showError(elem){
        elem.classList.remove('success');
        elem.classList.add('error');
        if(elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')){
           return;
        }
    }

    showSucces(elem){
        elem.classList.remove('error');
        elem.classList.add('success');
        if(elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')){
            elem.nextElementSibling.remove();
        }
    }

    applyStyle(){
        const style = document.createElement('style');
        style.textContent =`
            input.success {
                outline: 0;
                box-shadow: inset 0 3px 3px rgba(52,201,36), 0 0 15px rgba(52, 201, 36, .6);
            }
            input.error {
                outline: 0;
                box-shadow: inset 0 3px 3px rgba(255,0,0), 0 0 15px rgba(255, 0, 0, .6);
            }
        `;
        document.head.appendChild(style);
    }

    setPattern(){
        if(!this.pattern.phone){
            this.pattern.phone = /^\+?[78]([-()]*\d){10}$/;
        }
        if(!this.pattern.email){
            this.pattern.email = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
        }
    }
}