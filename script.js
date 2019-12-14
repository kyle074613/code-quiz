var containerEl = document.querySelector(".container");
var highScoreButton = document.querySelector("#hi-scores");
var timerEl = document.querySelector("#timer");
var startQuizButton = document.querySelector("#start-button");



var quiz = {
    questions: ["Q1"],
    options: ["1. a,2. b,3. c,4. d"],
    answers: ["b"],

}

var questionCount = 0;
var secondsLeft = 75;


highScoreButton.addEventListener("click", function () {
    containerEl.innerHTML = "";
    highScoreButton.style.display = "none";
    timerEl.style.display = "none";

});

startQuizButton.addEventListener("click", function () {
    containerEl.innerHTML = "";
    timerEl.textContent = "Time: " + secondsLeft;

    var interval = setInterval(function () {
        secondsLeft--;
        timerEl.textContent = "Time: " + secondsLeft;

        if (secondsLeft === 0) {
            clearInterval(interval);
        }
    }, 1000);


    // var questionEl = document.createElement("div");
    // var optionsEl = document.createElement("div");
})

var questionEl = document.createElement("div");


