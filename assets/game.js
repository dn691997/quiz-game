const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question:
      "In JavaScript, what element is used to store multiple values in a single variable?",
    choice1: "Arrays",
    choice2: "Strings",
    choice3: "Variables",
    choice4: "Functions",
    answer: 1,
  },
  {
    question:
      "What is the element called that can continue to execute a block of code as long as the specified condition remains TRUE?",
    choice1: "Debugger",
    choice2: "Clone",
    choice3: "Repeater",
    choice4: "Loop",
    answer: 4,
  },
  {
    question:
      "What is the format called that is used for storing and transporting data?",
    choice1: "Syntax",
    choice2: "JSON",
    choice3: "HTML",
    choice4: "Font",
    answer: 2,
  },
  {
    question:
      "What is the element called that forms a search pattern out of a sequence of characters?",
    choice1: "RegExp or Regular Expression",
    choice2: "Conditional Argument",
    choice3: "Event",
    choice4: "Boolean Variable",
    answer: 1,
  },
];

const SCORE_NEGATIVE = -100;
const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("/end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }

    if (classToApply === "incorrect") {
      incrementScore(SCORE_NEGATIVE);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
