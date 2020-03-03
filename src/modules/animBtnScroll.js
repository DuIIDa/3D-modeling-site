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

export default animBtnScroll;