let startBtn = document.getElementById("start");
let timerEl = document.getElementById("countdown");
let titleEl = document.getElementById("title");
let scoreBtn = document.getElementById("highScore");
let descriptionEl = document.getElementById("description");

let answerListItems = document.getElementsByClassName("answer-list-item");

let quizQuestions = [
  {
    "question": "Commonly used data type DO not Include:",
    "answers": ["String", "Boolean", "alerts", "numbers"],
    "correctAnswer": "alerts"
  },
  {
    "question": "Commonly used data type DO not Include:",
    "answers": ["String", "Boolean", "alerts", "numbers"],
    "correctAnswer": "alerts"
  },
  {
    "question": "Commonly used data type DO not Include:",
    "answers": ["String", "Boolean", "alerts", "numbers"],
    "correctAnswer": "alerts"
  },
  {
    "question": "Commonly used data type DO not Include:",
    "answers": ["String", "Boolean", "alerts", "numbers"],
    "correctAnswer": "alerts"
  },
  {
    "question": "Commonly used data type DO not Include:",
    "answers": ["String", "Boolean", "alerts", "numbers"],
    "correctAnswer": "alerts"
  },

];

function countdown() {
  let timeLeft = 100;
  let timeInterval = setInterval(function() {
    if (timeLeft > 1) {
      
      timerEl.textContent = "Time: " + timeLeft ;
    
      timeLeft--;
    } else if (timeLeft === 1) {
      
      timerEl.textContent = timeLeft + ' second remaining';
      timeLeft--;
    } else {
    
      timerEl.textContent = '';
      
      clearInterval(timeInterval);
    
      displayMessage();
    }
  }, 1000);

};

let loadQuestions = function(index) {
  let questionJson = quizQuestions[index];
  let answers = questionJson["answers"];

  for (let i = 0 ; i < answerListItems.length; i++) {
    answerListItems[i].textContent = answers[i];
    answerListItems[i].classList.remove("display-none");
  }
  console.log(answerListItems);
}

startBtn.addEventListener("click", function(event) {
  event.preventDefault();
  descriptionEl.textContent = "";
  titleEl.textContent = "Commonly used data type DO not Include:"
  startBtn.classList.add("display-none"); 

  loadQuestions(0);
});

startBtn.onclick = countdown;