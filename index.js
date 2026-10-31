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

function modulo(num1, num2) {
  return num1 % num2;
}

const calculator = document.querySelector("#calculator");
const display = calculator.querySelector("#display");
const buttons = calculator.querySelector(".buttons");

let value1 = null;
let value2 = null;
let operator = null;

let currentInput = "0";
let waitingForSecondOperand = false;
let justEvaluated = false;

const operations = {
  "+": add,
  "-": subtract,
  "×": multiply,
  "÷": divide,
  "%": modulo,
};

function updateDisplay() {
  display.textContent = currentInput;
}

function formatNumber(number) {
  return Number.isFinite(number)
    ? Number(number.toPrecision(10)).toString()
    : String(number);
}

function resetCalculator(message = "0") {
  value1 = null;
  value2 = null;
  operator = null;

  currentInput = message;
  waitingForSecondOperand = false;
  justEvaluated = message !== "0";

  updateDisplay();
}

function operate(operation, num1, num2) {
  return operations[operation](num1, num2);
}

function performCalculation() {
  value2 = Number(currentInput);

  if ((operator === "÷" || operator === "%") && value2 === 0) {
    resetCalculator("Error Invalid");
    return false;
  }

  const result = operate(operator, value1, value2);

  if (!Number.isFinite(result)) {
    resetCalculator("Error Invalid");
    return false;
  }

  value1 = result;
  value2 = null;
  currentInput = formatNumber(result);

  updateDisplay();
  return true;
}

function calculate() {
  if (
    value1 === null ||
    operator === null ||
    waitingForSecondOperand ||
    !performCalculation()
  ) {
    return;
  }

  operator = null;
  justEvaluated = true;
  waitingForSecondOperand = false;
}

function inputDigit(digit) {
  if (justEvaluated) {
    resetCalculator();
  }

  if (waitingForSecondOperand) {
    currentInput = digit === "." ? "0." : digit;
    waitingForSecondOperand = false;
  } else {
    if (digit === "." && currentInput.includes(".")) return;

    if (digit === ".") {
      currentInput += ".";
    } else if (currentInput === "0") {
      currentInput = digit;
    } else {
      currentInput += digit;
    }
  }

  updateDisplay();
}

function selectOperator(nextOperator) {
  if (justEvaluated) {
    justEvaluated = false;
  } else if (value1 === null) {
    value1 = Number(currentInput);
  } else if (operator !== null && !waitingForSecondOperand) {
    if (!performCalculation()) return;
  }

  operator = nextOperator;
  waitingForSecondOperand = true;
}

function deleteLastDigit() {
  if (waitingForSecondOperand || justEvaluated) return;

  currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : "0";

  if (currentInput === "-") currentInput = "0";

  updateDisplay();
}

buttons.addEventListener("click", (event) => {
  const button = event.target.closest(".buttons > div");

  if (!button) return;

  const value = button.textContent.trim();

  if (button.classList.contains("digit")) {
    inputDigit(value);
  } else if (button.classList.contains("operators")) {
    selectOperator(value);
  } else if (button.classList.contains("calculate")) {
    calculate();
  } else if (button.classList.contains("delete")) {
    value === "C" ? resetCalculator() : deleteLastDigit();
  }
});

document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (/^[0-9.]$/.test(key)) {
    inputDigit(key);
  } else if (["+", "-"].includes(key)) {
    selectOperator(key);
  } else if (key === "*") {
    selectOperator("×");
  } else if (key === "/") {
    event.preventDefault();
    selectOperator("÷");
  } else if (key === "%") {
    selectOperator("%");
  } else if (key === "Enter" || key === "=") {
    calculate();
  } else if (key === "Backspace") {
    deleteLastDigit();
  } else if (key === "Escape") {
    resetCalculator();
  }
});

updateDisplay();
