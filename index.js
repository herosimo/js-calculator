// Output
let prev = null;
let current = null;
let operand = null;

// Output Screen
const prevScreen = document.querySelector("[data-previous]");
const currentScreen = document.querySelector("[data-current]");
const operandScreen = document.querySelector("[data-operand]");

// Buttons
const numbers = Array.from(document.querySelectorAll("[data-numbers]"));
const ac = document.querySelector("[data-ac]");
const del = document.querySelector("[data-del]");
const divides = document.querySelector("[data-divides]");
const times = document.querySelector("[data-times]");
const mins = document.querySelector("[data-mins]");
const adds = document.querySelector("[data-adds]");
const equals = document.querySelector("[data-equals]");
// const dot = document.querySelector("[data-dot]");

// General functions
const updateScreen = (prevVal, currentVal) => {
  prev = prevVal;
  current = currentVal;

  prevScreen.innerHTML = prev;
  currentScreen.innerHTML = current;
};

const updateOperand = (operandVal) => {
  operand = operandVal;
  operandScreen.innerHTML = operand;
};

// User clicks numbers
const numberClick = (e) => {
  // Control when first value is 0
  if (currentScreen.innerHTML && currentScreen.innerHTML[0].includes("0")) {
    if (e.target.innerHTML === "0" && !currentScreen.innerHTML.includes(".")) {
      return;
    } else if (e.target.innerHTML !== "." && !currentScreen.innerHTML.includes(".")) {
      currentScreen.innerHTML = currentScreen.innerHTML.substring(1);
    }
  }

  // To prevent double dots
  if (e.target.innerHTML === "." && currentScreen.innerHTML.includes(".")) {
    return;
  }

  currentScreen.innerHTML = currentScreen.innerHTML + e.target.outerText;
};

numbers.forEach((number) => {
  number.addEventListener("click", numberClick);
});

// User clicks delete
const delClick = () => {
  currentScreen.innerHTML = currentScreen.innerHTML.slice(0, currentScreen.innerHTML.length - 1);
};

del.addEventListener("click", delClick);

// User clicks AC
const acClick = () => {
  updateScreen(null, null);
  updateOperand(null);
};

ac.addEventListener("click", acClick);

// User clicks operation
const updateValue = () => {
  switch (operand) {
    case "+":
      prev = Number(prev) + Number(currentScreen.innerHTML);
      current = null;
      break;

    case "-":
      prev = Number(prev) - Number(currentScreen.innerHTML);
      current = null;
      break;

    case "*":
      prev = Number(prev) * Number(currentScreen.innerHTML);
      current = null;
      break;

    case "/":
      prev = Number(prev) / Number(currentScreen.innerHTML);
      current = null;
      break;
  }
};

const doOperation = (operandVal) => {
  if (prev === null) {
    updateOperand(operandVal);
    updateScreen(currentScreen.innerHTML, null);
  } else {
    updateValue();
    updateScreen(prev, current);
    updateOperand(operandVal);
  }
};

const doEquals = () => {
  if (!operand && !prev) {
    return;
  } else {
    updateValue(operand);
    current = prev;
    prev = null;
    updateOperand(null);
    updateScreen(prev, current);
  }
};

adds.addEventListener("click", () => doOperation("+"));
mins.addEventListener("click", () => doOperation("-"));
times.addEventListener("click", () => doOperation("*"));
divides.addEventListener("click", () => doOperation("/"));
equals.addEventListener("click", doEquals);

window.state = {
  prev: prev,
  current: current,
  operand: operand,
};
