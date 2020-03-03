const addDots = () => {
    const slide = document.querySelectorAll('.portfolio-item');
    const portfilioDots = document.querySelector('.portfolio-dots');
       
    for(let i = 0; i < slide.length; i++){
        if(i === 0){
            portfilioDots.insertAdjacentHTML('beforeEnd', `<li class="dot dot-active"></li>`);
        }else {
            portfilioDots.insertAdjacentHTML('beforeEnd', `<li class="dot"></li>`);
        }
    }

};

const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item'),
        slider = document.querySelector('.portfolio-content');

    addDots();
    const dot = document.querySelectorAll('.dot');
    
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

export default slider;