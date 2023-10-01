import { Application } from "./Application.js";
import { APPLICATION_BACKGROUND_COLOR } from "./View/Utils/Utility.js";

function startApplication() {
  let application = new Application();
  document.body.appendChild(application);
  document.body.style = APPLICATION_BACKGROUND_COLOR;
}

window.onload = startApplication;