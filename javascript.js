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
    } else if (currentNumber == null){
        display.textContent = number
        currentNumber = display.textContent;
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

    } else {
        display.textContent = display.textContent.slice(0,-1)
        currentNumber = display.textContent;
    }
}

function clearCalc(){
    display.textContent = "0";
    currentNumber = 0;
    previousNumber = null;
    operation = null;
    result = null;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////// operations ////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

function add (prevNum, curNum) {
    result = (+prevNum + +curNum);
    previousNumber = result ;
    display.textContent = result ;
    currentNumber = null;
    // operation = null;

    // currentNumber = result;
    // display.textContent = result;
    // previousNumber = null;
}

function subtract (prevNum, curNum) {
    result = (+prevNum - +curNum);
    previousNumber = result ;
    display.textContent = result ;
    currentNumber = null;
    // operation = null;
}

function multiply (prevNum, curNum) {
    result = (prevNum * curNum);
    previousNumber = result ;
    display.textContent = result ;
    currentNumber = null;
    // operation = null;
}

function divide (prevNum, curNum) {
    if (curNum == 0){
        display.textContent = "BooHoo"
        // operation = null;
    } else {
        result = (prevNum / curNum);
        previousNumber = result ;
        display.textContent = result ;
        currentNumber = null;
        // operation = null;
    }
}

function percent () {
    currentNumber /= 100;
    display.textContent = currentNumber;
}

function posiNegi () {
    currentNumber *= -1;
    display.textContent = currentNumber;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////// operator //////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

let currentNumber = 0;
let previousNumber = null;
let operation = null; 
let result = null;

function operator (operationCall) {

    //initial case where only current number is defined (0)
    if (operation == null && currentNumber != null && previousNumber == null){
        operation = operationCall;
        // display.textContent = "0"
        previousNumber = currentNumber;
        currentNumber = null;

        // allows user to change operation before inputting second number 
    } else if (operation == null && previousNumber != null && currentNumber == null){
        operation = operationCall;
        // display.textContent = "0"

        //all three components must be defined before an operation can proceed 
    } else if (operation != null && previousNumber != null && currentNumber != null){
        if (operation == "addition"){
            add(previousNumber, currentNumber)
        } else if (operation == "subtraction"){
            subtract(previousNumber, currentNumber)
        } else if (operation == "multiplication"){
            multiply(previousNumber, currentNumber)
        } else if (operation == "division"){
            divide(previousNumber, currentNumber)
        }
        //no new operation will be logged if the = button is pressed. 
        //otherwise the next operation to perform is logged
        if (operationCall == "equals"){
            operation = null;
        } else {
            operation = operationCall
        }
    }
}