import potatoImage from "./potatoImage.png";
import "./style.css";

//important variables used throughout the code
let counter: number = 0;
let lastTime = 0;
let lastIncrement = 0;
const intervalSpeed = 1000; //1000 milliseconds = 1 second

document.body.innerHTML = `
  <p> counter: <span id="counter">0</span></p>
  <button id="button"> <img src="${potatoImage}"</button>
`;

function incrementCounter() {
  counter += 1;
  counterElement.textContent = counter.toString();
}

function getAnimationInterval(timeStamp: number) {
  //this means timeStamp is 0 or the first frame
  if (timeStamp === 0) {
    lastTime = timeStamp;
    incrementCounter();
    return;
  }
  const deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;

  lastIncrement += deltaTime;
  if (lastIncrement >= intervalSpeed) {
    incrementCounter();
    lastIncrement -= intervalSpeed;
  }
  requestAnimationFrame(getAnimationInterval);
}

const button = document.getElementById("button")!;
const counterElement = document.getElementById("counter")!;

//comment
button.addEventListener("click", incrementCounter);
//setInterval(incrementCounter, 1000);
requestAnimationFrame(getAnimationInterval);
