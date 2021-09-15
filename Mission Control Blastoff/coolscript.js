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
    launchTimerText.innerHTML = ("TIME UNTIL LAUNCH: "+launchTimer+" seconds.");
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
