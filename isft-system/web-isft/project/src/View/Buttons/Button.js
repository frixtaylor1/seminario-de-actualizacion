class Button extends HTMLElement {
  constructor(text, htmlClass, cssPath = '') {
    super();
    this.cssPath = cssPath;
    this.classList.add(htmlClass);
    this.innerText = text;
  }

  render() {
    let style = document.createElement('style');
    style.innerText = `@import '${this.cssPath}'`;
    this.appendChild(style);
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    this.onclick = () => { null };
  }
}

customElements.define('x-button', Button);

export { Button };