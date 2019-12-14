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


    var questionEl = document.createElement("div");
    var optionsEl = document.createElement("div");
    questionEl.className = "row justify-content-center mt-5";
    optionsEl.className = "row mt-4";
    containerEl.appendChild(questionEl);
    containerEl.appendChild(optionsEl);

    var questionTextEl = document.createElement("h2");
    // var optionsListEl = document.createElement("ul");
    var optionsListEl = document.createElement("div");
    optionsListEl.className = "col-8 mx-auto";
    questionTextEl.textContent = quiz.questions[questionCount];
    questionEl.appendChild(questionTextEl);
    optionsEl.appendChild(optionsListEl);

    // var optionOneEl = document.createElement("li");
    // var optionTwoEl = document.createElement("li");
    // var optionThreeEl = document.createElement("li");
    // var optionFourEl = document.createElement("li");

    var optionOneEl = document.createElement("button");
    var optionTwoEl = document.createElement("button");
    var optionThreeEl = document.createElement("button");
    var optionFourEl = document.createElement("button");
    optionOneEl.className = "btn btn-primary";
    optionTwoEl.className = "btn btn-primary";
    optionThreeEl.className = "btn btn-primary";
    optionFourEl.className = "btn btn-primary";
    //
    optionOneEl.textContent = quiz.options.split(",")[0];
    optionTwoEl.textContent = quiz.options.split(",")[1];
    optionThreeEl.textContent = quiz.options.split(",")[2];
    optionFourEl.textContent = quiz.options.split(",")[3];
    //
    optionsListEl.appendChild(optionOneEl);
    optionsListEl.appendChild(optionTwoEl);
    optionsListEl.appendChild(optionThreeEl);
    optionsListEl.appendChild(optionFourEl);

    //continue working on appending

})



