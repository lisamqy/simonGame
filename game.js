
let buttonColors = ["red", "blue", "green", "yellow"]; //set list of colors
let gamePattern = []; //game pattern
let userClickedPattern = []; //player pattern
let started = false;
let level = 0;

// Add key press function
$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Add click function
$(".btn").click(function() {
  let userChosenColor = $(this).attr("id"); //capturing the color clicked
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

// Check user answers
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) { //check if the user answer is the same as the generated pattern
    if (userClickedPattern.length === gamePattern.length){ //check if the rest of the  user's sequence is correct
      setTimeout(function(){ //if so, move onto the next level/sequence
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("h1").html("(╥_╥) Hit Any Key to Retry");
    startOver(); //calls the startOver function if user gets wrong answer
  }
}

function nextSequence() {
  userClickedPattern = []; //once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level
  level++;
  $("#level-title").text("Level " + level);
  let randomNumber = Math.floor(Math.random() * 4); //generating random num 0-3
  let randomChosenColor = buttonColors[randomNumber]; //generating random color from color list
  gamePattern.push(randomChosenColor); //plugging colors to game pattern
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100); //add flash to colored button
  playSound(randomChosenColor);
}

// Add Sounds
function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3"); //add audio to button
  audio.play();
}

// Flash animation
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// start the game over again
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
