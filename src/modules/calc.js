const calc = (price = 100) => {

    const calcBlock = document.querySelector('.calc-block'),
        calcType = document.querySelector('.calc-type'),
        calcSquare = document.querySelector('.calc-square'),
        calcCount = document.querySelector('.calc-count'),
        calcDay = document.querySelector('.calc-day'),
        totalValue = document.getElementById('total');

    const countSum = () => {
        let total = 0,
        countValue = 1,
        dayValue = 1;
        const typeValue = calcType.options[calcType.selectedIndex].value;
        const squareValue = +calcSquare.value;

        if(calcCount.value > 1) {
            countValue += (calcCount.value - 1) / 10;
        }

        if(calcDay.value < 5 && calcDay.value > 0 && calcDay.value) {
            dayValue *= 2;
        }else if(calcDay.value < 10 && calcDay.value && calcDay.value > 0) {
            dayValue *= 1.5;
        }

        if(typeValue && squareValue){
            total = price * typeValue * squareValue * countValue * dayValue;
            let temp = 0;
            let id = setInterval(() => {
                temp += 10;
                if(temp <= total){
                totalValue.textContent = temp;
                }else{
                    clearInterval(id);
                }
            }, 1);
        }else{
            total = 0;
        }

    };

    calcBlock.addEventListener('change', (event) => {
        let target = event.target;

        if(target.matches('.calc-type') || target.matches('.calc-square') || 
        target.matches('.calc-count') || target.matches('.calc-day')) {
            countSum();
        }
    });

    const checkNumb = (value) => {
        value.value = value.value.replace(/[^\d]/g, '');
    };

    calcSquare.addEventListener('input', (event) => {
        checkNumb(event.target);
    });

    calcCount.addEventListener('input', (event) => {
        checkNumb(event.target);
    });

    calcDay.addEventListener('input', () => {
        checkNumb(event.target);
    });
    
};

export default calc;