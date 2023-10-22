import { Button }         from "../Buttons/Button.js";
import { createElement }  from "../Utils/Utility.js";

class ModalWindow extends HTMLElement {
  constructor(acceptEventName, declineEventName) {
    super();
    this.classList.add('modal-window');

    this.modalTitle       = createElement('h2', { class: 'modal-window-title' });
    this.message          = createElement('p',  { class: 'modal-window-message' });
    this.declinedButton   = new Button('Decline', 'modal-decline-bttn'); 
    this.acceptedButton   = new Button('Accept',  'modal-accept-bttn');

    this.setAcceptEventName(acceptEventName);
    this.setDeclineEventName(declineEventName);
  }

  setModalTitle(title) {
    this.modalTitle.textContent = title;
  }

  setMessage(message) {
    this.message.textContent = message;
  }

  setAcceptEventName(acceptEventName) {
    this.acceptEventName = acceptEventName;
  }

  setDeclineEventName(declineEventName) {
    this.declineEventName = declineEventName;
  }

  connectedCallback() {
    this.render();
    this.__setCallbacks();
  }

  disconnectedCallback() {
    this.__unSetCallbacks();
  }

  __acceptedCallback() {
    this.parentElement.dispatchEvent(new CustomEvent(this.acceptEventName));
  }

  __declinedCallback() {
    this.parentElement.dispatchEvent(new CustomEvent(this.declineEventName));
  }

  __setCallbacks() {
    this.acceptedButton.addEventListener('click', () => { this.__acceptedCallback(); });
    this.declinedButton.addEventListener('click', () => { this.__declinedCallback(); });
  }

  __unSetCallbacks() {
    this.acceptedButton.addEventListener('click',  null);
    this.declinedButton.addEventListener('click',  null);
  }

  render() {
    this.appendChild(this.modalTitle);
    this.appendChild(this.message);
    this.appendChild(this.declinedButton);
    this.appendChild(this.acceptedButton);

    let style = createElement('style');
    style.innerText = `@import "./style/ModalWindow.css"`;
    this.appendChild(style);
  }
}

customElements.define('x-modal-window', ModalWindow);

export { ModalWindow };