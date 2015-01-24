var sprintLength = 25;
var newSprintLength = 0;
var maxLength = 60;
var secondsLeft = sprintLength*60;
var timerActive = false;
var previousSecond = 60;
var backgroundColor = 240;

var canvas;

//preload all sounds
function preload() {
  timerDone = loadSound('alarm01.wav');
}

function setup() {
  //create canvas
  canvas = createCanvas(800,200);
  canvas.id('canvas');
  
  background(backgroundColor);
  noStroke();
  fill(170,255,0);
  rectMode(CORNERS);

  textSize(62);  
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
    }




    // //debugging stuff
    print("secondsLeft: " + secondsLeft);
    
  }

  //draw progress bar
  rect(0,0,map(secondsLeft,0,maxLength*60,0,width),height);

  // play timer done sound when timer is active and hits zero  
  if (timerActive === true && secondsLeft<1) {
    timerActive = false;
    playTimerDone();
    //createElement('p','['+ getTime() +'] timer done');
    //createElement('p', 'sprint completed. how did it go?');
    createElement('span', '<input type="radio" name="rating" value="1"><i></i><input type="radio" name="rating" value="2"><i></i><input type="radio" name="rating" value="3"><i></i><input type="radio" name="rating" value="4"><i></i><input type="radio" name="rating" value="5"><i></i>').addClass('star-rating');

   }

 
  

  
  // remember the current second to compare next time through
  previousSecond = second();


  // show length of new timer when hovering over timer bar
  if (mouseX > 0 && mouseX < width && mouseY >= 0 && mouseY < height) {

 
    // draw rect
    fill(100, 100, 100, 50);
    rect(0,0,mouseX,height);

    // update sprintLength
    newSprintLength = round(mouseX/13.3)
    
    // draw the length of the new timer
    fill(85,98,112);
    textFont('Open Sans');
    text(newSprintLength + " minute sprint", width/2,(height/2) + 16); 
  

  }  else {
    fill(85,98,112);
    textFont('Open Sans');
    text(round(secondsLeft/60) + " minute sprint", width/2,(height/2) + 16); 

  }

  


}

// function getTime() {
//   var time = "";
//   time += hour()%12 + ":";

//   if (minute() < 10) {
//   	time += "0";
//   }

//   time += minute();

//   if (hour() > 12) {
//   	time += "pm";
//   } else {
//   	time += "am";
//   }

//   return time;
// }

function keyPressed() {
  if (keyCode === ENTER && document.getElementById('entry').value !== '') {
    recordEntry();
  }
}

function recordEntry() {
  var entry = document.getElementById('entry');
  //createElement('p','['+ getTime() +'] ' + entry.value);
  createElement('p', '\"' + entry.value + '\"').addClass('logEntry');
  entry.value = '';
}

function getRadioVal(form, name) {
  var val;
  // get list of radio buttons with specified name
  var radios = form.elements[name];
  
  // loop through list of radio buttons
  for (var i=0, len=radios.length; i<len; i++) {
      if ( radios[i].checked ) { // radio checked?
          val = radios[i].value; // if so, hold its value in val
          break; // and break out of for loop
      }
  }
  return val; // return value of checked radio or undefined if none checked
}

// start a timer for the desired number of seconds
function startSprint() {
  var currentTask = getRadioVal( document.getElementById('tasks'), 'radios' );
  timerDone.stop();
  timerActive = true;

  //createElement('p','['+ getTime() +'] ' + sprintLength + ' minute sprint started. current task: ' + currentTask);
  createElement('p', currentTask + ' for ' + sprintLength + ' minutes!');

}

function cancelTimer() {
  timerActive = false;
  background(backgroundColor);
  createElement('p','['+hour() + ':' + minute()+'] timer cancelled');
}

function playTimerDone() {
  timerDone.loop();
  sprintLength = 25;
  secondsLeft = sprintLength*60;

}

function mouseClicked() {
  timerDone.stop();

  if (mouseX > 0 && mouseX < width && mouseY >= 0 && mouseY < height) {
  sprintLength = newSprintLength;
  secondsLeft = sprintLength*60;

  	//startSprint();
  }
} 