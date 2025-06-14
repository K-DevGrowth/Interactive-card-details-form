const form = document.querySelector('form');
const labels = document.querySelectorAll('label');
const inputs = document.querySelectorAll('input');

inputs.forEach(input => {
    input.addEventListener('input', (e) => {
        const p = document.querySelector(`.${input.name}`);
        p.textContent = e.target.value.toUpperCase();
    })
})

form.addEventListener('submit', (e) => {
    e.preventDefault();

    inputs.forEach(input => checkValidation(input));

    const invalids = document.querySelectorAll('.error.invalid');
    if (invalids.length === 0) {
        showCompleted();
    }
})

const checkValidation = (input) => {
    if (input.name === 'exp-month' || input.name === 'exp-year') {
        const month = document.querySelector(`input[name="exp-month"]`).value;
        const year = document.querySelector(`input[name="exp-year"]`).value;
        const errorExp = document.querySelector('.error.exp');

        if (!month || !year) {
            errorExp.textContent = "Can't be blank";
            errorExp.classList.add("invalid");
            input.classList.add("invalid");
        }
        else if (month < 1 || month > 12 || !/^[0-9]{2}$/.test(month) || !/^[0-9]{2}$/.test(year)) {
            errorExp.textContent = `Wrong format, numbers only`;
            errorExp.classList.add("invalid");
            input.classList.add("invalid");
        }
        else {
            input.classList.remove("invalid");
            errorExp.classList.remove("invalid");
        }
        return;
    }

    const errorMsg = document.querySelector(`.error.${input.name}`);
    errorMsg.classList.add("invalid");
    input.classList.add("invalid");

    if (!input.value) {
        errorMsg.textContent = "Can't be blank";
    }
    else if (input.name === 'number' && !/^[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}$/.test(input.value)) {
        errorMsg.textContent = `Wrong format, numbers only`;
    }
    else if (input.name === 'cvc' && !/[0-9]{3}/.test(input.value)) {
        errorMsg.textContent = `Wrong format, numbers only`;
    }
    else {
        input.classList.remove("invalid");
        errorMsg.classList.remove("invalid");
        return;
    }
}

const showCompleted = () => {
    form.textContent = '';
    const completed = `
        <div class="completed">
            <img src="./images/icon-complete.svg" />
            <h2>THANK YOU!</h2>
            <p>We're added your card details</p>
            <button class="confirmBtn">Continue</button>
        </div>
    `;
    form.insertAdjacentHTML("afterbegin", completed);

    const continueBtn = document.querySelector('.confirmBtn');
    continueBtn.addEventListener('click', () => location.reload());
}

labels.forEach(label => label.textContent = label.textContent.toUpperCase());