var sprintLength = 25;
var newSprintLength = 0;
var maxLength = 50;
// var shortBreakLength = 5;
// var longBreakLength = 15;
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
  // //create button for starting a sprint
  // sprintButton = createButton('sprint');
  // //startSprintButton.position(20,20);
  // sprintButton.mousePressed(startSprint);
  
  // //create button for starting a short break
  // shortBreakButton = createButton('short break');
  // shortBreakButton.mousePressed(shortBreak);
  
  // //create button for starting a long break
  // longBreakButton = createButton('long break');
  // longBreakButton.mousePressed(longBreak);

  // //create button for cancelling the timer
  // longBreakButton = createButton('cancel');
  // longBreakButton.mousePressed(cancelTimer);


  //create canvas
  createCanvas(1000,250);
  
  background(backgroundColor);
  noStroke();
  fill(170,255,0);
  rectMode(CORNERS);
  
  // createElement('form','<input width="550" spellcheck="false" placeholder="log entry..."></input> <input id="submit" type="submit"</input>');
  logInput = createInput('');
  logInput.size(950);
  logInput.attribute('id','entry');
  logInput.attribute('spellcheck','false');
  logInput.attribute('placeholder','log entry...');
  logInput.attribute('autofocus','true');

  textSize(32);  
  textAlign(CENTER);  
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
    rect(0,0,map(secondsLeft,0,maxLength*60,0,width),height);


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
    createElement('p','['+ getTime() +'] timer done');
   }

 
  

  
  // remember the current second to compare next time through
  previousSecond = second();


  // show length of new timer when hovering over timer bar
  if (mouseX > 0 && mouseX < width && mouseY >= 0 && mouseY < height) {

 
    // draw rect
    fill(100, 100, 100, 50);
    rect(0,0,mouseX,height);

    // update sprintLength to match hover
    newSprintLength = round(mouseX/20)
    
    // draw the length of the new timer when hovering
    // (dividing by 10 gives the 600 px canvas a max length of 60 minutes)
    fill(85,98,112);
    textFont('Open Sans')
    text("start " + newSprintLength + " minute sprint", width/2,(height/2) + 16); 
  
  // print(millis());

  }  
}

function getTime() {
  var time = "";
  time += hour()%12 + ":";

  if (minute() < 10) {
  	time += "0";
  }

  time += minute();

  if (hour() > 12) {
  	time += "pm";
  } else {
  	time += "am";
  }

  return time;
}

function keyPressed() {
  if (keyCode === ENTER && document.getElementById('entry').value !== '') {
    recordEntry();
  }
}

function recordEntry() {
  var entry = document.getElementById('entry');
  createElement('p','['+ getTime() +'] ' + entry.value);
  //createElement('p',entry.value);
  entry.value = '';
}

// start a timer for the desired number of seconds
function startSprint(seconds) {
  timerDone.stop();
  seconds = sprintLength*60; 
  secondsLeft = seconds;
  timerActive = true;

  createElement('p','['+ getTime() +'] ' + sprintLength + ' minute sprint started');
  
}

// function shortBreak(seconds) {
//   timerDone.stop();
//   seconds = shortBreakLength*60;
//   secondsLeft = seconds;
//   timerActive = true;

//   createElement('p','['+hour() + ':' + minute()+'] short break started');
  
// }

// function longBreak(seconds) {
//   timerDone.stop();
//   seconds = longBreakLength*60;
//   secondsLeft = seconds;
//   timerActive = true;

//   createElement('p','['+hour() + ':' + minute()+'] long break started');
// }

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

  if (mouseX > 0 && mouseX < width && mouseY >= 0 && mouseY < height) {
  	sprintLength = newSprintLength;
  	startSprint();
  }



} 