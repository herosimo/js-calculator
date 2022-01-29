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
// Create commas after finding 3 values
const updateNumberWithCommas = (numbers) => {
  if (numbers) {
    var parts = numbers.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  } else {
    return numbers;
  }
};

// Remove the commas
const updateNumberToOriginalValue = (numbers) => {
  if (numbers) {
    return numbers.toString().split(",").join("");
  } else {
    return numbers;
  }
};

const updateScreen = (prevVal, currentVal) => {
  prev = updateNumberToOriginalValue(prevVal);
  current = updateNumberToOriginalValue(currentVal);

  prevScreen.innerHTML = updateNumberWithCommas(prev);
  currentScreen.innerHTML = updateNumberWithCommas(current);
};

const updateOperand = (operandVal) => {
  operand = operandVal;
  operandScreen.innerHTML = operand;
};

const updateValue = () => {
  switch (operand) {
    case "+":
      prev =
        Number(updateNumberToOriginalValue(prev)) + Number(updateNumberToOriginalValue(current));
      current = null;
      break;

    case "-":
      prev =
        Number(updateNumberToOriginalValue(prev)) - Number(updateNumberToOriginalValue(current));
      current = null;
      break;

    case "×":
      prev =
        Number(updateNumberToOriginalValue(prev)) * Number(updateNumberToOriginalValue(current));
      current = null;
      break;

    case "÷":
      prev =
        Number(updateNumberToOriginalValue(prev)) / Number(updateNumberToOriginalValue(current));
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

  // Control button dot
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
  // Control when user types a number
  if (e.target.innerHTML === "000" && !currentScreen.innerHTML) {
    // Prevent triple zeros at first value
    currentScreen.innerHTML = "0";
  } else {
    updateScreen(prev, currentScreen.innerHTML + e.target.innerHTML);
  }
};

numbers.forEach((number) => {
  number.addEventListener("click", numberClick);
});

// User clicks delete
const delClick = () => {
  updateScreen(prev, currentScreen.innerHTML.slice(0, currentScreen.innerHTML.length - 1));
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
  if (!current && current !== 0 && !prev) {
    return;
  }

  if (!prev) {
    updateOperand(operandVal);
    updateScreen(current, null);
  } else if (!current) {
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
  }

  if (!current) {
    return;
  }

  updateValue(operand);
  current = prev;
  prev = null;
  updateOperand(null);
  updateScreen(prev, current);
};

// User clicks plus-minus
const doPlusMinus = () => {
  if (!current) {
    return;
  }

  updateScreen(prev, -Number(updateNumberToOriginalValue(currentScreen.innerHTML)));
};

adds.addEventListener("click", () => doOperation("+"));
mins.addEventListener("click", () => doOperation("-"));
times.addEventListener("click", () => doOperation("×"));
divides.addEventListener("click", () => doOperation("÷"));
plusMinus.addEventListener("click", doPlusMinus);
equals.addEventListener("click", doEquals);
