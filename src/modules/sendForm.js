const sendForm = () => {
    const valid = new Validator({
        selector: '#form1',
        pattern: {
            phone: /^\+375( )?(( )?\d){9}$/,
            name: /^[а-яА-ЯёЁ]+$/
        },
        method: {
        'form1-phone': [
            ['notEmpty'],
            ['pattern', 'phone']
        ],
        'form1-email': [
            ['notEmpty'],
            ['pattern', 'email']
        ],
        'form1-name': [
            ['notEmpty'],
            ['pattern', 'name']
        ]
    }
    });

    const validModel = new Validator({
        selector: '#form3',
        pattern: {
            phone: /^\+375( )?(( )?\d){9}$/,
            name: /^[а-яА-ЯёЁ]+$/
        },
        method: {
        'form3-phone': [
            ['notEmpty'],
            ['pattern', 'phone']
        ],
        'form3-email': [
            ['notEmpty'],
            ['pattern', 'email']
        ],
        'form3-name': [
            ['notEmpty'],
            ['pattern', 'name']
        ]
    }
    });

    const validForm2 = new Validator({
        selector: '#form2',
        pattern: {
            phone: /^\+375( )?(( )?\d){9}$/,
            name: /^[а-яА-ЯёЁ]+$/,
            message: /^[а-яА-ЯёЁ0-9 ]+$/
        },
        method: {
        'form2-phone': [
            ['notEmpty'],
            ['pattern', 'phone']
        ],
        'form2-email': [
            ['notEmpty'],
            ['pattern', 'email']
        ],
        'form2-name': [
            ['notEmpty'],
            ['pattern', 'name']
        ],
        'form2-message': [
            ['notEmpty'],
            ['pattern', 'message']
        ]
    }
    });

    valid.init();
    validModel.init();
    validForm2.init();
};

export default sendForm;