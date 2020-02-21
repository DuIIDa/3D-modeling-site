window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    //Таймер
    const countTimer = () => {
        

        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        const deadLine = () => {
            let today = new Date();
            today.setDate(today.getDate()+1);
            let tomorrow = today.toLocaleString('en', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
            }); 
            return tomorrow;
        };
         
        const getTimeRemaining = () => {
            let dateStop = new Date(deadLine()).getTime(),
            dateNow = new Date().getTime();

            let timeRemaining = (dateStop - dateNow) / 1000;

            let seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60 ),
                hours = Math.floor((timeRemaining / 60) / 60);

            return { timeRemaining, hours, minutes, seconds};
        };

        const timeCheck = (value) => {
            if(value < 10){
                return '0' + value;
            }
            return value;
        };

        const  updateClock = () => {
            let timer = getTimeRemaining();

            if(timer.timeRemaining > 0) { 
                timerHours.textContent = timeCheck(timer.hours);
                timerMinutes.textContent =  timeCheck(timer.minutes);
                timerSeconds.textContent =  timeCheck(timer.seconds);
            }else {
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
                //clearInterval(idInderval);
            }
        };

        setInterval(updateClock, 1000);
    };

   countTimer();

    //Меню
    const toggleMenu = () => {
        const menu = document.querySelector('menu');
        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        document.addEventListener('click', function add(event){
            let target = event.target;
            if(target.closest('.menu')){
                 handlerMenu();
            }else if(menu.classList.value === 'active-menu'){
                let temp = event.target;
                temp = temp.closest('.active-menu');
                if(temp){
                    let target = event.target;
                    if(target.classList.contains('close-btn')){
                        handlerMenu();
                    }else if(target.tagName === 'A'){
                        event.preventDefault();
                        let blockID = target.getAttribute('href').substr(1);
                        document.getElementById(blockID).scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                        handlerMenu();
                    }
                }else{
                    handlerMenu();
                }
            }
        });
    };


    toggleMenu();

    //Книпка скрола
    const animBtnScroll = () => {
        const btnScroll = document.querySelector('a');
        btnScroll.addEventListener('click', (event) => {
            event.preventDefault();
            let blockID = btnScroll.getAttribute('href').substr(1);
            document.getElementById(blockID).scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        });

    };

    animBtnScroll();

    //popup
    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popubContainer = document.querySelector('.popup-content'),
            popupBtn = document.querySelectorAll('.popup-btn');
        
        const animPopUp = () => {
            let count = 0;
            popubContainer.style.left = '-30%';
            let id = setInterval(()=>{
                count++;
                popubContainer.style.left = count+"%";
                if(count === 38){
                    clearInterval(id);
                }
            }, 10);
        };
        
        popupBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                popup.style.display = 'block';
                if(screen.width > 768){
                animPopUp();
                }
            });
        });

        popup.addEventListener('click', (event) => {
            let target = event.target;
            if(target.classList.contains('popup-close')){
                popup.style.display = 'none';
            }else{
                target = target.closest('.popup-content');

                if(!target){
                    popup.style.display = 'none';
                }
            }
        });
    };

    togglePopUp();

    //табы

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');
        
        const toggleTabCotent = (index) => {
            for(let i = 0; i < tabContent.length; i++){
                if(index === i){
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                }else{
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        
        };

        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
            target = target.closest('.service-header-tab');
            if(target){
                tab.forEach((item, i) => {
                    if(item === target){
                        toggleTabCotent(i);
                    }
                });
            }
        });
        
    };

    tabs();

    //Cлайдер

    const addDots = () => {
        const portfilioDots = document.querySelector('.portfolio-dots');
        const dotsQuantity = document.querySelectorAll('.portfolio-item').length;
    
        for(let i = 0; i < dotsQuantity; i++){
            portfilioDots.insertAdjacentHTML('beforeEnd', `<li class="dot"></li>`);
        }

    };

    addDots();

    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            dot = document.querySelectorAll('.dot'),
            slider = document.querySelector('.portfolio-content');
        
        let currentSlide = 0,
            interval;

        const prevSlide = (elem, index, strClass) => {
           elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot,currentSlide,'dot-active');
            currentSlide++;
            if(currentSlide >= slide.length){
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot,currentSlide,'dot-active');
        };

        const startSlide = () => {
            interval = setInterval(autoPlaySlide, 4000);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', (event) => {
            event.preventDefault();
            
            let target = event.target;

            if(!target.matches('#arrow-right, #arrow-left, .dot')){
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot,currentSlide,'dot-active');

            if(target.matches('#arrow-right')){
                currentSlide++;
            }else if(target.matches('#arrow-left')){
                currentSlide--;
            }else if(target.matches('.dot')){
                dot.forEach((elem,i) => {
                    if(elem === target){
                        currentSlide = i;
                    }
                });
            }

            if(currentSlide >= slide.length){
                currentSlide = 0;
            }else if(currentSlide < 0){
                currentSlide = slide.length - 1;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot,currentSlide,'dot-active');

        });

        slider.addEventListener('mouseover', (event) => {
            if(event.target.matches('.portfolio-btn') || 
            event.target.matches('.dot')){
               stopSlide(); 
            }
        });

        slider.addEventListener('mouseout', (event) => {
            if(event.target.matches('.portfolio-btn') || 
            event.target.matches('.dot')){
               startSlide(); 
            }
        });

        startSlide();

    };

    slider();
});