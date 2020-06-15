var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var template = [];
var counter = 0;

function wrongAns() {
  $("body").addClass("game-over");
  $("h1").text("Game Over, Press Any Key to Restart")

  var audio = new Audio("sounds/wrong.mp3");
  audio.play();

  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);

  level = 0;


  while (gamePattern.length > 0) {
    gamePattern.pop();
  }

  while (userClickedPattern.length > 0) {
    userClickedPattern.pop();
  }
  while (template.length > 0) {
    template.pop();
  }
}

function animantePress(currentColour) {
  $("." + currentColour).addClass("pressed");

  setTimeout(function() {
    $("." + currentColour).removeClass("pressed");
  }, 100);
}

function playSound(crossSound) {

  var audio = new Audio("sounds/" + crossSound + ".mp3");
  audio.play();

  $("#" + crossSound).fadeOut(100).fadeIn(100);
}

function nextSequence() {
  level++;
  while (template.length > 0) {
    template.pop();
  }

  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);


  playSound(randomChosenColour);
  animantePress(randomChosenColour);

}



$(".btn").on("click", function() {

  var userChosenColour = this.id;
  playSound(userChosenColour);
  animantePress(userChosenColour);
  if (level == 0) {
    wrongAns();
  } else {

    template.push(userChosenColour);

    var flag = 0;
    if (template.length > userClickedPattern.length) {
      for (var i = 0; i < gamePattern.length; i++) {
        if (template[i] == gamePattern[i]) {
          flag = 1;
        } else {
          flag = 0;
          wrongAns();
        }

      }
    } else {
      for (var i = 0; i < userClickedPattern.length; i++) {
        if (template[i] == userClickedPattern[i]) {
          break;
        } else {
          flag = 0;
          wrongAns();
        }
      }
    }

    if (flag == 1) {
        userClickedPattern.push(userChosenColour);
        setTimeout(function() {
          counter++;
          console.log(counter);

          nextSequence();
        }, 480);

        flag = 0;

      }

  }

});


$(document).keypress(function() {

  if (level == 0) {

    nextSequence();

  }


});
