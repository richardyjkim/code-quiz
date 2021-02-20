let startBtn = document.getElementById("start");
let timerEl = document.getElementById("countdown");
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
    "answers": ["numers and strings", "other arrays", "booleans", "all of the above"],
    "correctAnswer": "all of the above"
  },
  {
    "question": "String values must be enclosed within _________ when being assigned to variables.",
    "answers": ["commas", "curly brackets", "quotes", "parenthesis"],
    "correctAnswer": "parenthesis"
  },

];

function countdown() {
  let timeLeft = 100;
  let timeInterval = setInterval(function() {
    if (timeLeft > 1) {
      
      timerEl.textContent = "Time: " + timeLeft ;
    
      timeLeft--;
    } 
  }, 1000);

};

let loadQuestions = function(index) {
  let questionJson = quizQuestions[index];
  let answers = questionJson["answers"];
  let questions = questionJson["question"];

  for (let i = 0 ; i < answerListItems.length; i++) {
    answerListItems[i].textContent = answers[i];
    answerListItems[i].classList.remove("display-none");
    titleEl.textContent = questions
    
    // add eventlistner
    answerListItems[i].addEventListener("click", function(event){
      let currentListItem = event.currentTarget;
      let answersText = currentListItem.innerText;
      if (answersText === questionJson["correctAnswer"]) {
        feedbackEl.textContent = "Correct!"
      } else {
        countdown -= 10;
        feedbackEl.textContent = "Wrong!"
      }
      loadQuestions(i);
    })
  }
};



startBtn.addEventListener("click", function(event) {
  event.preventDefault();
  descriptionEl.textContent = "";
  titleEl.textContent = "Commonly used data type DO not Include:"
  startBtn.classList.add("display-none"); 

  loadQuestions(0);
});

startBtn.onclick = countdown;