class MessageLabel extends HTMLElement {
  constructor() {
    super();
    this.message = document.createElement('p');
    this.container = document.createElement('div');
  }

  setMessage(message) {
    this.message.innerText = message;
  }

  clearMessage() {
    this.message.innerText = '';
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
  }

  render() {
    this.container.appendChild(this.message);
    this.appendChild(this.container);
    let style = document.createElement('style');
    style.innerText = `@import './style/MessageLabel.css`;
    this.appendChild(style);
  }
}  
customElements.define('x-messagelabel', MessageLabel);

export { MessageLabel };