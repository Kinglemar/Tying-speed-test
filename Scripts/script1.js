const colorChanger = document.querySelector(".test-wrapper")
const inputBox = document.querySelector("#test-area")
const reference = document.querySelector("#origin-text p").innerHTML
const swap = document.querySelector("#origin-text p")
const resetButton = document.querySelector("#reset")
const stopWatch = document.querySelector(".timer")

var timer = [0, 0, 0, 0]
var interval
var errors = 0
var runClock = false


function addZero(time){
    if(time <= 9){
        time = "0" + time
    }
    return time
}


function runStopWatch(){
    timer[3]++

    timer[0] = Math.floor((timer[3]/100)/60) 
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60))
    timer[2] = Math.floor(timer[3] - (timer[1] * 100)- (timer[0] * 6000))

    stopWatch.innerHTML = addZero(timer[0]) + ":" + addZero(timer[1]) + ":" + addZero(timer[2])
}


function wordPerMin(){
    let minutes = (timer[0] * 60) + (timer[1])
    let conversion = (35/minutes) * 60
    return Math.floor(conversion)
}

function start(){
    let TextInputLength = inputBox.value.length
    if(TextInputLength === 0 && !runClock){
    runClock = true
    interval = setInterval(runStopWatch, 10)
    }
}

function spellCheck(){
    let textinput = inputBox.value
    let progress = reference.substring(0, textinput.length)


    if(textinput == reference){
        colorChanger.style.borderColor = "green"
        swap.style.color = "green"
        inputBox.style.color = "green"
        clearInterval(interval)
        alert("Congratulations you've completed the test! You completed the test within" + " " + timer[0] + " " + "Minutes" + " " + timer[1] + " " + "Seconds, with an error count of " + errors + "." + " " + "You typed " + wordPerMin() + " " + "words per minutes" + ".")
    } else{
        if(textinput == progress){
            colorChanger.style.borderColor = "blue"
        } else{
            colorChanger.style.borderColor = "red"
            errors++
        }
    } 

}

function reset(){
    clearInterval(interval)
    interval = null
    timer = [0,0,0,0]
    inputBox.value = ""
    inputBox.style.color = "#f94144"
    colorChanger.style.borderColor = "#bfc0c0"
    swap.style.color = "#f94144"
    stopWatch.innerHTML = "00:00:00"
    runClock = false
}



// Controls //

inputBox.addEventListener("keypress", start, false)
inputBox.addEventListener("keyup", spellCheck, false)
resetButton.addEventListener("click", reset, false)