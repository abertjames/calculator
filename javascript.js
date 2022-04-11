let display = document.getElementById("para");
display.textContent = "0";
function displayNumber (number) {
    if (display.textContent.length == 11 ){
    }else if (display.textContent == "0"){
        display.textContent = number
    } else if (number == "." && display.textContent.includes(".")){
    } else {
        display.textContent = display.textContent.concat(number)
    }
}

function backspace (){
    if (display.textContent == "0"){
        return
    } else {
        display.textContent = display.textContent.slice(0,-1)
    }
}

function clearDisplay(){
    display.textContent = "0";
}