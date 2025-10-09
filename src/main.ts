import potatoImage from "./potatoImage.png";
import "./style.css";

//important variables used throughout the code
let counter: number = 0;
let lastTime = 0;
//let lastIncrement = 0;
//const intervalSpeed = 1000; //1000 milliseconds = 1 second
let counterIncreaseAmount = 0;

document.body.innerHTML = `
  <p> counter: <span id="counter">0</span></p>
  <button id="button"> <img src="${potatoImage}"</button>
`;

function incrementCounter(increaseAmount: number) {
  counter += increaseAmount;
  counterElement.textContent = counter.toFixed(2);
}

function getAnimationInterval(timeStamp: number) {
  //this means timeStamp is 0 or the first frame
  if (timeStamp === 0) {
    lastTime = timeStamp;
    incrementCounter(counterIncreaseAmount);
    return;
  }
  const deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  counterIncreaseAmount = deltaTime / 1000;
  incrementCounter(counterIncreaseAmount);
  /*lastIncrement += deltaTime;
  if (lastIncrement >= intervalSpeed) {
    incrementCounter();
    lastIncrement -= intervalSpeed;
  }*/
  requestAnimationFrame(getAnimationInterval);
}

const button = document.getElementById("button")!;
const counterElement = document.getElementById("counter")!;

//comment
button.addEventListener("click", () => {
  incrementCounter(1);
});
//setInterval(incrementCounter, 1000);
requestAnimationFrame(getAnimationInterval);
