///////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////// display/input functins ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

let display = document.getElementById("para");
display.textContent = "0";

function displayNumber (number) {

    //restricts input to limit of screen size 
    if (display.textContent.length == 11){
        display.textContent = number;
        currentNumber = number;

    //allows there to be a leading zero in the display
    } else if (display.textContent == "0" && number == "."){
        display.textContent = display.textContent.concat(number)
        currentNumber = display.textContent;

    } else if (display.textContent == "0"){
        display.textContent = number
        currentNumber = display.textContent;

    // only allow for one decimal point
    } else if (number == "." && display.textContent.includes(".")){

    // if current number doesnt exit but there is a displayed number the display clears and updates
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
    result = null;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////// operations ////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

function add (prevNum, curNum) {
    return result = rounder(+prevNum + +curNum);
}

function subtract (prevNum, curNum) {
    return result = rounder(+prevNum - +curNum);
}

function multiply (prevNum, curNum) {
    return result = rounder (prevNum * curNum);

}

function divide (prevNum, curNum) {
    return result = rounder (prevNum / curNum);
}

function percent () {
    currentNumber /= 100;
    display.textContent = rounder (currentNumber);
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
        previousNumber = currentNumber;
        currentNumber = null;

        // allows user to change operation before inputting second number 
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
         
        previousNumber = result ;
        display.textContent = result ;
        currentNumber = null;
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////// rounder ///////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

function rounder (res){
    //rounds small numbers 
    if (!Number.isInteger(res)){
        return parseFloat(res.toFixed(4))
    
    // javascript automatically switches to scientific notation for very large numbers
    //by adding this check i putting it in scientific notation twice
    // assuming largest number possible is 99999999999 x 9999999999 
    } else if (res.toString().includes("e")) {
        return (`${res.toString().slice(0,4)}` + `${res.toString().slice(-4)}`)
        //rounds large numbers
    } else if (res.toString().length > 11){
        return (`${res.toString().slice(0,1)}` + "." + `${res.toString().slice(1,3)}` + "e" + "+" + `${res.toString().length-1}`)
    } else {
        return res
    }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////// keyboard input ////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////