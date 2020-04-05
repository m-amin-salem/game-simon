// Variables:------------------------------------------------------->

var keyPressCounter = 0;
var level = 0;
var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

// Events:------------------------------------------------------->

// 1- Start the game when any key is pressed:
$(document).keydown(function() {
    
    keyPressCounter ++;

    if (keyPressCounter === 1) {

        $("#level-title").html("Level " + level);
        nextSequence();    
    }
});

// 2- When user clicks on the button:
$(".btn").click(function() {

    //Get which button was pressed & add it into the user chosen colors array:
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    
    //Play sound:
    playSound(userChosenColour);

    //Add effect:
    animatePress(userChosenColour);

    //Check if the user's answer is correct:
    checkAnswer(userClickedPattern.length -1);    
});


// Functions:----------------------------------------------------------->

//The game random colors:
function nextSequence() {

    //Empty userClickedPattern:
    userClickedPattern = [];

    //Create a rondom number in range o ~ 3:
    var randomNumber = Math.random() * 4;
    randomNumber = Math.floor(randomNumber);

    //Assoisate the rondome number with a color:
    var randomChosenColour = buttonColours[randomNumber];

    //Putt the random color into an game pattern array:
    gamePattern.push(randomChosenColour);

    //Flash the color's button:
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    //Play a sound:
    playSound(randomChosenColour);

    //Increase the level:
    level ++;
    $("#level-title").html("Level " + level);
}


//Add Sound:
function playSound(name) {
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}


//Add pressed effect:
function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");
    setTimeout(function() {
        $("." + currentColour).removeClass("pressed");
    }, 100);
}


//Compare the game and user choses:
function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        
        console.log("Success");
        
        if (userClickedPattern.length == gamePattern.length) {

            setTimeout(nextSequence(), 1000);
        }
        
    } else {

        //Play wrong sound:
        var sound = new Audio("sounds/wrong.mp3");
        sound.play();

        //Flash red background:
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        //Change the Head to Game over:
        $("h1").html("Game Over, Press Any Key to Restart.");

        //restart:
        startOver();
    }
}


//Restart the Game:
function startOver() {
    keyPressCounter = 0;
    level = 0;
    gamePattern = [];
}
// ----------------------------------------------------------------->