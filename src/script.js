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
const plusMinus = document.querySelector("[data-plus-minus]");
const divides = document.querySelector("[data-divides]");
const times = document.querySelector("[data-times]");
const mins = document.querySelector("[data-mins]");
const adds = document.querySelector("[data-adds]");
const equals = document.querySelector("[data-equals]");

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

const updateValue = () => {
  switch (operand) {
    case "+":
      prev = Number(prev) + Number(current);
      current = null;
      break;

    case "-":
      prev = Number(prev) - Number(current);
      current = null;
      break;

    case "×":
      prev = Number(prev) * Number(current);
      current = null;
      break;

    case "÷":
      prev = Number(prev) / Number(current);
      current = null;
      break;
  }
};

// User clicks numbers
const numberClick = (e) => {
  // Control when first value is 0
  if (currentScreen.innerHTML && currentScreen.innerHTML[0].includes("0")) {
    if (e.target.innerHTML === "0" && !currentScreen.innerHTML.includes(".")) {
      // Prevent double zeros
      return;
    } else if (e.target.innerHTML !== "." && !currentScreen.innerHTML.includes(".")) {
      // Remove zero at first value when it's not a decimal
      currentScreen.innerHTML = currentScreen.innerHTML.substring(1);
    }
  }

  // Control dot
  if (e.target.innerHTML === ".") {
    // Prevent double dots
    if (currentScreen.innerHTML.includes(".")) {
      return;
    }

    // Give zero when typing first dot
    if (!currentScreen.innerHTML) {
      currentScreen.innerHTML = "0";
    }
  }

  currentScreen.innerHTML = currentScreen.innerHTML + e.target.outerText;
  current = currentScreen.innerHTML;
};

numbers.forEach((number) => {
  number.addEventListener("click", numberClick);
});

// User clicks delete
const delClick = () => {
  currentScreen.innerHTML = currentScreen.innerHTML.slice(0, currentScreen.innerHTML.length - 1);
  current = currentScreen.innerHTML;
};

del.addEventListener("click", delClick);

// User clicks AC
const acClick = () => {
  updateScreen(null, null);
  updateOperand(null);
};

ac.addEventListener("click", acClick);

// User clicks operation (-, +, *, /)
const doOperation = (operandVal) => {
  if (prev === null) {
    updateOperand(operandVal);
    updateScreen(current, null);
  } else if (current === null) {
    updateOperand(operandVal);
  } else {
    updateValue();
    updateScreen(prev, current);
    updateOperand(operandVal);
  }
};

// User clicks equals
const doEquals = () => {
  if (!operand && !prev) {
    return;
  } else if (!current) {
    return;
  } else {
    updateValue(operand);
    current = prev;
    prev = null;
    updateOperand(null);
    updateScreen(prev, current);
  }
};

// User clicks plus-minus
const doPlusMinus = () => {
  currentScreen.innerHTML = -currentScreen.innerHTML;
  current = currentScreen.innerHTML;
};

adds.addEventListener("click", () => doOperation("+"));
mins.addEventListener("click", () => doOperation("-"));
times.addEventListener("click", () => doOperation("×"));
divides.addEventListener("click", () => doOperation("÷"));
plusMinus.addEventListener("click", doPlusMinus);
equals.addEventListener("click", doEquals);
