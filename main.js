const billInputting = document.getElementById('calc-number-entering-bill-number--inputting');
const peopleInputting = document.getElementById('calc-people-number--inputting');
const tipCheckboxes = document.querySelectorAll('.calc-tip-checkbox--item');
const tipAmountResult = document.querySelector('.calc-number-result-tip-amount--dollar');
const totalResult = document.querySelector('.calc-number-result-total--dollar');

const peopleError = document.querySelector('.calc-people--label p:last-child');
const resetBtn = document.querySelector('.calc-number-result-btn--reset');

resetBtn.disabled = true;
peopleError.style.display = 'none';

let billValue = 0;
let tipValue = 0;
let peopleValue = 0;

const validatingPeople = () => {
    if(!peopleValue || peopleValue === 0){
        peopleError.style.display = 'block';
        return false;
    }
    peopleError.style.display = 'none';
    return true;
}

const updateResetButtonState = () => {
    const hasValue = billValue > 0 || peopleValue > 0 || tipValue > 0;
    resetBtn.disabled = !hasValue;
}

const calculateResult = () => {
    if(!billValue || !tipValue || !validatingPeople()){
        tipAmountResult.textContent = "$0.00";
        totalResult.textContent = "$0.00";
    }
    const totalTip = (billValue * tipValue) / 100;
    const tipPerPerson = totalTip / peopleValue;
    const totalPerPerson = (billValue + totalTip) / peopleValue;

    tipAmountResult.textContent = `$${tipPerPerson.toFixed(2)}`
    totalResult.textContent = `$${totalPerPerson.toFixed(2)}`
}

// add event listener bill inputting
billInputting.addEventListener('input', () => {
    billValue = Number(billInputting.value);
    calculateResult();
    updateResetButtonState();
})

// add event listener tip checkboxes
tipCheckboxes.forEach(tipCheckbox => {
    tipCheckbox.addEventListener('click', () => {
        tipCheckboxes.forEach(tipCheckbox => {
            tipCheckbox.classList.remove('active');
        })
        tipCheckbox.classList.add('active');

        tipValue = Number(tipCheckbox.textContent.replace("%", ""));
        calculateResult();
        updateResetButtonState();
    })
})

// add event listener people inputting
peopleInputting.addEventListener('input', () => {
    peopleValue = Number(peopleInputting.value);
    calculateResult();
    updateResetButtonState();
})

resetBtn.addEventListener('click', () => {
    billValue = 0;
    tipValue = 0;
    peopleValue = 0;

    billInputting.value = '';
    peopleInputting.value = '';
    tipCheckboxes.forEach(tipCheckbox => {
        tipCheckbox.classList.remove('active');
    })
    tipAmountResult.textContent = '$0.00';
    totalResult.textContent = '$0.00';
    peopleError.style.display = 'none';
    updateResetButtonState();
})