import { IsftLoader } from "./Loader/IsftLoader.js";


window.onload = () => {
  let isftLoader = new IsftLoader('/home');
  document.body.appendChild(isftLoader);
  document.body.style = `background: #e8e8e8;`;
}