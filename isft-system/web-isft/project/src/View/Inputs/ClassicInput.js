class Label extends HTMLElement {
  constructor(text, required, cssPath) {
    super();
    this.label = document.createElement('label');
    this.cssPath = cssPath;
    this.label.innerText = text;
    this.htmlFor = 'input';
    this.label.classList.add('text');
  }
  connectedCallback() {
    this.render();
  }

  render() {
    this.appendChild(this.label);
    let style = document.createElement('style');
    style.innerHTML = `@import '${this.cssPath}'`;
    this.appendChild(style);
  }
}
customElements.define('x-label', Label);

class Input extends HTMLElement {
  constructor(type, className, required, placeholder, cssPath) {
    super();
    this.input = document.createElement('input');
    this.input.type = type;
    this.input.classList.add(className);
    this.input.required = required;
    this.input.placeholder = placeholder;
    this.cssPath = cssPath;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.appendChild(this.input);
    let style = document.createElement('style');
    style.innerText = `@import '${this.cssPath}'`; 
    this.appendChild(style);
  }
}
customElements.define('x-input', Input);

class ClassicInput extends HTMLElement {
  constructor(labelName, required, placeholder = 'write something...', type = 'text') {
    super();
    this.classList.add('coolinput');
    this.label = new Label(labelName, true, './style/Label.css');
    this.input = new Input(type, 'input', required, placeholder, './style/Input.css');
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.appendChild(this.label);
    this.appendChild(this.input);

    let style = document.createElement('style');
    style.innerText = `@import './style/Input.css';`;

    this.appendChild(style);
  }

  getInputValue() {
    return this.input.input.value;
  }
}

customElements.define('x-classicinput', ClassicInput);

export { ClassicInput };