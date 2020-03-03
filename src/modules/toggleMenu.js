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

export default toggleMenu;