// Quiz Variables
var questionsIndex = 0;
var questionsRemaining = questions.length;
var timerInterval = 0;
var secondsLeft = questions.length * 15
var index = "";
var score = 0;
var finalList = {
    initialsList: [],
    scoresList: [],
}
// Quiz Variables From HTML
var bodyContent = document.getElementsByClassName("container");
var startPage = document.getElementById("start-page");
var questionPage = document.getElementById("question-pages");
var questionTitle = document.getElementById("question-title");
var finalPage = document.getElementById("score-page");
var responseLine = document.getElementById("response");
var timeRemaining = document.getElementById("time-remaining");
var highScore = document.getElementById("view-score");
var hsView = document.getElementById("highscore-view");
var hsList = document.getElementById("highscore-list");

// Button Variables
var startBtn = document.getElementById("start-button");
var buttonAnswers = document.getElementById("button-answers");
var clearButton = document.getElementById("clear-scores");
var gobackButton = document.getElementById("go-back");


init();
// Local storage functions
function init() {
    var storedList = JSON.parse(localStorage.getItem("finalList"));
    if (storedList !== null) {
        finalList = storedList;
    }
    hsView.hidden = true;
    startPage.hidden = false;
    questionPage.hidden = true;
    finalPage.hidden = true;
}
function storeScores() {
    localStorage.setItem("finalList", JSON.stringify(finalList));
}

// Setting The Timer
startBtn.addEventListener("click", setTime);
function setTime() {
    startPage.hidden = true;
    var timerInterval = setInterval(function () {
        timeRemaining.textContent = "Time: " + secondsLeft;
        secondsLeft--;
        if (secondsLeft === 0 || questionsRemaining === 0 || questionsRemaining < 0) {
            clearInterval(timerInterval);
        }
    }, 1000); startQuiz();
}

// Stopping the timer
function stopTimer() {
    secondsLeft = 0;
    clearInterval(timerInterval);
}

function startQuiz() {
    questionPage.hidden = false;
    hsList.innerHTML = "";
    questionsRemaining = questions.length;
    secondsLeft = questions.length * 15;
    questionsIndex = 0;
    checkQuestion();
}
function endQuiz() {
    stopTimer();
    renderFinalPage();
}

function checkQuestion() {
    if (questionsRemaining === 0 || questionsRemaining < 0) {
        timeRemaining.textContent = "Time: " + 0;
        endQuiz();
    } else {
        addQuestion();
    }
}
// Question Loop
function addQuestion() {
    questionTitle.innerHTML = questions[questionsIndex].title;
    for (var i = 0; i < questions[questionsIndex].choices.length; i++) {
        var div = document.createElement("div")
        var choiceButton = document.createElement("button");
        index = i
        choiceButton.setAttribute("class", "cButton", index);
        choiceButton.innerHTML = questions[questionsIndex].choices[i];
        buttonAnswers.appendChild(div);
        div.appendChild(choiceButton);
    }
}

buttonAnswers.addEventListener("click", function () {
    var userChoice = event.target;
    if (userChoice.matches("button")) {
        userChoice = event.target.id;
    }
    if (questions[questionsIndex].choices[userChoice] === questions[questionsIndex].answer) {
        score++;
        buttonAnswers.innerHTML = "";
        questionsIndex++;
        questionsRemaining--;
        checkQuestion();
    } else {
        buttonAnswers.innerHTML = "";
        secondsLeft = secondsLeft - 15;
        questionsIndex++;
        questionsRemaining--;
        checkQuestion();
    }
});
gobackButton.addEventListener("click", init);
function renderFinalPage() {
    questionPage.hidden = true;
    finalPage.hidden = false;
    var finalPageScore = document.getElementById("final-score");
    var finalPageSubmit = document.getElementById("score-submit");
    responseLine.innerHTML = "";
    finalPageScore.innerHTML = "Score: " + score + " out of 5";
    finalPageSubmit.addEventListener("click", function (event) {
        event.preventDefault();
        var initialsText = document.getElementById("input-field").value
        finalList.initialsList.push(initialsText);
        finalList.scoresList.push(score);
        storeScores();
        viewHighScore();
    })
}

highScore.addEventListener("click", viewHighScore);
function viewHighScore() {
    finalPage.hidden = true;
    hsList.innerHTML;
    for (var i = 0; i < finalList.initialsList.length; i++) {
        var initial = finalList.initialsList[i];
        var highScores = finalList.scoresList[i];
        var li = document.createElement("li");
        li.textContent = initial + ": " + highScores;
        li.setAttribute("scores-list", i);
        hsList.appendChild(li);
    }
    hsView.hidden = false;
    clearButton.addEventListener("click", function (event) {
        event.preventDefault();
        hsList.innerHTML = "";
        finalList = {
            initialsList: [],
            scoresList: [],
        }})}