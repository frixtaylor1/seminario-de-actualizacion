import { ClassicInput } from "./ClassicInput.js";



class LoginForm extends HTMLElement {
  constructor() {
    super();
    this.classList.add('form-box');

    this.containerForm = document.createElement('div');

    this.usernameInput = new ClassicInput('Username', 'write your username...', 'text');
    this.passwordInput = new ClassicInput('Password', 'write your password...', 'password');
    this.containerForm.appendChild(this.usernameInput);
    this.containerForm.appendChild(this.passwordInput);

    this.button = document.createElement('button');
    this.button.innerText = 'Submit';
    this.button.classList.add('submit-button');
    this.containerForm.appendChild(this.button);

    this.appendChild(this.containerForm);

    let style = document.createElement('style');
    style.innerText = `@import './style/form.css'`;
    this.appendChild(style);
  }
}

customElements.define('x-loginform', LoginForm);