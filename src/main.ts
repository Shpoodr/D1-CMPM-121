import potatoImage from "./potatoImage.png";
import "./style.css";

//important variables used throughout the code
let counter: number = 0;
let lastTime = 0;
//let lastIncrement = 0;
//const intervalSpeed = 1000; //1000 milliseconds = 1 second
let counterIncreaseAmount = 0;
let counterGrowthRate = 0;
let clickGrowthRate = 1;
//cost things
let firstUpgradeCost = 10;
let clickerUpgradeCost = 100;

document.body.innerHTML = `
  <p> counter: <span id="counter">0</span></p>
  <button id="button"> <img src="${potatoImage}"</button>
  <button id="button2">Potatoe Farm cost: ${firstUpgradeCost}</button>
  <button id="button3">Upgrade Clicker cost: ${clickerUpgradeCost}</button>
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
  counterIncreaseAmount = (deltaTime / 1000) * counterGrowthRate;
  incrementCounter(counterIncreaseAmount);
  /*lastIncrement += deltaTime;
  if (lastIncrement >= intervalSpeed) {
    incrementCounter();
    lastIncrement -= intervalSpeed;
  }*/
  requestAnimationFrame(getAnimationInterval);
}

const button = document.getElementById("button")!;
const button2 = document.getElementById("button2")!;
const button3 = document.getElementById("button3")!;
const counterElement = document.getElementById("counter")!;

//comment
button.addEventListener("click", () => {
  incrementCounter(1 * clickGrowthRate);
});

button2.addEventListener("click", () => {
  if (counter >= firstUpgradeCost) {
    counterGrowthRate += 1;
    counter -= firstUpgradeCost;
    firstUpgradeCost *= 1.15;
    button2.textContent = `Potatoe Farm cost: ${firstUpgradeCost.toFixed(2)}`;
  }
});
button3.addEventListener("click", () => {
  if (counter >= clickerUpgradeCost) {
    clickGrowthRate += 1;
    counter -= clickerUpgradeCost;
    clickerUpgradeCost *= 5;
    button3.textContent = `Upgrade Clicker cost: ${
      clickerUpgradeCost.toFixed(2)
    }`;
  }
});
//setInterval(incrementCounter, 1000);
requestAnimationFrame(getAnimationInterval);
