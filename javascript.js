///////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////// display functins //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////


let display = document.getElementById("para");
display.textContent = "0";

function displayNumber (number) {

    if (display.textContent.length == 11 ){

    } else if (display.textContent == "0" && number == "."){
        display.textContent = display.textContent.concat(number)
        currentNumber = display.textContent;

    } else if (display.textContent == "0"){
        display.textContent = number
        currentNumber = display.textContent;

    } else if (number == "." && display.textContent.includes(".")){
    } else {
        display.textContent = display.textContent.concat(number)
        currentNumber = display.textContent;
    }
}

function backspace (){
    if (display.textContent == "0"){
    } else if (display.textContent.length == "1"){
        display.textContent = "0"
        currentNumber = display.textContent;

    }else {
        display.textContent = display.textContent.slice(0,-1)
        currentNumber = display.textContent;
    }
}

function clearDisplay(){
    display.textContent = "0";
    currentNumber = 0;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////// operations ////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

function add (previousNumber, currentNumber) {
    return (previousNumber + currentNumber)
}
function subtract (currentNumber,previousNumber) {
    return (previousNumber - currentNumber)
}

function multiply (currentNumber,previousNumber) {
    return (previousNumber * currentNumber)
}

function divide (currentNumber,previousNumber) {
    return (previousNumber / currentNumber)
}

function percent (currentNumber) {
    return currentNumber / 100
}

function posiNegi (currentNumber) {
    return currentNumber * -1
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////// operator //////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

let currentNumber = 0;
let previousNumber = null;
let operation = null; 

function operator (currentNumber, previousNumber, operationCall) {
    if (operation == null && previousNumber == null){
        operation = operationCall;
        display.textContent = "0"

        previousNumber = currentNumber;
        currentNumber = "0";
    } else if (operation != null && previousNumber != null){

    }
}