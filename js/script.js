let startBtn = document.getElementById("start");
let titleEl = document.getElementById("title");
let scoreBtn = document.getElementById("highScore");
let descriptionEl = document.getElementById("description");
let answerListItems = document.getElementsByClassName("answer-list-item");
let feedbackEl = document.getElementById("feedback");


let quizQuestions = [
  {
    "question": "Commonly used data type DO not Include:",
    "answers": ["String", "Boolean", "Alerts", "Numbers"],
    "correctAnswer": "Alerts"
  },
  {
    "question": "The condition in an if / else statement is enclosed with___________.",
    "answers": ["quotes", "curly brackets", "parenthesis", "squre brackets"],
    "correctAnswer": "parenthesis"
  },
  {
    "question": "A very useful tool used during devlopment and debugging for printing content to the debugger is:",
    "answers": ["Javascript", "terminal/bash", "for loops", "console.log"],
    "correctAnswer": "console.log"
  },
  {
    "question": "Array in Javascript can be used to store__________.",
    "answers": ["numbers and strings", "other arrays", "booleans", "all of the above"],
    "correctAnswer": "all of the above"
  },
  {
    "question": "String values must be enclosed within _________ when being assigned to variables.",
    "answers": ["commas", "curly brackets", "quotes", "parenthesis"],
    "correctAnswer": "parenthesis"
  },
];

let timerEl = document.getElementById("countdown");
let timeInterval;
let timeLeft = 0;
let currentQuestionIndex = 0;
timeLeft < 0 == 0;

function countdown() {
  timeLeft = 100;
  timerEl.textContent = "Time: " + timeLeft ;

  timeInterval = setInterval(function() {
    timerEl.textContent = "Time: " + timeLeft ;
    timeLeft--;
    if (timeLeft <= 0 || currentQuestionIndex == quizQuestions.length) {
      clearInterval(timeInterval);
    } 
  }, 1000);
};
 
let loadQuestions = function(questionIndex) {
  currentQuestionIndex = questionIndex;
  let questionJson = quizQuestions[currentQuestionIndex];
  let answers = questionJson["answers"];
  let question = questionJson["question"];
  titleEl.textContent = question;
  
  for (let i = 0 ; i < answerListItems.length; i++) {
    answerListItems[i].textContent = answers[i];
    answerListItems[i].classList.remove("display-none");
  }
};

let setEventListeners = function() {
  for (let i = 0 ; i < answerListItems.length; i++) {
    // add eventlistner
    answerListItems[i].addEventListener("click", function(event){
      let currentListItem = event.currentTarget;
      let answersText = currentListItem.textContent;
      let questionJson = quizQuestions[currentQuestionIndex];
      if (answersText == questionJson["correctAnswer"]) {
        feedbackEl.textContent = "Correct!";
      } else {
        timeLeft -= 10;
        if (timeLeft < 0){
          timeLeft = 0;
        }
        feedbackEl.textContent = "Wrong!";
      }
      loadQuestions(currentQuestionIndex++);
    });
  }
}

startBtn.addEventListener("click", function(event) {
  event.preventDefault();
  descriptionEl.textContent = "";
  titleEl.textContent = "Commonly used data type DO not Include:"
  startBtn.classList.add("display-none"); 

  setEventListeners();
  loadQuestions(0);
});

startBtn.onclick = countdown;