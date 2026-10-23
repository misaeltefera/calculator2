


class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (this.currentOperand === "Cannot divide by zero") {
            this.currentOperand = "";
        }

        if (number === "." && this.currentOperand.includes(".")) return;

        this.currentOperand += number;
    }

    chooseOperation(operation) {
        if (this.currentOperand === "" && this.previousOperand === "") return;

        if (this.currentOperand === "" && this.previousOperand !== "") {
            this.operation = operation;
            return;
        }

        if (this.previousOperand !== "") {
            this.compute();
        }

        if (this.currentOperand === "Cannot divide by zero") return;

        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    compute() {
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if (
            isNaN(prev) ||
            isNaN(current) ||
            this.operation == null
        ) {
            return;
        }

        let result;

        switch (this.operation) {
            case "+":
                result = prev + current;
                break;

            case "-":
                result = prev - current;
                break;

            case "*":
            case "×":
                result = prev * current;
                break;

            case "÷":
            case "/":
                if (current === 0) {
                    this.currentOperand = "Cannot divide by zero";
                    this.previousOperand = "";
                    this.operation = undefined;
                    return;
                }
                result = prev / current;
                break;

            default:
                return;
        }

        this.currentOperand = String(Number(result.toPrecision(12)));
        this.previousOperand = "";
        this.operation = undefined;
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText =
            this.currentOperand || "0";

        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
                `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = "";
        }
    }
}

// Select HTML elements
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");

const previousOperandTextElement = document.querySelector(
    "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
    "[data-current-operand]"
);

// Check that the HTML elements exist
if (
    !currentOperandTextElement ||
    !previousOperandTextElement ||
    !equalsButton ||
    !deleteButton ||
    !allClearButton
) {
    console.error("Error: Check your HTML data attributes.");
} else {
    const calculator = new Calculator(
        previousOperandTextElement,
        currentOperandTextElement
    );

    // Number buttons
    numberButtons.forEach(button => {
        button.addEventListener("click", () => {
            calculator.appendNumber(button.innerText.trim());
            calculator.updateDisplay();
        });
    });

    // Operation buttons
    operationButtons.forEach(button => {
        button.addEventListener("click", () => {
            calculator.chooseOperation(button.innerText.trim());
            calculator.updateDisplay();
        });
    });

    // Equals button
    equalsButton.addEventListener("click", () => {
        calculator.compute();
        calculator.updateDisplay();
    });

    // Clear button
    allClearButton.addEventListener("click", () => {
        calculator.clear();
        calculator.updateDisplay();
    });

    // Delete button
    deleteButton.addEventListener("click", () => {
        calculator.delete();
        calculator.updateDisplay();
    });

    // Initial display
    calculator.updateDisplay();

    console.log("Calculator JavaScript loaded successfully!");
}


