///////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////// display/input functins ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

let display = document.getElementById("para");
display.textContent = "0";

function displayNumber (number) {

    // check for active miscKey, if active and user tries to type the current number 
    // will be over written and key turned off
    if (miscKey == true){
        display.textContent = number;
        currentNumber = number;
        miscKey = false;
    
    //restricts input to limit of screen size 
    } else if (display.textContent.length == 11){
        display.textContent = number;
        currentNumber = number;

    //allows there to be a leading zero for decimals
    } else if (display.textContent == "0" && number == "."){
        display.textContent = display.textContent.concat(number)
        currentNumber = display.textContent;
    
     // makes sure there are no leading zeroes for larger numbers  
    } else if (display.textContent == "0"){
        display.textContent = number
        currentNumber = display.textContent;

    // only allow for one decimal point
    } else if (number == "." && display.textContent.includes(".")){

    // if current number doesnt exit but there is a displayed number (usually the result) 
    // the display clears and updates
    } else if (currentNumber == null){
        display.textContent = number
        currentNumber = display.textContent;

    //updates number digit by digit
    } else {
        display.textContent = display.textContent.concat(number)
        currentNumber = display.textContent;
    }
}

// allows user to delete through the current number but not the result of an operation/feedback 
function backspace (){
    if (display.textContent == "0" || currentNumber == null){
    } else if (display.textContent.length == "1"){
        display.textContent = "0"
        currentNumber = display.textContent;

    } else {
        display.textContent = display.textContent.slice(0,-1)
        currentNumber = display.textContent;
    }
}

// resets back to initial conditions 
function clearCalc(){
    display.textContent = "0";
    currentNumber = 0;
    previousNumber = null;
    operation = null;
    result = {};
    miscKey = false;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////// operations ////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

//displays the rounded number but retains the actual
function add (prevNum, curNum) {
    result.whole = (+prevNum + +curNum);
    result.rounded = rounder(result.whole);
    return result
}

function subtract (prevNum, curNum) {
    result.whole = (+prevNum - +curNum)
    result.rounded = rounder(result.whole);
    return result
}

function multiply (prevNum, curNum) {
    result.whole = (prevNum * curNum);
    result.rounded = rounder(result.whole);
    return result
}

function divide (prevNum, curNum) {
    result.whole = (prevNum / curNum);
    result.rounded = rounder(result.whole);
    return result
}

// miscKey is the boolean for the % and +/- keys so that they can be used repeatedly
// on the current number but not affect anything else 
let miscKey = false;
function percent () {
    currentNumber /= 100
    display.textContent = rounder (parseInt(display.textContent)/100);
    miscKey = true
}

function posiNegi () {
    currentNumber *= -1;
    display.textContent = currentNumber;
    miscKey = true;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////// operator //////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

// initial variables
let currentNumber = 0;
let previousNumber = null;
let operation = null; 
let result = {};

function operator (operationCall) {

    //initial case where only current number is defined (0)
    if (operation == null && currentNumber != null && previousNumber == null){
        operation = operationCall;
        previousNumber = currentNumber;
        currentNumber = null;

        // allows user to declare operation before inputting second number 
    } else if (operation == null && previousNumber != null && currentNumber == null){
        operation = operationCall;

        //all three components must be defined before an operation can proceed 
    } else if (operation != null && previousNumber != null && currentNumber != null){
        if (operation == "addition"){
            add(previousNumber, currentNumber)
        } else if (operation == "subtraction"){
            subtract(previousNumber, currentNumber)
        } else if (operation == "multiplication"){
            multiply(previousNumber, currentNumber)
        } else if (operation == "division"){
            // user cannot divide by zero, boohoo
            if (currentNumber == "0"){
                display.textContent = "BooHoo";
                currentNumber = null;
                previousNumber = null;
                operation = null;
                return
            } else {
                divide(previousNumber, currentNumber)
            }
        }
        //no new operation will be logged if the = button is pressed. 
        //otherwise the next operation to perform is logged
        if (operationCall == "equals"){
            operation = null;
        } else {
            operation = operationCall
        }
         // prepares next operation by reassigning variables
        previousNumber = result.whole ;
        display.textContent = result.rounded ;
        currentNumber = null;
        miscKey = false;
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////// rounder ///////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

function rounder (res){
    //rounds non integer and small numbers 
    if (!Number.isInteger(res)){
        return parseFloat(res.toFixed(4))
    
    // javascript automatically switches to scientific notation for very large numbers
    // by adding this check i avoid putting it in scientific notation twice
    } else if (res.toString().includes("e")) {
        return (`${res.toString().slice(0,4)}` + `${res.toString().slice(res.toString().indexOf("e"), res.toString().length)}`);
    
    //rounds large numbers
    } else if (res.toString().length > 11){
        return (`${res.toString().slice(0,1)}` + "." + `${res.toString().slice(1,3)}` + "e" + "+" + `${res.toString().length-1}`)
    
    // if it doesnt need rounding it is returned 
    } else {
        return res
    }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////// keyboard input ////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

//allows user input for number keys, backspace, and enter
document.addEventListener('keydown', logKey);
function logKey(e) {
    if (48 <= e.keyCode && e.keyCode <= 57) {
        displayNumber(e.key)
    } else if (e.keyCode == 8) {
        backspace()
    } else if (e.keyCode == 13) {
        operator(operation)
    }
}