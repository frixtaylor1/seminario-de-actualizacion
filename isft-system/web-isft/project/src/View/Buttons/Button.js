class Button extends HTMLElement {
  constructor(text, htmlClass, cssPath, pagePath = "") {
    super();
    this.cssPath = cssPath;
    this.classList.add(htmlClass);
    this.innerText = text;
    this.pagePath = pagePath;
    if(pagePath != "") {
      this.href = pagePath;
    }
  }

  render() {
    let style = document.createElement('style');
    style.innerText = `@import '${this.cssPath}'`;
    this.appendChild(style);
  }

  connectedCallback() {
    this.render();
    if(this.pagePath != "") {
      this.addEventListener('click', this.handleItemClick.bind(this));
    }
  }

  handleItemClick(event) {
    event.preventDefault();
    const path = this.href;
    window.location.href = path;
  }
}

customElements.define('x-button', Button);

export { Button };