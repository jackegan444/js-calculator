var displayString = '';
num1 = null;
num2 = null;
operation = '';
const calcBody = document.querySelector('#calc-body');
const calcDisplay = document.querySelector('#calc-display');
calcDisplay.textContent = displayString;
const numberButtons = [];
const operatorsHTML = document.getElementsByClassName("operator");
const operatorButtons = Array.from(operatorsHTML);
const allClearButton = document.querySelector('#all-clear-btn');
const zeroButton = document.querySelector('#zero-btn');
const equalsButton = document.querySelector('#equals-btn');
const decimalButton = document.querySelector('#decimal-btn');

function operate(operator, num1, num2) {
    switch (operator) {
        case "+":
            return parseFloat(num1) + parseFloat(num2);
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;
        case "/":
            return num1 / num2;
    }
}

function inputNum(input) {
    displayString = displayString.concat(input);
    calcDisplay.textContent = displayString;
}

function inputOperator(newOperator) {
    if (displayString === '' || displayString.charAt(displayString.length-1) == '.') {
        return;
    } else if (isNaN(parseInt(displayString.charAt(displayString.length-1)))) {
        operation = newOperator;
        displayString = displayString.slice(0, -1) + operation;
    }
    
    else if (num1 == null) {
        num1 = parseFloat(displayString);
        operation = newOperator;
        displayString = displayString.concat(operation);
    } else {
        num2 = displayString.split(operation)[1];
        num1 = operate(operation, num1, num2);
        operation = newOperator;
        displayString = (Math.round((num1 + Number.EPSILON) * 1000000000) / 1000000000).toString(); + operation;
    }
    calcDisplay.textContent = displayString;
}

currentNum = 1;
for (i = 0; i <= 2; i++) {
    numberButtons.push([]);
    for (j = 0; j <= 2; j++) {
        numberButtons[i].push(document.createElement('button'));
        numberButtons[i][j].style.cssText = `grid-row: ${7-i} / ${8-i}; grid-column: ${j+1} / ${j+2}`;
        numberButtons[i][j].textContent = `${currentNum}`;
        numberButtons[i][j].addEventListener('click', function() {inputNum(this.textContent)});
        currentNum++;
        calcBody.appendChild(numberButtons[i][j]);
    }
}

for (i = 0; i < 4; i++) {
    operatorButtons[i].addEventListener('click', function() {inputOperator(this.textContent)});
}

allClearButton.addEventListener('click', function(){
    displayString = '';
    num1 = null;
    num2 = null;
    operator = ''
    calcDisplay.textContent = displayString;
});

zeroButton.addEventListener('click', function() {inputNum(this.textContent)});

equalsButton.addEventListener('click', function(){
    if (num1 == null) {
        return;
    } else if (isNaN(parseInt(displayString.charAt(displayString.length-1)))) {
        return;
    } else {
        num2 = displayString.split(operation)[1];
        num1 = operate(operation, num1, num2);
        displayString = (Math.round((num1 + Number.EPSILON) * 1000000000) / 1000000000).toString();
        calcDisplay.textContent = displayString;
        num1 = null;
        num2 = null;
    }
});

decimalButton.addEventListener('click', function() {
    if (isNaN(parseInt(displayString.charAt(displayString.length-1)))) {
        if (displayString.charAt(displayString.length-1) == '.') {
            return;
        } else {
            displayString = displayString + '0.'
            calcDisplay.textContent = displayString;
        }
    } else if (num1 == null) {
        if (displayString.indexOf('.') == -1) {
            displayString = displayString + '.';
            calcDisplay.textContent = displayString;
        }
    } else {
        decimalTester = displayString.split(operation)[1];
        if (decimalTester.indexOf('.') == -1) {
            displayString = displayString + '.';
            calcDisplay.textContent = displayString;
        }

    }
    
});