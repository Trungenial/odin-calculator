const keys = document.querySelectorAll(".number, .operator");
keys.forEach((key) => {
  let keyText = "";
  key.addEventListener("click", () => {
    keyText = key.innerHTML;

    displayString += keyText;
    if (!isNaN(parseInt(keyText))) {
      resultString = String(operate(displayString));
    }
    displayOnScreen(keyText);
  });
});

let resultString = "0";
let displayString = "";
function displayOnScreen(keyText) {
  document.querySelector(".expression").innerHTML = displayString;
  document.querySelector(".result").innerHTML = resultString;
}

displayOnScreen("");

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
  if (num2 !== 0) {
    return num1 / num2;
  } else {
    return null;
  }
}

function infixToPostfix(expression) {
  const precedence = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
  };

  const isOperator = (c) => ["+", "-", "*", "/"].includes(c);
  const stack = [];
  const output = [];
  let numberBuffer = "";

  for (let char of expression) {
    if (!isNaN(char) || char === ".") {
      numberBuffer += char;
    } else if (isOperator(char)) {
      if (numberBuffer) {
        output.push(numberBuffer);
        numberBuffer = "";
      }
      while (
        stack.length &&
        precedence[char] <= precedence[stack[stack.length - 1]]
      ) {
        output.push(stack.pop());
      }
      stack.push(char);
    }
  }

  if (numberBuffer) {
    output.push(numberBuffer);
  }

  while (stack.length) {
    output.push(stack.pop());
  }

  return output.join(" ");
}

function evaluatePostfix(expression) {
  const stack = [];
  const tokens = expression.split(" ");

  for (let token of tokens) {
    if (!isNaN(token)) {
      stack.push(parseFloat(token));
    } else {
      const b = stack.pop();
      const a = stack.pop();

      switch (token) {
        case "+":
          stack.push(a + b);
          break;
        case "-":
          stack.push(a - b);
          break;
        case "*":
          stack.push(a * b);
          break;
        case "/":
          stack.push(a / b);
          break;
        default:
          throw new Error("Toán tử không hợp lệ");
      }
    }
  }

  return stack[0];
}

function operate(displayString) {
  const postfixExpression = infixToPostfix(displayString);
  console.log(`Biểu thức hậu tố: ${postfixExpression}`);
  const result = evaluatePostfix(postfixExpression);
  return result;
}
