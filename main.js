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

const updateDisplay = (number) => {
  currentValue === 0 ? (currentValue = number) : (currentValue += number);
  displayValue = currentValue;
  updateDisplayElement();
};

const handleDelete = () => {
  if (currentValue === 0) return;
  let value = currentValue.split("");
  value.pop();
  currentValue = value.length ? value.join() : 0;
  displayValue = currentValue;
  updateDisplayElement();
};

const updateDisplayElement = () => {
  const element = document.getElementById("display-value");
  element.textContent = displayValue;
};

const handleNumber = (e) => {
  const number = e.target.innerText;
  updateDisplay(number);
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
  currentValue =
    countDecimals(currentValue) > 3 ? currentValue.toFixed(3) : currentValue;
  displayValue = currentValue; // Round answers with long decimals so that they don’t overflow the screen
  updateDisplayElement();
};

const handleClear = () => {
  previousValue = 0;
  currentValue = 0;
  displayValue = 0;
  selectedOperator = "";

  updateDisplayElement();
};

const handleDecimal = (e) => {
  if (currentValue !== 0 && hasDecimals(currentValue) > 0) return;
  handleNumber(e);
};

const handleKeydown = (e) => {
  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const operators = ["+", "-", "*", "/"];
  const operatorIds = {
    "+": "add",
    "-": "subtract",
    "*": "multiply",
    "/": "divide",
  };
  if (numbers.includes(e.key)) {
    updateDisplay(e.key);
  }
  if (operators.includes(e.key)) {
    handleOperatorClick({ target: { id: operatorIds[e.key] } });
  }
  if (e.key === "=" || e.key === "Enter") {
    handleOperation();
  }
  if (e.key === ".") {
    handleDecimal({ target: { innerText: e.key } });
  }
  if (e.key === "Backspace") {
    handleDelete();
  }
};

const countDecimals = (value) => {
  if (Math.floor(value) !== value) {
    return value.toString().split(".")[1].length || 0;
  }
  return 0;
};

const hasDecimals = (value) => {
  return value.split("").filter((x) => x === ".").length;
};

const buttons = document.querySelectorAll("button"); // Get all buttons

const numbers = Array.from(buttons).filter((button) => !isNaN(button.id)); // Get number buttons
const operators = Array.from(buttons).filter((button) =>
  ["add", "subtract", "multiply", "divide"].includes(button.id)
); // Get operator buttons
const equals = document.getElementById("equals"); // Get equals button
const clear = document.getElementById("clear"); // Get clear button
const decimal = document.getElementById("decimal"); // Get decimal button
const backspace = document.getElementById("delete"); // Get delete button

numbers.forEach((number) => {
  number.addEventListener("click", handleNumber);
});

operators.forEach((operator) => {
  operator.addEventListener("click", handleOperatorClick);
});

equals.addEventListener("click", handleOperation);
clear.addEventListener("click", handleClear);
decimal.addEventListener("click", handleDecimal);
backspace.addEventListener("click", handleDelete);

document.addEventListener("keydown", handleKeydown);
