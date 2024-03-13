var toggleButton = document.getElementById("toggleButton");
var showHistoryButton = document.getElementById("showHistory");
const historyDiv = document.getElementById("history");
showHistoryButton.addEventListener("click", function () {
    historyDiv.classList.toggle("show");
});

toggleButton.addEventListener("click", function (event) {
    event.preventDefault();
    document.querySelector(".btnWrapper").classList.toggle("showBtnsOnToogle");
});

document.addEventListener("DOMContentLoaded", function () {
    // Variables to store calculator state
    let currentInput = "";
   // let history = "";
    let history = [];
    // Get screen element
    const screen = document.getElementById("screen");
    // Function to update screen with current input
    function updateScreen() {
        screen.value = currentInput;
    }
    // Function to append a character to the current input
    function appendToInput(char) {
        currentInput += char;
        updateScreen();
    }
    // Function to handle keyboard input using a direct key-to-action mapping
function handleKeyboardInput(event) {
    const key = event.key;
    // Map keys to corresponding actions
    const keyActions = {
        "Enter": "=",
        "Backspace": "AC",
        "Delete": "AC",
        "%": "%",
        "(": "(",
        ")": ")",
        "+": "+",
        "-": "-",
        "*": "*",
        "/": "/",
        ".": ".", // If you want to support decimal point input
        "0": "0",
        "1": "1",
        "2": "2",
        "3": "3",
        "4": "4",
        "5": "5",
        "6": "6",
        "7": "7",
        "8": "8",
        "9": "9",
    };
    const action = keyActions[key];
    if (action !== undefined) {
        event.preventDefault(); // Prevent default action for recognized keys
        // Handle the action based on the key
        if (action === "=") {
            handleButtonClick({ target: { textContent: "=" } });
        } else if (action === "AC") {
            currentInput = "";
            updateScreen();
        } else {
            appendToInput(action);
        }
    }
}
// Add event listener for keyboard input
document.addEventListener("keydown", handleKeyboardInput);
    // Function to handle number and operator button clicks
    function handleButtonClick(event) {
        const buttonValue = event.target.textContent;
        if (buttonValue === "=") {
            if (screen.value.trim() !== "") {
                try {
                    const result = evalWithFunctions(currentInput);
                  history.push(`${currentInput} = ${result}`);
                    currentInput = result;
                } catch (error) {
                    currentInput = error;
                }
        } else{
            return false;
        }
        updateHistory();
        } else if (buttonValue === "AC") {
            currentInput = "";
        } else if (buttonValue === "CE") {
            currentInput = currentInput.slice(0, -1);
        } else if (buttonValue === "%") {
            appendToInput("/100*");
        } else if(buttonValue === "ALL"){
            return false;
        } else {
            appendToInput(buttonValue);
        }
        updateScreen();
    }

    function evalWithFunctions(input) {
        return eval(input.replace(/sin|cos|tan|sqrt|log10|log/g, match => `Math.${match}`));
    }

    // Function to handle special function button clicks
    function handleSpecialButtonClick(event) {
        const buttonValue = event.target.textContent;
        if (buttonValue === "(" || buttonValue === ")") {
            appendToInput(buttonValue);
        } else if (buttonValue === "&#x2218;") {
            appendToInput("**");
        } else if (buttonValue === "x ²") {
            appendToInput("**2");
        } else if (buttonValue === "√") {
            appendToInput("sqrt(");
        } else if (buttonValue === "!") {
            appendToInput("factorial(");
        }else if (buttonValue === "sin" || buttonValue === "cos" || buttonValue === "tan") {
            appendToInput(`${buttonValue}(`);
         }else if (buttonValue === "log") {
            appendToInput("log10(");
        } else if (buttonValue === "ln") {
            appendToInput("log(");
        }  else if (buttonValue === "x^") {
            appendToInput("**");
        } else if (buttonValue === "rad") {
            appendToInput("* Math.PI / 180");
        } else if (buttonValue === "∘") {
            appendToInput("/ 180 * Math.PI"); 
        } else if (buttonValue === "π") {
            appendToInput(Math.PI);
        } else if (buttonValue === "e") {
            console.log( screen.value);
            if( screen.value === ""){
                appendToInput(Math.E);
            } else{
                appendToInput("*Math.E");
            }
        }
    }

    function factorial(n) {
        return n <= 1 ? 1 : n * factorial(n - 1);
    }


    const buttons = document.querySelectorAll(".button");
    buttons.forEach(button => {
        if (button.classList.contains("showOnToogle")) {
            button.addEventListener("click", handleSpecialButtonClick);
        } else {
            button.addEventListener("click", handleButtonClick);
        }
    });

    // Function to update history
    function updateHistory() {
        historyDiv.innerHTML = ""; // Clear previous content
        history.forEach(item => {
            historyDiv.innerHTML += item + "<br>"; // Append each item with a line break
        });
    }
});
