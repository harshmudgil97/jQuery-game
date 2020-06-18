var gameColors = ["red","green","yellow","blue"];
var gamePattern = [];
var userPattern = [];
var temp = [];

var level = 0;

function wrongAlert(iconName){
  var alertAudio = new Audio("sounds/wrong.mp3");

  alertAudio.play();

  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);

  $("h1").html("Game Over, Press Any Key to Restart");



  while(temp.length){
    temp.pop();
  }

  while(gamePattern.length){
    gamePattern.pop();
  }

  while(userPattern.length){
    userPattern.pop();
  }

  level = 0;
 }

function experienceHandler(iconName){
  var audioName = "sounds/"+iconName +".mp3";
  var audio = new Audio(audioName);
  audio.play();

  $("#"+iconName).addClass("pressed");

  setTimeout(function () {
    $("#"+iconName).removeClass("pressed")

  }, 150);

}

function patternGenerator(){
  level++
  var randomNum = Math.floor(Math.random()*4);
  for(var i = 0; i<gameColors.length; i++){
    if(i==randomNum){
      gamePattern.push(gameColors[i]);
      experienceHandler(gameColors[i]);
    }
  }

  while(temp.length){
    temp.pop();
  }
}

$(".btn").on("click",function(){
    var flag = 0;
  if(level == 0){
    flag = -1;
  }

  else{



    temp.push(this.id);
    if(temp.length > userPattern.length){
      for(var i = 0; i<temp.length;i++){
        if(temp[i]==gamePattern[i]){
          flag = 1;
        }
        else{

          flag = -1;
        }
      }
    }

    else{
      for(var i = 0; i<temp.length;i++){
        if(temp[i]==userPattern[i]){
          experienceHandler(this.id);
          continue;
        }

        else{
          flag = -1;

        }
      }
    }
  }

  if(flag == 1){
    userPattern.push(this.id);

    experienceHandler(this.id);

    setTimeout(function () {
      patternGenerator(this.id);
    }, 550);

    flag = 0;
  }

  else if(flag == -1){
    wrongAlert(this.id);
    experienceHandler(this.id);
    flag = 0;
  }

});


$(document).on("keypress",function(event){

  if(level == 0){
    patternGenerator(event.key);
  }

});
