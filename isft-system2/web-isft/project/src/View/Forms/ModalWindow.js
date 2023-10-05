import { Button } from "../Buttons/Button";
import { createElement } from "../Utils/Utility";

class ModalWindow extends HTMLElement {
  constructor() {
    super();

    this.modalTitle = createElement('h2', { class: 'modal-window-title' });
    this.message = createElement('p', { class: 'modal-window-message' });

    this.acceptButton   = new Button('Accept',  'modal-accept-bttn',  './style/FormButton.css');
    this.declineButton  = new Button('Decline', 'modal-decline-bttn', './style/FormButton.css'); 
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {

  }

  render() {
    this.appendChild(this.acceptButton);
    this.appendChild(this.declineButton);
  }
}

customElements.define('x-modal-window', ModalWindow);

export { ModalWindow };