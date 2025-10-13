import potatoImage from "./potatoImage.png";
import "./style.css";

//quick change
//important variables used throughout the code
let counter: number = 0;
let status = 0;
let lastTime = 0;
let counterIncreaseAmount = 0;
let counterGrowthRate = 0;
//let clickGrowthRate = 1;
//cost things

document.body.innerHTML = `
  <p> Total Potatos: <span id="counter">0</span></p>
  <p> Per Second: <span id ="status">${status}/s</span></p>
  <button id="button"> <img src="${potatoImage}" class="potato-img"</button>
  <button id="button2">Garden Pot cost: 10</button>
  <button id="button3">Potato Patch cost: 100</button>
  <button id="button4">A sorta working tractor cost: 1000</button>
  <button id="button5">Automatic farm cost: 10000</button>
  <button id="button6">Hydoponic Farm Lab cost: 1000000</button>
`;

interface Upgrade {
  name: string;
  cost: number;
  growthRateIncrease: number;
  button: HTMLElement;
  description: string;
}

const upgrades: Upgrade[] = [
  {
    name: "Garden Pot",
    cost: 10,
    growthRateIncrease: 0.1,
    button: document.getElementById("button2")!,
    description: "A small pot you can start growing potatos out of. Equivalent to 0.1 potatos per second.",
  },
  {
    name: "Potato Patch",
    cost: 100,
    growthRateIncrease: 1,
    button: document.getElementById("button3")!,
    description: "A small patch of dirt to grow more potatos. Equivalent to 1 potato per second.",
  },
  {
    name: "A sorta working tractor",
    cost: 1000,
    growthRateIncrease: 10,
    button: document.getElementById("button4")!,
    description: "A rusty tractor to help with the heavy lifting. Equivalent to 10 potatos per second.",
  },
  {
    name: "Automatic farm",
    cost: 10000,
    growthRateIncrease: 50,
    button: document.getElementById("button5")!,
    description: "A farm that does everything by it self. Equivalent to 50 potatos per second.",
  },
  {
    name: "Hydoponic Farm Lab",
    cost: 1000000,
    growthRateIncrease: 500,
    button: document.getElementById("button6")!,
    description: "A high tech farm that grows potatos at an insane rate. Equivalent to 500 potatos per second.",
  },
];

function upgrade(upgrade: Upgrade) {
  upgrade.button.addEventListener("click", () => {
    if (counter >= upgrade.cost) {
      counterGrowthRate += upgrade.growthRateIncrease;
      counter -= upgrade.cost;
      upgrade.cost *= 1.15;
      upgrade.button.textContent = `${upgrade.name} cost: ${
        upgrade.cost.toFixed(2)
      }`;
    }
  });
}

upgrades.forEach(upgrade);
upgrades.forEach((upg) => {
  upg.button.title = upg.description;
  upgrade(upg);
});

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
  requestAnimationFrame(getAnimationInterval);
}

const button = document.getElementById("button")!;
const counterElement = document.getElementById("counter")!;
const statusElement = document.getElementById("status")!;

//comment
button.addEventListener("click", () => {
  incrementCounter(1);
});

requestAnimationFrame(getAnimationInterval);
