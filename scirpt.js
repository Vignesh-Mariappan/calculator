const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.querySelector('#clear-btn');

const calculate = {
    '/' : (firstValue, secondValue) =>  firstValue / secondValue ,
    '*' : (firstValue, secondValue) =>  firstValue * secondValue ,
    '+' : (firstValue, secondValue) =>  firstValue + secondValue ,
    '-' : (firstValue, secondValue) =>  firstValue - secondValue ,
    '=' : (firstValue, secondValue) =>  secondValue 
};

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number) {
    if(awaitingNextValue) {
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    } else {
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }
}

//Add decimal point
function addDecimal() {
    //if there is no decimal point, add one
    if(!calculatorDisplay.textContent.includes(".")) {
        calculatorDisplay.textContent += '.';
    }
}

//Operator function
function useOperator(operatorInput) {
    const currentValue = Number(calculatorDisplay.textContent);
    //Prevent next operator from pressing
    if(operatorValue && awaitingNextValue) {
        operatorValue = operatorInput;
        return;
    }

    //Assign first value if no value
    if(!firstValue) {
        firstValue = currentValue;
    } else {
        console.log(firstValue, operatorValue ,currentValue);
        const calculation = calculate[operatorValue](firstValue, currentValue);
        console.log(calculation);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }

    //Ready for next value
    awaitingNextValue = true;
    operatorValue = operatorInput;
}

//Clear button
resetAll = () => { 
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
    calculatorDisplay.textContent = '0' 
};

//Add event listeners to the numbers, operators and decimal buttons
inputBtns.forEach((inputBtn) => {
    if(inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    } else if(inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
    } else if(inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', addDecimal);
    }
});

//Event listener for clear button
clearBtn.addEventListener('click', resetAll);