function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

const calculator = document.querySelector("#calculator");
const display = calculator.querySelector("#display");

let value1;
let value2;
let operator;

function operate(operator, num1, num2) {
  switch (operator) {
    case "+": {
      return add(num1, num2);
    }
    case "-": {
      return subtract(num1, num2);
    }
    case "*": {
      return multiply(num1, num2);
    }
    case "/": {
      return divide(num1, num2);
    }
  }
}
