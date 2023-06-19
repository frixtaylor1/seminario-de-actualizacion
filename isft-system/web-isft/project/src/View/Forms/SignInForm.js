import { ClassicInput } from "../Inputs/ClassicInput.js";
import { Button } from "../Buttons/Button.js";

class SignInForm extends HTMLElement {
  constructor() {
    super();
    this.classList.add('form-box');

    this.containerForm = document.createElement('div');

    this.usernameInput = new ClassicInput('Username', 'write your username...', 'text');
    this.passwordInput = new ClassicInput('Password', 'write your password...', 'password');
    this.containerForm.appendChild(this.usernameInput);
    this.containerForm.appendChild(this.passwordInput);

    this.loginButton = new Button('sign in', 'bttn', './style/FormButton.css'); 
    this.registerButton = new Button('sign up', 'bttn', './style/FormButton.css', '/register');
  }

  render() {
    this.containerForm.appendChild(this.loginButton);
    this.containerForm.appendChild(this.registerButton);

    this.appendChild(this.containerForm);
  
    let style = document.createElement('style');
    style.innerText = `@import './style/Form.css'`;
    this.appendChild(style);
  }

  connectedCallback() {
    this.render();
  }

  getInputUserNameValue() {
    return this.usernameInput.input.value;
  }

  getInputPasswordValue() {
    return this.passwordInput.input.value;
  }
}

customElements.define('x-signinform', SignInForm);

export { SignInForm };