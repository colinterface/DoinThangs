var pomLength = 25;
var shortBreakLength = 5;
var longBreakLength = 15;
var secondsLeft = 0;
var timerActive = false;
var previousSecond = 60;
var backgroundColor = 240;

//preload all sounds
function preload() {
  timerDone = loadSound('alarm01.wav');
  // tick = loadSound('tick.mp3')
  // tick.setVolume(.05); //quiet tick sound for debugging
}

function setup() {
  //create button for starting a pomodoro
  pomodoroButton = createButton('pomodoro');
  //startPomButton.position(20,20);
  pomodoroButton.mousePressed(startPom);
  
  //create button for starting a short break
  shortBreakButton = createButton('short break');
  shortBreakButton.mousePressed(shortBreak);
  
  //create button for starting a long break
  longBreakButton = createButton('long break');
  longBreakButton.mousePressed(longBreak);

  //create button for cancelling the timer
  longBreakButton = createButton('cancel');
  longBreakButton.mousePressed(cancelTimer);


  //create canvas
  createCanvas(600,140);
  
  background(backgroundColor);
  noStroke();
  fill(170,255,0);
  rectMode(CORNERS);
  
  
  // createElement('form','<input width="550" spellcheck="false" placeholder="log entry..."></input> <input id="submit" type="submit"</input>');
  logInput = createInput('');
  logInput.size(550);
  logInput.attribute('id','entry');
  logInput.attribute('spellcheck','false');
  logInput.attribute('placeholder','log entry...');
  logInput.attribute('autofocus','true');
  
  
}

function draw() {

//clear background
background(backgroundColor);   

// count the passing of seconds
// looks like second() doesn't work when the user is on another tab
// maybe millis() would work
var currentSecond = second();
  if (timerActive === true) {  
    if (currentSecond != previousSecond) {
      secondsLeft -= 1;
//      playTick();
    }

    //draw progress bar
    rect(0,0,map(secondsLeft,0,pomLength*60,0,width),200); //add *60 to pom minutes


    // //debugging stuff
    // print("timerActive: " + timerActive);
    // print("previousSecond: " + previousSecond);
    // print("currentSecond: " + currentSecond);
    print("secondsLeft: " + secondsLeft);
    
  }

  // play timer done sound when timer is active and hits zero  
  if (timerActive === true && secondsLeft<1) {
    timerActive = false;
    playTimerDone();
    createElement('p','['+hour() + ':' + minute()+'] timer done. please rate your time [****]');
   }

 
  

  
  // remember the current second to compare next time through
  previousSecond = second();

  
  
  // print(millis());
}

function keyPressed() {
  if (keyCode === ENTER && document.getElementById('entry').value !== '') {
    recordEntry();
  }
}

function recordEntry() {
  var entry = document.getElementById('entry');
  createElement('p','['+hour() + ':' + minute()+'] ' + entry.value);
  //createElement('p',entry.value);
  entry.value = '';
}

// start a timer for the desired number of seconds
function startPom(seconds) {
  timerDone.stop();
  seconds = pomLength*60; 
  secondsLeft = seconds;
  timerActive = true;

  createElement('p','['+hour() + ':' + minute()+'] pomodoro started');
  
}

function shortBreak(seconds) {
  timerDone.stop();
  seconds = shortBreakLength*60;
  secondsLeft = seconds;
  timerActive = true;

  createElement('p','['+hour() + ':' + minute()+'] short break started');
  
}

function longBreak(seconds) {
  timerDone.stop();
  seconds = longBreakLength*60;
  secondsLeft = seconds;
  timerActive = true;

  createElement('p','['+hour() + ':' + minute()+'] long break started');
}

function cancelTimer() {
  timerActive = false;
  background(backgroundColor);
  createElement('p','['+hour() + ':' + minute()+'] timer cancelled');
}


// function playTick() {
//   tick.play();
// }

function playTimerDone() {
  timerDone.loop();
}

function mouseClicked() {
  timerDone.stop();
}