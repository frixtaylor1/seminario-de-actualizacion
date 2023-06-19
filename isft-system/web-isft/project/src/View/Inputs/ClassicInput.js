class ClassicInput extends HTMLElement {
    constructor(labelName, placeholder = 'write something...', type = 'text') {
      super();
      this.classList.add('coolinput');
      this.label = document.createElement('label');
      this.label.innerText = labelName;
      this.label.htmlFor = 'input';
      this.label.classList.add('text');
      
      this.input = document.createElement('input');
      this.input.type = type;
      this.input.placeholder = placeholder;
      this.input.classList.add('input');
  
      this.appendChild(this.label);
      this.appendChild(this.input);
  
      let style = document.createElement('style');
      style.innerText = `@import './style/Input.css';`;
  
      this.appendChild(style);
    }
  }
  
  customElements.define('x-classicinput', ClassicInput);

export { ClassicInput };