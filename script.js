let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

const display = document.getElementById("display");
const laps = document.getElementById("laps");

function timeToString(time) {
  let diffInHrs = time / 3600000;
  let hh = Math.floor(diffInHrs);

  let diffInMin = (diffInHrs - hh) * 60;
  let mm = Math.floor(diffInMin);

  let diffInSec = (diffInMin - mm) * 60;
  let ss = Math.floor(diffInSec);

  let diffInMs = (diffInSec - ss) * 100;
  let ms = Math.floor(diffInMs);

  return (
    `${hh.toString().padStart(2, '0')}:` +
    `${mm.toString().padStart(2, '0')}:` +
    `${ss.toString().padStart(2, '0')}.` +
    `${ms.toString().padStart(2, '0')}`
  );
}

function print(txt) {
  display.innerHTML = txt;
}

function startStop() {
  if (!running) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
      elapsedTime = Date.now() - startTime;
      print(timeToString(elapsedTime));
    }, 10);
    running = true;
    document.querySelector("button").textContent = "Pause";
  } else {
    clearInterval(timerInterval);
    running = false;
    document.querySelector("button").textContent = "Start";
  }
}

function reset() {
  clearInterval(timerInterval);
  print("00:00:00.00");
  elapsedTime = 0;
  running = false;
  document.querySelector("button").textContent = "Start";
  laps.innerHTML = "";
}

function recordLap() {
  if (!running) return;
  const li = document.createElement("li");
  li.textContent = timeToString(elapsedTime);
  laps.appendChild(li);
}
