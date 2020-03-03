'use strict';
import "@babel/polyfill";
import 'nodelist-foreach-polyfill';
import 'formdata-polyfill';
import 'fetch-polyfill';
import 'es6-promise';
import elementClosest from 'element-closest';
elementClosest(window);

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import animBtnScroll from './modules/animBtnScroll';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import calc from './modules/calc';
import comand from './modules/comand';
import sendForm from './modules/sendForm';


//Таймер
countTimer();

//Меню
toggleMenu();

//Книпка скрола
animBtnScroll();

//popup
togglePopUp();

//табы
tabs();

//Cлайдер
slider();

//Расчитать стоимость
calc(100);

//Наша команда
comand();

//Send-ajax=form
sendForm();

