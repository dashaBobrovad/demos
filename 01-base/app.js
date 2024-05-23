const resultElement = document.getElementById("result");
const input1Element = document.getElementById("input1");
const input2Element = document.getElementById("input2");
const btnElement = document.getElementById("submit");
const plusBtn = document.getElementById("plus");
const minusBtn = document.getElementById("minus");

const OPERATIONS = {
    MINUS: "minus",
    PLUS: "plus",
}

let operationType;

const sumFn = function(val1, val2) {
    return Number(val1) + Number(val2)
}

const minusFn = function(val1, val2) {
    return Number(val1) - Number(val2)
}

const onSubmitClick = function(operationType) {
    resultElement.textContent = sumFn(input1Element.value, input2Element.value);
}

// plusBtn.addEventListener("click", onBtnClick);
// minusBtn.addEventListener("click", onBtnClick);

btnElement.addEventListener("click", onSubmitClick);
