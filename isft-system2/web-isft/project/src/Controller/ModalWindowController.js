import { ModalWindow } from "../View/Forms/ModalWindow.js";

class ModalWindowController {
  constructor(viewReference = new ModalWindow()) {
    this.viewReference    = viewReference;
  
    this.acceptCallback   = undefined;
    this.declineCallback  = undefined;
  }

  setAcceptCallback(callable) {
    this.acceptCallback = callable;
  }

  setDeclineCallback(callable) {
    this.declineCallback = callable;
  }

  enable() {
    this.__setCallbacks();
  }

  disable() {
    this.__unSetCallbacks();
  }

  __setCallbacks() {
    this.viewReference.acceptButton.addEventListener('click',   () => { this.acceptCallback(); });
    this.viewReference.declineButton.addEventListener('click',  () => { this.declineCallback(); });
  }

  __unSetCallbacks() {
    this.viewReference.acceptButton.addEventListener('click',   null);
    this.viewReference.declineButton.addEventListener('click',  null);
  }
}

export { ModalWindowController };