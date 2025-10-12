import potatoImage from "./potatoImage.png";
import "./style.css";

//important variables used throughout the code
let counter: number = 0;
let status = 0;
let lastTime = 0;
//let lastIncrement = 0;
//const intervalSpeed = 1000; //1000 milliseconds = 1 second
let counterIncreaseAmount = 0;
let counterGrowthRate = 0;
//let clickGrowthRate = 1;
//cost things
const firstUpgradeCost = 10;
const secondUpgradeCost = 100;
const thirdUpgradeCost = 1000;

document.body.innerHTML = `
  <p> Total Potatos: <span id="counter">0</span></p>
  <p> Per Second: <span id ="status">${status}/s</span></p>
  <button id="button"> <img src="${potatoImage}"</button>
  <button id="button2">Garden Pot cost: ${firstUpgradeCost}</button>
  <button id="button3">Potato Patch cost: ${secondUpgradeCost}</button>
  <button id="button4">A sorta working tractor cost: ${thirdUpgradeCost}</button>
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
  status = counterGrowthRate;
  statusElement.textContent = `${status.toFixed(2)}/s`;

  incrementCounter(counterIncreaseAmount);
  /*lastIncrement += deltaTime;
  if (lastIncrement >= intervalSpeed) {
    incrementCounter();
    lastIncrement -= intervalSpeed;
  }*/
  requestAnimationFrame(getAnimationInterval);
}

const button = document.getElementById("button")!;
const pot = document.getElementById("button2")!;
const patch = document.getElementById("button3")!;
const tractor = document.getElementById("button4")!;
//const button4 = document.getElementById("button4")!;
const counterElement = document.getElementById("counter")!;
const statusElement = document.getElementById("status")!;

//comment
button.addEventListener("click", () => {
  incrementCounter(1);
});

pot.addEventListener("click", () => {
  if (counter >= firstUpgradeCost) {
    counterGrowthRate += 0.1;
    counter -= firstUpgradeCost;
    //firstUpgradeCost *= 1.15;
    pot.textContent = `Garden Pot cost: ${firstUpgradeCost.toFixed(2)}`;
  }
});
patch.addEventListener("click", () => {
  if (counter >= secondUpgradeCost) {
    counterGrowthRate += 2;
    counter -= secondUpgradeCost;
    //secondUpgradeCost *= 1.15;
    patch.textContent = `Potato Patch cost: ${secondUpgradeCost.toFixed(2)}`;
  }
});
tractor.addEventListener("click", () => {
  if (counter >= thirdUpgradeCost) {
    counterGrowthRate += 10;
    counter -= thirdUpgradeCost;
    //thirdUpgradeCost *= 1.15;
    tractor.textContent = `A sorta working tractor cost: ${
      thirdUpgradeCost.toFixed(2)
    }`;
  }
});

requestAnimationFrame(getAnimationInterval);
