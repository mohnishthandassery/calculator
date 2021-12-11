function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  console.log(operator);
  switch (operator) {
    case "add":
      return add(a, b);

    case "subtract":
      return subtract(a, b);

    case "multiply":
      return multiply(a, b);

    case "divide":
      return divide(a, b);

    default:
      break;
  }
}

let previousValue = 0;
let currentValue = 0;
let displayValue = 0;
let selectedOperator;

const updateDisplay = (e) => {
  const number = e.target.innerText;

  currentValue === 0 ? (currentValue = number) : (currentValue += number);
  displayValue = currentValue;
  updateDisplayElement();
};

const updateDisplayElement = () => {
  const element = document.getElementById("display-value");
  element.textContent = displayValue;
};

const handleOperatorClick = (e) => {
  if (selectedOperator) {
    handleOperation();
  }
  const op = e.target.id;
  previousValue = currentValue;
  currentValue = 0;
  selectedOperator = op;
  updateDisplayElement();
};

const handleOperation = () => {
  if (!selectedOperator) return; // No operator exception
  // divide by zero exception
  if (selectedOperator === "divide" && currentValue == 0) {
    alert("Task failed successfully.");
    return;
  }
  currentValue = operate(
    selectedOperator,
    Number(previousValue),
    Number(currentValue)
  );
  displayValue = currentValue;
  updateDisplayElement();
};

const handleClear = () => {
  previousValue = 0;
  currentValue = 0;
  displayValue = 0;
  selectedOperator = "";

  updateDisplayElement();
};

const buttons = document.querySelectorAll("button"); // Get all buttons

const numbers = Array.from(buttons).filter((button) => !isNaN(button.id)); // Get number buttons
const operators = Array.from(buttons).filter((button) =>
  ["add", "subtract", "multiply", "divide"].includes(button.id)
); // Get operator buttons
const equals = document.getElementById("equals"); // Get equals button
const clear = document.getElementById("clear"); // Get clear button

numbers.forEach((number) => {
  number.addEventListener("click", updateDisplay);
});

operators.forEach((operator) => {
  operator.addEventListener("click", handleOperatorClick);
});

equals.addEventListener("click", handleOperation);
clear.addEventListener("click", handleClear);
