const comand = () => {

        
    let firstImg;

    const mouseAction = document.querySelectorAll('.row');
    mouseAction[8].addEventListener('mouseover', (event) => {
        let target = event.target;
        if(target.classList.contains('command__photo')){
            firstImg =  target.src;
            target.src = target.dataset.img;
        }

    });

    mouseAction[8].addEventListener('mouseout', (event) => {
        let target = event.target;
        if(target.classList.contains('command__photo')){
            target.src = firstImg;
        }
        

    });
};

export default comand;