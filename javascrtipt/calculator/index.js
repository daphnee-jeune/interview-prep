const clearDisplay = () => document.getElementById("display").value = "";

const appendNumber = (number) =>
  (document.getElementById("display").value += number);

const appendOperator = (operator) =>
  (document.getElementById("display").value += operator);

const appendDot = (dot) => {
  const display = document.getElementById("display");
  if (!display.value.includes(dot)) {
    display.value += dot;
  }
};

const computeResult = () => {
  const display = document.getElementById("display");
  try {
    display.value = eval(display.value);
  } catch (error) {
    display.value = "Error";
  }
};
