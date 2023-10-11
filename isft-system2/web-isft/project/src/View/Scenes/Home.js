import { ModalWindow } from "../Forms/ModalWindow.js";

class Home extends HTMLElement {
  constructor() {
    super();

    this.modalWindow = new ModalWindow();

    this.modalWindow.setMessage('Hello, World!');
    this.modalWindow.setModalTitle('Modal Title');
  }

  connectedCallback() {
    this.enabled();
  }
  
  disconnectedCallback() {
    this.disabled();
  }

  enabled() {
    this.appendChild(this.modalWindow);
  
    this.addEventListener('accepted-modal-window-event', () => { this.removeChild(this.modalWindow); });
    this.addEventListener('decline-modal-window-event', () => { this.removeChild(this.modalWindow); });
  }

  disabled() {
  }
}

customElements.define('x-home', Home);

export { Home };