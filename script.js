var containerEl = document.querySelector(".container");
var highScoreButton = document.querySelector("#hi-scores");
var timerEl = document.querySelector("#timer");
var startQuizButton = document.querySelector("#start-button");

var quiz = {
    questions: ["What should be used to repeat a block of code a certain number of times?",
        "What javascript keyword is used to define variables?",
        "What method can be used to select an HTML element to modify?",
        "What method is used to make HTML elements react to an event?",
        "What shorthand notation is used to increment a variable?"],
    options: ["1. for loop,2. copy-pasting code,3. querySelector,4. if/else statement",
        "1. function,2. var,3. if,4. none of the above",
        "1. querySelector(),2. parseInt(),3. getItem(),4. setAttribute()",
        "1. createElement(),2. appendChild(),3. parse(),4. addEventListener()",
        "1. ==,2. -=,3. ++,4. !="],
    answers: [1, 2, 1, 4, 3],
}

var highScores = {
    scores: [],
    initials: []
};

//Populate high scores from local storage
var storedHighScores = JSON.parse(localStorage.getItem("highScores"));
if (storedHighScores != null) {
    highScores.scores = storedHighScores.scores;
    highScores.initials = storedHighScores.initials;
}

var interval;
var choiceSelection;
var userGuess;
var userScore = 0;
var questionCount = 0;
var secondsLeft = 75;

//Populates the page with the next question in the quiz object
function renderNextQuestion() {

    //Clears container html and creates new divs to store the question and answers
    containerEl.innerHTML = "";
    var questionEl = document.createElement("div");
    questionEl.className = "row justify-content-center mt-5";
    var optionsEl = document.createElement("div");
    optionsEl.className = "row mt-4";
    containerEl.appendChild(questionEl);
    containerEl.appendChild(optionsEl);

    //Creates a header for the question and a list group for the choices
    var questionTextEl = document.createElement("h2");
    questionTextEl.textContent = quiz.questions[questionCount];
    var optionsListEl = document.createElement("ul");
    optionsListEl.className = "list-group col-8 mx-auto options-list";
    questionEl.appendChild(questionTextEl);
    optionsEl.appendChild(optionsListEl);

    //Populates the list group with the possible choices
    for (var i = 0; i < quiz.options[questionCount].split(",").length; i++) {
        var optionLi = document.createElement("li");
        optionLi.className = "list-group-item options";
        optionLi.setAttribute("value", i + 1);
        optionLi.textContent = quiz.options[questionCount].split(",")[i];
        optionsListEl.appendChild(optionLi);
    }

    //Adds to the counter to track which question is next
    questionCount++;

    //Adds on click event for the choice list then populates next question once a choice has been selected
    choiceSelection = document.querySelector(".options-list");
    choiceSelection.addEventListener("click", function () {
        userGuess = event.target.getAttribute("value");

        //Lets the user know whether they were right or wrong
        var answerFeedback = document.createElement("div");
        answerFeedback.className = "row justify-content-center mt-2";
        document.querySelector("body").appendChild(answerFeedback);
        if (userGuess == quiz.answers[questionCount - 1])
            answerFeedback.textContent = "Correct!";
        else {
            answerFeedback.textContent = "Wrong!"
            secondsLeft -= 15;
            timerEl.textContent = "Time: " + secondsLeft;
        }

        setTimeout(function () {
            answerFeedback.parentNode.removeChild(answerFeedback);
        }, 1000);

        if (questionCount > 4) {
            clearInterval(interval);
            gameOverScreen();
        }
        else
            renderNextQuestion();
    })
}

//Populates a game over screen
function gameOverScreen() {
    userScore = secondsLeft;

    //Clears container then create "Quiz Complete" header
    containerEl.innerHTML = "";
    var quizCompleteRow = document.createElement("div");
    quizCompleteRow.className = "row justify-content-center mt-5";
    var quizCompleteEl = document.createElement("h1");
    quizCompleteEl.textContent = "Quiz Complete!";
    quizCompleteRow.appendChild(quizCompleteEl);
    containerEl.appendChild(quizCompleteRow);

    //Creates an element to show the user score.
    var userScoreEl = document.createElement("div");
    userScoreEl.className = "row justify-content-center my-3";
    userScoreEl.textContent = "Your score is " + userScore + "!";
    containerEl.appendChild(userScoreEl);

    //Creates an input box for user initials and submit button to store user's score
    var userInitialsRow = document.createElement("div");
    userInitialsRow.className = "row justify-content-center mb-3";
    var userInitialsInputCol = document.createElement("div");
    userInitialsInputCol.className = "col-7 text-right pr-0";
    var userInitialsSubmitCol = document.createElement("div");
    userInitialsSubmitCol.className = "col-5";
    var userInitialsInput = document.createElement("input");
    userInitialsInput.setAttribute("type", "text");
    userInitialsInput.setAttribute("placeholder", "Enter your initials.");
    var userInitialsSubmit = document.createElement("button");
    userInitialsSubmit.setAttribute("type", "submit");
    userInitialsSubmit.className = "btn btn-primary initials-submit-btn";
    userInitialsSubmit.textContent = "Submit"
    userInitialsInputCol.appendChild(userInitialsInput);
    userInitialsSubmitCol.appendChild(userInitialsSubmit);
    userInitialsRow.appendChild(userInitialsInputCol);
    userInitialsRow.appendChild(userInitialsSubmitCol);
    containerEl.appendChild(userInitialsRow);

    //Adds on click event for submit button to store user score and create high scores page.
    userInitialsSubmit.addEventListener("click", function () {
        var initialsInput = userInitialsInput.value;
        highScores.initials.push(initialsInput);
        highScores.scores.push(userScore);
        sortScores();
        localStorage.setItem("highScores", JSON.stringify(highScores));
        highScorePage();
    })
}

//Populates a high score page
function highScorePage() {
    containerEl.innerHTML = "";
    highScoreButton.style.display = "none";
    timerEl.style.display = "none";

    //Creates a header for the high score page
    var hsHeaderDiv = document.createElement("div");
    hsHeaderDiv.className = "row justify-content-center mt-5";
    var hsHeader = document.createElement("h2");
    hsHeader.textContent = "High Scores"
    hsHeaderDiv.appendChild(hsHeader);
    containerEl.appendChild(hsHeaderDiv);

    //Populates the list of high scores
    var hsListEl = document.createElement("ul");
    hsListEl.className = "list-group col-6 mx-auto mt-3 p-0 hs-list";
    for (var i = 0; i < highScores.scores.length; i++) {
        var hsLi = document.createElement("li");
        hsLi.className = "list-group-item high-scores";
        hsLi.textContent = (i + 1) + ". " + highScores.initials[i] + " - " + highScores.scores[i];
        hsListEl.appendChild(hsLi);
    }
    containerEl.appendChild(hsListEl);

    //Creates buttons to clear scores and go back to home page
    var hsButtonsRow = document.createElement("div");
    hsButtonsRow.className = "row mt-2";
    var goBackButtonCol = document.createElement("div");
    goBackButtonCol.className = "col-3 ml-auto text-right";
    var clearHsButtonCol = document.createElement("div");
    clearHsButtonCol.className = "col-3 mr-auto ";
    var goBackButton = document.createElement("button");
    goBackButton.setAttribute("type", "submit");
    goBackButton.className = "btn btn-primary go-back-btn";
    goBackButton.textContent = "Go Back";
    var clearHsButton = document.createElement("button");
    clearHsButton.setAttribute("type", "submit");
    clearHsButton.className = "btn btn-primary clear-hs-btn";
    clearHsButton.textContent = "Clear Scores";
    goBackButtonCol.appendChild(goBackButton);
    clearHsButtonCol.appendChild(clearHsButton);
    hsButtonsRow.appendChild(goBackButtonCol);
    hsButtonsRow.appendChild(clearHsButtonCol);
    containerEl.appendChild(hsButtonsRow);

    //Reloads the web page to its starting elements
    goBackButton.addEventListener("click", function () {
        location.reload();
    });

    //Clears local storage and resets highScores variable
    clearHsButton.addEventListener("click", function () {
        highScores.scores = [];
        highScores.initials = [];
        localStorage.clear();
        hsListEl.innerHTML = "";
    });
}

//Sorts the highScores object from highest to lowest scores
function sortScores() {
    var scoresArray = highScores.scores;
    for (var i = 0; i < scoresArray.length - 1; i++) {
        for (var j = i + 1; j < scoresArray.length; j++) {
            if (scoresArray[i] < scoresArray[j]) {
                var scoreTemp = highScores.scores[i];
                highScores.scores[i] = highScores.scores[j];
                highScores.scores[j] = scoreTemp;

                var initialsTemp = highScores.initials[i];
                highScores.initials[i] = highScores.initials[j];
                highScores.initials[j] = initialsTemp;
            }
        }
    }
}

highScoreButton.addEventListener("click", highScorePage);

startQuizButton.addEventListener("click", function () {
    timerEl.textContent = "Time: " + secondsLeft;

    interval = setInterval(function () {
        secondsLeft--;
        timerEl.textContent = "Time: " + secondsLeft;

        if (secondsLeft === 0) {
            clearInterval(interval);
            gameOverScreen();
        }
    }, 1000);

    renderNextQuestion();
})