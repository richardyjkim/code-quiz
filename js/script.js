let startBtn = document.getElementById("start");
let timerEl = document.getElementById("countdown");
let scoreBtn = document.getElementById("highScore");


function countdown() {
  var timeLeft = 100;
  var timeInterval = setInterval(function() {
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


}




startBtn.onclick = countdown;