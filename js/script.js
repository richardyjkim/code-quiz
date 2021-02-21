let startBtn = document.getElementById("start");
let titleEl = document.getElementById("title");
let scoreBtn = document.getElementById("highScore");
let descriptionEl = document.getElementById("description");
let answerListItems = document.getElementsByClassName("answer-list-item");
let feedbackEl = document.getElementById("feedback");
let scoreEl = document.getElementById("score");
let submitBtn = document.getElementById("submit_button");
let openingSectionEl = document.getElementById("opening_section");
let quizlistSectionEl = document.getElementById("quizlist_section");
let submitSectionEl = document.getElementById("submit_section");
let scoreSectionEl = document.getElementById("score_section");
let gobackBtn = document.getElementById("goback_button");
let clearBtn = document.getElementById("clear_button");
let first = true;

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
    "correctAnswer": "quotes"
  },
];

// Time Countdown
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
      gameOver();
    } 
  }, 1000);
};

// Game Over
let score = 0;
function gameOver() {
  clearInterval(timeInterval);
  let score = timeLeft;
  quizlistSectionEl.classList.add("display-none");
  submitSectionEl.classList.remove("display-none");
  feedbackEl.classList.add("display-none");
  titleEl.textContent = "Game Over!";
  scoreEl.textContent = score;
}
 
// Question Section
let loadQuestions = function(questionIndex) {
  currentQuestionIndex = questionIndex;
  let questionJson = quizQuestions[currentQuestionIndex];
  let answers = questionJson["answers"];
  let question = questionJson["question"];
  titleEl.textContent = question;
  quizlistSectionEl.classList.remove("display-none");

  for (let i = 0 ; i < answerListItems.length; i++) {
    answerListItems[i].textContent = answers[i];
  }
};

// Question Loading loop
let setEventListeners = function() {
  currentQuestionIndex = 0;
  for (let i = 0 ; i < answerListItems.length; i++) {
    console.log("Start of Function:" + i);
    // add eventlistner
    answerListItems[i].addEventListener("click", function(event) {
      let currentListItem = event.currentTarget;
      let answersText = currentListItem.textContent;
      let questionJson = quizQuestions[currentQuestionIndex];
      if (answersText == questionJson["correctAnswer"]) {
        feedbackEl.textContent = "Correct~!";
        feedbackEl.style.color = "Green";
        feedbackEl.style.fontSize = "300%";
      } else {
        timeLeft -= 10;
        if (timeLeft < 0){
          timeLeft = 0;
        }
        feedbackEl.textContent = "Wrong!!!!";
        feedbackEl.style.color = "Red";
        feedbackEl.style.fontSize = "300%";
      }
      timerEl.textContent = "Time: " + timeLeft ;
      feedbackEl.setAttribute("class", "feedback");
      ++currentQuestionIndex;
      if (currentQuestionIndex < quizQuestions.length) {
        console.log("Load Question:" + currentQuestionIndex);
        loadQuestions(currentQuestionIndex);
      } else {
        gameOver();
      }
    });
  }
}


// Start button
startBtn.addEventListener("click", function(event) {
  event.preventDefault();
  openingSectionEl.classList.add("display-none"); 
  if (first) {
    setEventListeners();
  }
  loadQuestions(0);
  first = false;
});

startBtn.onclick = countdown;


// Submit button
submitBtn.addEventListener("click", function(event) {
  event.preventDefault();

  scoreSectionEl.classList.remove("display-none");
  submitSectionEl.classList.add("display-none");
  titleEl.textContent = "High scores!";
  feedbackEl.classList.add("display-none");
  saveScore();
});

// save scores
function saveScore() {
  let initial = document.getElementById("initial").value;
  let finalScore = timeLeft.toString();
  let highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  let newScore = {
    scoreKey: finalScore,
    name: initial
  };

  highscores.push(newScore);
  highscores.sort(function(a, b) {
    return b.scoreKey - a.scoreKey;
  });
  localStorage.setItem("highscores", JSON.stringify(highscores));
  
  highscores.forEach(function(newScore) {
    let liEl = document.createElement("li");
    liEl.textContent = newScore.name + " - " + newScore.scoreKey;

    let olEl = document.getElementById("score_list");
    olEl.appendChild(liEl);
  });
};

function goBack () {
  scoreSectionEl.classList.add("display-none");
  openingSectionEl.classList.remove("display-none");
  titleEl.textContent = "Coding Quiz Challenge";
  feedbackEl.classList.add("display-none");
  timerEl.textContent = "Time:"
};
gobackBtn.onclick = goBack;