let breakIncrease = document.getElementById("break-increment");
    let breakDecrease = document.getElementById("break-decrement");
    let sessionIncrease = document.getElementById("session-increment");
    let sessionDecrease = document.getElementById("session-decrement");
    let startStopBtn = document.getElementById("start_stop");
    let resetBtn = document.getElementById("reset");
    let breakLength = document.getElementById("break-length");
    let sessionLength = document.getElementById("session-length");
    let timeLeft = document.getElementById("time-left");


  let timer;
  let minDisplay;
  let secDisplay;
  let timerState = "start";
  let breakState = false;

  startStopBtn.addEventListener("click", ()=> {
    if(timerState === "start" || timerState === "ended"){
      timerState = "counting";
      timer = setInterval( ()=> {
        timeLeft.innerText = timeDecrement(timeLeft.innerText);
      }, 1000);
    } else if(timerState === "counting") {
      timerState = "ended";
      clearInterval(timer);
    }
  })

  function timeDecrement(timeText){
        let timeDisplay = timeText.split(":");
        minDisplay = parseInt(timeDisplay[0]);
        secDisplay = parseInt(timeDisplay[1]);
        
        if(breakState === false){
          secDisplay -= 1;

          if(secDisplay === -1){
            secDisplay = 59;
            minDisplay -= 1;
          }
          if(minDisplay === -1){
            secDisplay = -1;
          }
          if(minDisplay===0 && secDisplay===0){
            document.getElementById("beep").play();
          }
          
          if(minDisplay < 0 && secDisplay < 0){
            document.getElementById("timer-label").innerHTML = "Break Time!";
            breakState = true;
            minDisplay = breakLength.innerText;
            secDisplay = "0";
          }
        } else if (breakState === true ){
          secDisplay --;
          if(secDisplay === -1){
            secDisplay = 59;
            minDisplay -= 1;
          }
          if(minDisplay === -1){
            secDisplay = -1;
          }
          if(minDisplay===0 && secDisplay===0){
            document.getElementById("beep").play();
          }
          if(minDisplay === -1 && secDisplay === -1){
            document.getElementById("timer-label").innerHTML = "Session";
            breakState = false;
            minDisplay = sessionLength.innerText;
            secDisplay = "0";
            }
        }
        if(secDisplay <= 9){
            secDisplay = "0"+secDisplay;
          }
          if(minDisplay <= 9){
             minDisplay = "0"+minDisplay;
          }
        return minDisplay + ":" + secDisplay;
      }
  

  resetBtn.addEventListener("click", ()=> {
    if(timerState === "counting") {
      timerState = "start";
      clearInterval(timer);
    }
    timeLeft.innerText = "25:00";
    breakLength.innerText = "5";
    sessionLength.innerText = "25";
    document.getElementById("timer-label").innerHTML = "Session";
    document.getElementById("beep").load();
    document.getElementById("beep").pause();
  });

  breakIncrease.addEventListener("click", ()=> {
    if(timerState === "ended" || timerState === "start"){
      if(breakLength.innerText < 60){
      breakLength.innerText ++;
      }
    }
  })
  breakDecrease.addEventListener("click", ()=> {
    if(timerState === "ended" || timerState === "start"){
      if(breakLength.innerText > 1){
      breakLength.innerText --;
      }  
    }
  })
  sessionIncrease.addEventListener("click", ()=> {
    if(timerState === "ended" || timerState === "start"){
      if(sessionLength.innerText < 60){
      sessionLength.innerText ++;
    }
    timeLeft.innerText = sessionLength.innerText +":"+ "00";
    if(sessionLength.innerText < 10){
      timeLeft.innerText = "0" + sessionLength.innerText +":"+ "00";
    } 
    } 
  })
  sessionDecrease.addEventListener("click", ()=> {
    if(timerState === "ended" || timerState === "start"){
      if(sessionLength.innerText > 1){
      sessionLength.innerText --;
      }
      timeLeft.innerText = sessionLength.innerText +":"+ "00";
    if(sessionLength.innerText < 10){
      timeLeft.innerText = "0" + sessionLength.innerText +":"+ "00";
    }
    }
  })