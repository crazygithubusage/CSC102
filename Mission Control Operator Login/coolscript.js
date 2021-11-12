// Timothe Faessel
var launchButton = document.getElementById("launchButton");
var alreadyLaunched = document.getElementById("alreadyLaunched");
var launchText = document.getElementById("launchText");
var launchTimerText = document.getElementById("launchTimer");
var launchTimerStart = 50;
var launchTimer = launchTimerStart;
var launchStarted = false;
var textFlash = false;
var interval = 0;
var loginForm = document.getElementById("loginForm");
var firstNameInput = document.getElementById("firstName");
var lastNameInput = document.getElementById("lastName");
var badgeInput = document.getElementById("badgeID");
var userDetailsText = document.getElementById("userDetails");

function fadeOut(element) {  //function to slowly fade out then completely hide an HTML element
    let clarity = 1; 
    let timer = setInterval(function() {
        if (clarity <= 0.1) {
            clearInterval(timer);
            element.style.display = "none";
        }
        element.style.opacity = clarity;
        element.style.filter = "alpha(opacity=" + clarity * 100 + ")";
        clarity -= clarity * 0.1;
    }, 50);
}
function fadeIn(element) {
    let clarity = 0.1;
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (clarity >= 1){
            clearInterval(timer);
        }
        element.style.opacity = clarity;
        element.style.filter = 'alpha(opacity=' + clarity * 100 + ")";
        clarity += clarity * 0.1;
    }, 10);
}


function finishLaunch() {  // complete the launch sequence
    clearInterval(interval);
    window.alert("Blast Off! Rocket has been launched!")
    launchTimerText.style.color = "black";
    launchTimerText.innerHTML = "Launch Sequence Completed!";
}

function launchCountdown() {  //slowly count down and flash text, alert every 5s

    if (launchTimer === 1) {
        finishLaunch();
        return;
    }

    if (textFlash === false) {
        launchTimerText.style.color = "red";
        textFlash = true;
    }else {
        launchTimerText.style.color = "black";
        textFlash = false;
    }

    launchTimer=launchTimer-1;
    if (launchTimer<=(launchTimerStart/2)) {
        launchTimerText.innerHTML = ("Warning: Less than ½ way to launch<br>TIME UNTIL LAUNCH: "+launchTimer+" seconds.");
    } else {
        launchTimerText.innerHTML = ("TIME UNTIL LAUNCH: "+launchTimer+" seconds.");
    }
    
    if ((launchTimer%5 === 0) && (launchTimer != launchTimerStart)) {
        window.alert(launchTimer+" seconds until launch!");
    }
    
}
function initiateLaunch() { //initial button push
    
    if (launchStarted === true) {  //ensure button can't be triggered twice
        return; 
    }

    launchText.innerHTML = "Launch sequence has been started!";
    fadeOut(launchButton);
    launchTimerText.style.fontSize = "x-large";
    window.alert("Launch Sequence Initiated!, "+launchTimer+" seconds until launch!");
    interval = setInterval(launchCountdown, 1000);
    launchStarted = true;

}



function handleLoginLimit() {
    let count1 = firstNameInput.value.length;
    let count2 = lastNameInput.value.length;
    let remaining=20;
    firstNameInput.maxLength = 20 - count2;
    lastNameInput.maxLength = 20 - count1;
    remaining = 20 - count1 - count2;
    if (remaining === 0) {
        window.alert("first name and last name can not be more than 20 characters combined!");
    }
}   

firstNameInput.addEventListener("keyup", function() {
    handleLoginLimit();
});

lastNameInput.addEventListener("keyup", function() {
    handleLoginLimit();
});


function handleBadgeID() {
    badgeInput.value = Math.abs(badgeInput.value)
    while (badgeInput.value.length > 3) {
        badgeInput.value = Math.floor(badgeInput.value/10);
    }
}

badgeInput.addEventListener("keyup", function() {
    handleBadgeID();
});

function submitLogin() {
    let fullName = firstNameInput.value + " " + lastNameInput.value;
    userDetailsText.innerHTML = "Welcome, logged in as: "+fullName+" with badge ID "+badgeInput.value+"!";
    window.alert("Welcome, "+firstNameInput.value+" "+lastNameInput.value+"!");
    //fade out every element within the login class
    let loginElements = document.getElementsByClassName("login");
    for (let i = 0; i < loginElements.length; i++) {
        loginElements[i].style.display = "none";
    }
    // fade in every element with the centered class
    let centeredElements = document.getElementsByClassName("centered");
    for (let i = 0; i < centeredElements.length; i++) {
        fadeIn(centeredElements[i]);
    }
}