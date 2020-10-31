var buttonColours = ["red" , "blue" , "green" , "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var start = false;

//click any key to begin game
$(document).keypress(function()
{
    //if start = false then game is yet to begin set level to 0 and call nextsequence
    if(!start)
    {
        $("#level-title").text("Level " + level);
        nextSequence();
        start = true;
    }
});

//finding color clicked using this on attribute(id) returns color
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);

    animatePress(userChosenColour);
  
    //suppose in level 3 this is second click 
    //gamepattern = red blue red
    //userclickedpattern = red blue(only 2 clicks done till now) 
    //so (2-1)=1 is passed in checkanswer
    //it check whether gamepattern[1]===userclickedpattern[1]  
    checkAnswer(userClickedPattern.length-1);                                                                                                                                                                          
});

function checkAnswer(currentLevel)
{
    //check last click of user matches with gamepattern click at that index
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
        //just for us to check click correct or not
        console.log("success");

        //once game pattern length is equal to userclickedpattern then move to next level 
        //if all click matches game pattern order
        if(gamePattern.length === userClickedPattern.length)
        {
            setTimeout(function()
            {
                nextSequence();
            },1000);
        } 
    }
    else
    {
        //wrong click
        console.log("wrong");

        //if wrong click wrong sound track plays
        var audio = new Audio("sounds/" + "wrong" + ".mp3");
        audio.play();

        //adding gameover class to body
        $("body").addClass("game-over");

        //removing class gameover after 200 ms
        setTimeout(function()
        {
            $("body").removeClass("game-over");
        },200);

        //changing text of id level-title to restart if user has clicked wrong
        $("#level-title").text("Game Over, Press Any Key to Restart");

        //call startover function if wrong click
        startOver();
    }
    

}

//starts game again
function startOver()
{
    level = 0;
    start = false;
    gamePattern = [];
}

function nextSequence()
{
    //emptying array for each level
    userClickedPattern=[];

    //increasing level after completing each level successfully
    level++;
    $("#level-title").text("Level " + level);

    //generating random number between 0-3
    var n = Math.random();
    n=n*4;
    var randomNumber = Math.floor(n);
    
    //using random number as index find color from buttoncolours array n push it in gamepattern
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    //animate a flash to selected button
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

//play sound on clicking
function playSound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//animate button on click
function animatePress(currentColour)
{
    //adding class to id color makes it grey
    $("#" + currentColour).addClass("pressed");

    //remove class pressed after 100 millisecond
    setTimeout(function()
    {
        $("#" + currentColour).removeClass("pressed");
    },100);
}





