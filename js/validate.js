export function validate(input) {
    const typeOfInput = input.dataset.type;

    if(validator[typeOfInput]) {
        validator[typeOfInput](input)
    }

    if(input.validity.valid) {
        input.parentElement.classList.remove('contact__box--invalid');
        input.parentElement.querySelector('.contact__error-message').innerHTML = '';
    } else {
        input.parentElement.classList.add('contact__box--invalid');
        input.parentElement.querySelector('.contact__error-message').innerHTML = showErrorMessage(typeOfInput, input);
    }
};

const typesOfError = ['valueMissing', 'typeMismatch'];

const errorMessage = {
    name: {
        valueMissing: 'The name field cannot be empty.'
    },
    email: {
        valueMissing: 'The email field cannot be empty.',
        typeMismatch: 'The email entered is not valid.'
    },
    subject: {
        valueMissing: 'The subject field cannot be empty.'
    },
    message: {
        valueMissing: 'The message field cannot be empty.'
    }
};

const validator = {
    birthDate:input => validateBirthDate(input)
};

function showErrorMessage(typeOfInput, input) {
    let message = '';
    typesOfError.forEach(error => {
        if(input.validity[error]) {
            message = errorMessage[typeOfInput][error]
        }
    });

    return message;
};

function validateBirthDate(input) {
    const dateReceived = new Date(input.value);
    let message = '';

    if(!moreThan18(dateReceived)) {
        message = 'Você deve ser maior que 18 anos para se cadastrar.';
    }

    input.setCustomValidity(message);
};

function moreThan18(data) {
    const todaysDate = new Date();
    const dateMore18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate());

    return dateMore18 <= todaysDate;
};