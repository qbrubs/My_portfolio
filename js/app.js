import { validate } from './validate.js';

const inputs = document.querySelectorAll('input');

inputs.forEach(input => {
    input.addEventListener('blur', (event) => {
        validate(event.target)
    })
});
