// Timothe Faessel
var die1 = 0;
var die2 = 0;
var sum = 0;
var buttonEdited = false;
var gameStatus = "Simple Craps";
var editText = document.getElementById("gameText");
var gameButton = document.getElementById("startButton");



function fadeIn(element) { //fade in a hidden element
    let clarity = 0.1;  
    element.style.opacity = clarity;
    element.style.filter = 'alpha(opacity=' + clarity * 100 + ")";
    element.style.display = 'block';
    let timer = setInterval(function () {
        if (clarity >= 1){
            clearInterval(timer);
        }
        element.style.opacity = clarity;
        element.style.filter = 'alpha(opacity=' + clarity * 100 + ")";
        clarity += clarity * 0.1;
    }, 10);
}

// run the game
function startGame() {
    // get the two dies
    die1 = Math.ceil(Math.random()*6);
    die2 = Math.ceil(Math.random()*6);
    // sum them up
    sum = die1+die2;
    // determine game status
    if (sum == 7 || sum == 11) {
        gameStatus = "CRAPS - you lose";
    } else if (die1== die2 && die1%2 == 0) {
        gameStatus = "DOUBLES - you win";
    }
    // change text in page
    editText.innerHTML = ("Die 1: "+die1+"<br> Die 2: "+die2+"<br> Sum: "+sum+"<br> Game Result: "+gameStatus);
    // change text on button
    if (buttonEdited == false) {
        gameButton.innerHTML = "Play Again?";
        buttonEdited = true;
    }
    // fade in text once everything done
    fadeIn(editText);
}