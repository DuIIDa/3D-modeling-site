window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    //Таймер
    const countTimer = (deadLine) => {
        

        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');
         
        const getTimeRemaining = () => {
            let dateStop = new Date(deadLine).getTime(),
            dateNow = new Date().getTime();

            let timeRemaining = (dateStop - dateNow) / 1000;

            let seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60 ),
                hours = Math.floor((timeRemaining / 60) / 60);

            return { timeRemaining, hours, minutes, seconds};
        }

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
                console.log(1);
                clearInterval(idInderval);
            }
        }

        updateClock();
    };

    let idInderval = setInterval(countTimer, 1000, '16 february 2020');
    
});