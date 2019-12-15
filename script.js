var containerEl = document.querySelector(".container");
var highScoreButton = document.querySelector("#hi-scores");
var timerEl = document.querySelector("#timer");
var startQuizButton = document.querySelector("#start-button");


var quiz = {
    questions: ["Q1", "Q2", "Q3", "Q4", "Q5"],
    options: ["1. a,2. b,3. c,4. d", "1. a,2. b,3. c,4. d", "1. a,2. b,3. c,4. d", "1. a,2. b,3. c,4. d", "1. a,2. b,3. c,4. d"],
    answers: [1, 2, 1, 4, 3],

}

var interval;
var choiceSelection;
var userGuess;
var userScore = 0;
var highScores = [];
var questionCount = 0;
var secondsLeft = 75;

function renderNextQuestion() {

    //Clears container html and creates new divs to store the question and answers
    containerEl.innerHTML = "";
    var questionEl = document.createElement("div");
    var optionsEl = document.createElement("div");
    questionEl.className = "row justify-content-center mt-5";
    optionsEl.className = "row mt-4";
    containerEl.appendChild(questionEl);
    containerEl.appendChild(optionsEl);

    //Creates a header for the question and a list group for the choices
    var questionTextEl = document.createElement("h2");
    var optionsListEl = document.createElement("ul");
    optionsListEl.className = "list-group col-8 mx-auto options-list";
    questionTextEl.textContent = quiz.questions[questionCount];
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
    userInitialsSubmitCol.className = "col-5 pl-0";
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

    //Adds on click event for submit button to store user score and creat high scores page.
}

highScoreButton.addEventListener("click", function () {
    containerEl.innerHTML = "";
    highScoreButton.style.display = "none";
    timerEl.style.display = "none";

});

startQuizButton.addEventListener("click", function () {
    timerEl.textContent = "Time: " + secondsLeft;



    interval = setInterval(function () {
        secondsLeft--;
        timerEl.textContent = "Time: " + secondsLeft;

        if (secondsLeft === 0) {
            clearInterval(interval);
        }
    }, 1000);

    renderNextQuestion();
})





