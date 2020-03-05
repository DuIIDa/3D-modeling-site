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

export default togglePopUp;