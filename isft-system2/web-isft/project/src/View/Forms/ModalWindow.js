import { Button } from "../Buttons/Button.js";
import { createElement } from "../Utils/Utility.js";

class ModalWindow extends HTMLElement {
  constructor() {
    super();
    this.classList.add('modal-window');

    this.modalTitle     = createElement('h2', { class: 'modal-window-title' });
    this.message        = createElement('p', { class: 'modal-window-message' });
    this.declineButton  = new Button('Decline', 'modal-decline-bttn'); 
    this.acceptButton   = new Button('Accept',  'modal-accept-bttn');
  }

  setModalTitle(title) {
    this.modalTitle.textContent = title;
  }

  setMessage(message) {
    this.message.textContent = message;
  }

  connectedCallback() {
    this.render();
    this.__setCallbacks();
  }

  disconnectedCallback() {
    this.__unSetCallbacks();
  }

  __acceptCallback() {
    this.parentElement.dispatchEvent(new CustomEvent('accepted-modal-window-event'));
  }

  __declineCallback() {
    this.parentElement.dispatchEvent(new CustomEvent('decline-modal-window-event'));
  }

  __setCallbacks() {
    this.acceptButton.addEventListener('click',   () => { this.__acceptCallback(); });
    this.declineButton.addEventListener('click',  () => { this.__declineCallback(); });
  }

  __unSetCallbacks() {
    this.acceptButton.addEventListener('click',   null);
    this.declineButton.addEventListener('click',  null);
  }

  render() {
    this.appendChild(this.modalTitle);
    this.appendChild(this.message);
    this.appendChild(this.declineButton);
    this.appendChild(this.acceptButton);

    let style = createElement('style');
    style.innerText = `@import "./style/ModalWindow.css"`;
    this.appendChild(style);
  }
}

customElements.define('x-modal-window', ModalWindow);

export { ModalWindow };