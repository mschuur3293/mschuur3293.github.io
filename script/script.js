/* 
    Melanie Schuur
    CIS 215
    Final Project
*/

/*  
    This is the javascript for my game
    All functions are described below
*/

// Variables
var objs = [];
var currentObjectID = 0;
var currentScore = 0;

/*
    Ready function
    All functionality have been removed from this, added to play button in html file
*/
$(document).ready(function () {
    //beginGame();
});

/*
    Begins the game
*/
function beginGame() {
    objs = buildObjectArray();
    populatePageContent(0);
    $('#startGame').addClass('hidden');
    $('#titleDiv').removeClass('hidden');
    $('#imageDiv').removeClass('hidden');
    $('#answers').removeClass('hidden');
    $('#scoreDiv').removeClass('hidden');
}

/*
    Changes all of the default within the html file to the data in the array
    @param {Number} objID
*/
function populatePageContent(objID) {
    $('#answer1').attr('data-correct', 'false');
    $('#answer2').attr('data-correct', 'false');
    $('#answer3').attr('data-correct', 'false');
    $('#answer4').attr('data-correct', 'false');

    // Setting variable to the return of the getRandomArbitrary() function
    var answerNumber = getRandomArbitrary(1, 4);

    // Populating the page using the questions data
    $('#characterImg').attr('src', objs[objID].characterImage);
    $('#data' + answerNumber).text(objs[objID].characterName);
    $('#answer' + answerNumber).attr('data-correct', 'true');

    // Populating the list with incorrect answers
    if (answerNumber == 1) {
        $('#data' + 2).text(objs[objID].wrongAnswer1);
        $('#data' + 3).text(objs[objID].wrongAnswer2);
        $('#data' + 4).text(objs[objID].wrongAnswer3);
    }
    if (answerNumber == 2) {
        $('#data' + 1).text(objs[objID].wrongAnswer1);
        $('#data' + 3).text(objs[objID].wrongAnswer2);
        $('#data' + 4).text(objs[objID].wrongAnswer3);
    }
    if (answerNumber == 3) {
        $('#data' + 1).text(objs[objID].wrongAnswer1);
        $('#data' + 2).text(objs[objID].wrongAnswer2);
        $('#data' + 4).text(objs[objID].wrongAnswer3);
    }
    if (answerNumber == 4) {
        $('#data' + 1).text(objs[objID].wrongAnswer1);
        $('#data' + 2).text(objs[objID].wrongAnswer2);
        $('#data' + 3).text(objs[objID].wrongAnswer3);
    }
}

/*
    Creates objects then fills an array with the objects
    @return {Object} objs
*/
function buildObjectArray() {
    var character1 = {
        characterName: "Jake",
        characterShow: "show Adventure Time",
        characterImage: "images/jake_dog.png",
        wrongAnswer1: "Odie",
        wrongAnswer2: "Finn",
        wrongAnswer3: "Gromit"
    };
    var character2 = {
        characterName: "Olaf",
        characterShow: "movie Frozen",
        characterImage: "images/olaf_snowman.jpg",
        wrongAnswer1: "Frosty",
        wrongAnswer2: "Megatron",
        wrongAnswer3: "Sven"
    };
    var character3 = {
        characterName: "Giant Realistic Flying Tiger",
        characterShow: "show Uncle Grandpa",
        characterImage: "images/grft.png",
        wrongAnswer1: "Pizza Steve",
        wrongAnswer2: "Bojack Horseman",
        wrongAnswer3: "Swiper"
    };
    var character4 = {
        characterName: "Nemo",
        characterShow: "movie Finding Nemo",
        characterImage: "images/nemo_fish.jpg",
        wrongAnswer1: "Flipper",
        wrongAnswer2: "Dory",
        wrongAnswer3: "Sebastian"
    };
    var character5 = {
        characterName: "Joy",
        characterShow: "movie Inside Out",
        characterImage: "images/joy_emotion.jpg",
        wrongAnswer1: "Bing Bong",
        wrongAnswer2: "Ariel",
        wrongAnswer3: "Elsa"
    };
    var character6 = {
        characterName: "Uncle Grandpa",
        characterShow: "show Uncle Grandpa",
        characterImage: "images/uncle_grandpa.jpg",
        wrongAnswer1: "Meatwad",
        wrongAnswer2: "Ice King",
        wrongAnswer3: "Stimpy"
    };
    var character7 = {
        characterName: "Starfire",
        characterShow: "show Teen Titans Go",
        characterImage: "images/starfire.png",
        wrongAnswer1: "Princess Carolyn",
        wrongAnswer2: "Princess Bubblegum",
        wrongAnswer3: "Raven"
    };
    var character8 = {
        characterName: "Spongebob Squarepants",
        characterShow: "show Spongebob Squarepants",
        characterImage: "images/spongebob.png",
        wrongAnswer1: "Shrek",
        wrongAnswer2: "Patrick",
        wrongAnswer3: "Bolt"
    };

    objs = [character1, character2, character3, character4, character5, character6, character7, character8];
    return objs;
}

/*
    When an answer selection is chosen, this function is called to check if selected answer is correct
    @param {Object} e
*/
function checkAnswer(e) {
    processModal(e);
    setGameState();
}

/*
    After the user has selected an answer, this function unhides the modal and alerts the user if they were correct.
    This function also tallies the user's score
    @param {Object} e
*/
function processModal(e) {
    if ($('#' + e.id).attr('data-correct') === 'true') {
        currentScore = currentScore + 100;
        $('#modalTitle').html('Correct!');
        $('#modalMessage').html('The correct answers is ' + objs[currentObjectID].characterName + ', who is from the ' + objs[currentObjectID].characterShow);
        $('#modalScore').html('You earned 100 points!');
        $('#result').html('Your score is: ' + currentScore);
        $('#modalHeader').removeClass('bg-danger');
        $('#modalHeader').addClass('bg-success');
    }
    else {
        $('#modalTitle').html('Incorrect!');
        $('#modalMessage').html('The correct answers is ' + objs[currentObjectID].characterName + ', who is from the ' + objs[currentObjectID].characterShow);
        $('#modalScore').html('You earned 0 points');
        $('#result').html('Your score is: ' + currentScore);
        $('#modalHeader').removeClass('bg-success');
        $('#modalHeader').addClass('bg-danger');
    }
}

/*
    Sets the state of the game depending on the current object ID
*/
function setGameState() {
    if (currentObjectID === objs.length - 1) {
        finishGame();
    }
    else {
        currentObjectID++;
    }
    populatePageContent(currentObjectID);
}

/*
    This function will finish the game and hide/unhide divs appropriately
*/
function finishGame() {
    $('#startGame').removeClass('hidden');
    $('#startButton').addClass('btn-danger');
    $('#answers').addClass('hidden');
    $('#titleDiv').addClass('hidden');
    $('#imageDiv').addClass('hidden');
    $('#answers').addClass('hidden');
    $('#startButton').text('Play again?');
    $('#startButton').attr('onclick', 'location.reload()');
}

/*
    Gets a random number between 1 and number of answer selections
    @param {Number} min
    @param {Number} max
    @return {Number} random number
*/
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
