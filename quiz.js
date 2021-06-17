// Select all Element
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const qImg = document.getElementById("qImage");
const question = document.getElementById("questions");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const progress = document.getElementById("progress");
const scoreContainer = document.getElementById("scoreContainer");

// Create questions

let questions = [
  {
    question: "What does HTML stand for ?",
    imgSrc: "img/html.png",
    choiceA: "A. Hyper Text Markup Language",
    choiceB: "B. Hyperlink and Text Markup Language",
    choiceC: " C. Home Tool Markup Language",
    correct: "A",
  },
  {
    question: "What does CSS stand for ?",
    imgSrc: "img/css.png",
    choiceA: "A. Calculate show score",
    choiceB: "B. Cascading Style Sheets",
    choiceC: "C. Constant snow share",
    correct: "B",
  },
  {
    question: "What does JS stand for ?",
    imgSrc: "img/js.png",
    choiceA: "A. Jason",
    choiceB: "B. Job security",
    choiceC: "C. Javascript",
    correct: "C",
  },
];

// Question render

let lastQuestionIndex = questions.length - 1;
let runningQuestionIndex = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let score = 0;
let TIMER;

function renderQuestion() {
  let q = questions[runningQuestionIndex];
  qImg.innerHTML = `<img src="${q.imgSrc}">`;
  question.innerHTML = "<p>" + q.question + "</p>";
  choiceA.innerHTML = q.choiceA;
  choiceB.innerHTML = q.choiceB;
  choiceC.innerHTML = q.choiceC;
}
start.addEventListener("click", startQuiz);
// Start quiz
function startQuiz() {
  start.style.display = "none";
  renderQuestion();
  quiz.style.display = "block";
  renderProgress();
  renderCounter();
  TIMER = setInterval(renderCounter, 1000);
}

//  Render Progress

function renderProgress() {
  for (let qIndex = 0; qIndex <= lastQuestionIndex; qIndex++) {
    progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
  }
}
// Render counter

function renderCounter() {
  if (count <= questionTime) {
    counter.innerHTML = count;
    timeGauge.style.width = count * gaugeUnit + "px";
    // timeGauge.style.backgroundColor = "green"
    count++;
  } else {
    count = 0;
    // change progresss color to red
    answerIsWrong();
    if (runningQuestionIndex < lastQuestionIndex) {
      runningQuestionIndex++;
      renderQuestion();
    } else {
      // end the quiz show the score
      clearInterval(TIMER);
      scoreRender();
    }
  }
}
// check answer
function checkAnswer(answer) {
  if (answer == questions[runningQuestionIndex].correct) {
    // answer is correct
    score++;
    // change progress color to green
    answerIsCorrect();
  } else {
    // answer is wrong
    // change progress color to red
    answerIsWrong();
  }
  count = 0;
  if (runningQuestionIndex < lastQuestionIndex) {
    runningQuestionIndex++;
    renderQuestion();
  } else {
    // end the quiz and show the score
    clearInterval(TIMER);
    scoreRender();
  }
}
// Answer is correct

function answerIsCorrect() {
  document.getElementById(runningQuestionIndex).style.backgroundColor = "#0f0";
}
// Answer is wrong

function answerIsWrong() {
  document.getElementById(runningQuestionIndex).style.backgroundColor = "#f00";
}
// Render score
function scoreRender() {
  scoreContainer.style.display = "block";
  // calculate the amout of question percent answered by the user
  const scorePercent = Math.round((100 * score) / questions.length);
  // choose the image based on the scorePercent
  let img =
    scorePercent >= 80
      ? "img/5.png"
      : scorePercent >= 60
      ? "img/4.png"
      : scorePercent >= 40
      ? "img/3.png"
      : scorePercent >= 20
      ? "img/2.png"
      : "img/1.png";

  scoreContainer.innerHTML = `<img src="${img}">`;
  scoreContainer.innerHTML += `<p>${scorePercent}%</p>`;
}
