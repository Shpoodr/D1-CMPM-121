import potatoImage from "./download.png";
import "./style.css";

//important variables used throughout the code
let counter: number = 0;
let status = 0;
let lastTime = 0;
let counterIncreaseAmount = 0;
let counterGrowthRate = 0;

//upgrade definition
interface Upgrade {
  name: string;
  cost: number;
  growthRateIncrease: number;
  button: HTMLElement;
  description: string;
}

document.body.innerHTML = `
  <div id="main-section">
    <p> Total Potatos: <span id="counter">0</span></p>
    <p> Per Second: <span id ="status">${status}/s</span></p>
    <button id="button"> <img src="${potatoImage}" class="potato-img"</button>
  </div>
  <div id="upgrade-section">
    <button id="gardenPotBTN" class="upgrade-btn">Garden Pot cost: 10</button>
    <button id="potatoPatchBTN" class="upgrade-btn">Potato Patch cost: 100</button>
    <button id="tractorBTN" class="upgrade-btn">A sorta working tractor cost: 1000</button>
    <button id="autoFarmBTN" class="upgrade-btn">Automatic farm cost: 10000</button>
    <button id="farmLabBTN" class="upgrade-btn">Hydoponic Farm Lab cost: 1000000</button>
  </div>
`;

/* Available upgrades */
const upgrades: Upgrade[] = [
  {
    name: "Garden Pot",
    cost: 10,
    growthRateIncrease: 0.1,
    button: document.getElementById("gardenPotBTN")!,
    description:
      "A small pot you can start growing potatos out of. Equivalent to 0.1 potatos per second.",
  },
  {
    name: "Potato Patch",
    cost: 100,
    growthRateIncrease: 1,
    button: document.getElementById("potatoPatchBTN")!,
    description:
      "A small patch of dirt to grow more potatos. Equivalent to 1 potato per second.",
  },
  {
    name: "A sorta working tractor",
    cost: 1000,
    growthRateIncrease: 10,
    button: document.getElementById("tractorBTN")!,
    description:
      "A rusty tractor to help with the heavy lifting. Equivalent to 10 potatos per second.",
  },
  {
    name: "Automatic farm",
    cost: 10000,
    growthRateIncrease: 50,
    button: document.getElementById("autoFarmBTN")!,
    description:
      "A farm that does everything by it self. Equivalent to 50 potatos per second.",
  },
  {
    name: "Hydroponic Farm Lab",
    cost: 1000000,
    growthRateIncrease: 500,
    button: document.getElementById("farmLabBTN")!,
    description:
      "A high tech farm that grows potatos at an insane rate. Equivalent to 500 potatos per second.",
  },
];
/* Function upgrades and incrementing */
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

upgrades.forEach((upg) => {
  upg.button.title = upg.description;
  upgrade(upg);
});

function incrementCounter(increaseAmount: number) {
  counter += increaseAmount;
  counterElement.textContent = counter.toFixed(2);
}

/* Game State loop */
function gameLoop(timeStamp: number) {
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
  requestAnimationFrame(gameLoop);
}

//html element references
const clickerButton = document.getElementById("button")!;
const counterElement = document.getElementById("counter")!;
const statusElement = document.getElementById("status")!;
const potatoImg = document.querySelector(".potato-img") as HTMLImageElement;

clickerButton.addEventListener("click", () => {
  incrementCounter(1);
  potatoImg.classList.add("clicked");
  setTimeout(() => {
    potatoImg.classList.remove("clicked");
  }, 200);
});

requestAnimationFrame(gameLoop);
