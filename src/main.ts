import potatoImage from "./potatoImage.png";
import "./style.css";

let counter: number = 0;
document.body.innerHTML = `
  <p> counter: <span id="counter">0</span></p>
  <button id="button"> <img src="${potatoImage}"</button>
`;

function incrementCounter() {
  counter += 1;
  counterElement.textContent = counter.toString();
}


const button = document.getElementById("button")!;
const counterElement = document.getElementById("counter")!;

//comment
button.addEventListener("click", incrementCounter);
setInterval(incrementCounter, 1000);
