document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('submit-btn').addEventListener('click', handleClick);

    function handleClick(event) {
        event.preventDefault();

        const { name, year, us, zipcode, password, pizza } = getInputs();

        clearResults();
        if (!hasError(name, year, us, zipcode, password, pizza)) {
            displayResult(`Accepted`);
        }
    }

    function getInputs() {
        const name = document.getElementById("name-input").value;
        const year = document.getElementById('year-input').value;
        const us = document.getElementById('us-input').checked;
        const zipcode = document.getElementById('zipcode-input').value;
        const password = document.getElementById('password-input').value;
        const pizza = document.getElementById('pizza-input').value;

        return {name, year, us, zipcode, password, pizza}
    }

    function outputError(errorMsg, errorDiv) {
        if (!errorMsg) {
            return;
        }
        const errorNode = document.querySelector(`#${errorDiv}`);
        errorNode.replaceChildren();
        errorNode.insertAdjacentHTML('afterbegin', `<div class="error">${errorMsg}</div>`)
    }

    function clearErrors() {
        const errorElements = document.querySelectorAll('.error');
        errorElements.forEach(element => {
            element.textContent = '';
        });
    }

    function clearResults() {
        const resultNode = document.querySelector('.result');
        resultNode.replaceChildren();
    }
    
    function hasError(name, year, us, zipcode, password, pizza) {
        let hasError = false;
    
        clearErrors();

        if (!name || name.length < 3) {
            outputError("Name must be at least 3 characters long", 'name-error');
            hasError = true;
        } if (!year || year < 1900 || year > 2100) {
            outputError('Year of birth must be an integer number greater than 1900 and smaller than 2100', 'year-error')
            hasError = true;
        } if (zipcode && (zipcode.length !== 5 || isNaN(Number(zipcode)))) {
            outputError("Zipcode must be a positive number with 5 digits", 'zipcode-error');
            hasError = true;
        } if (us && !zipcode) {
            outputError("Zipcode must be a positive number with 5 digits", 'zipcode-error');
            hasError = true;
        } if (!password || password.length < 8) {
            outputError('Password must be a string with at least 8 characters', 'password-error')
            hasError = true;
        } if (!pizza) {
            outputError('Preferred type of pizza must be chosen in the option', 'pizza-error')
            hasError = true;
        }
        return hasError;
    }
    
    function displayResult(result) {
        const resultNode = document.querySelector('.result');
        resultNode.replaceChildren();
        resultNode.insertAdjacentHTML('afterbegin', `<div> <img src="check-mark.png" alt="check-mark"> ${result} </div>`)
    }
});
