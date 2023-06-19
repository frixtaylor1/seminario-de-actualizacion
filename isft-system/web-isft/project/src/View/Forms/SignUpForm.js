import { ClassicInput } from "../Inputs/ClassicInput.js";
import { Button } from "../Buttons/Button.js";

class SignUpForm extends HTMLElement {
  constructor() {
    super();
    this.classList.add('form-box');

    this.containerForm = document.createElement('div');

    this.usernameInput = new ClassicInput('Username', 'write your username...', 'text');
    this.passwordInput = new ClassicInput('Password', 'write your password...', 'password');
    this.nameInput = new ClassicInput('Name', 'write your name...', 'text');
    this.surnameInput = new ClassicInput('Surname', 'write your surname...', 'text');
    this.dniInput = new ClassicInput('Dni', 'write your dni...', 'text');
    this.genderInput = new ClassicInput('Gender', 'write your gender...', 'text');
    this.telephoneInput = new ClassicInput('Telephone', 'write your telephone...', 'text');

    this.registerButton = new Button('register', 'bttn', './style/FormButton.css');

    this.containerForm.appendChild(this.usernameInput);
    this.containerForm.appendChild(this.passwordInput);
    this.containerForm.appendChild(this.nameInput);
    this.containerForm.appendChild(this.surnameInput);
    this.containerForm.appendChild(this.dniInput);
    this.containerForm.appendChild(this.genderInput);
    this.containerForm.appendChild(this.telephoneInput);
    this.containerForm.appendChild(this.registerButton);
  }

  getInputUserNameValue() {
    return this.usernameInput.input.value;
  }

  getInputPasswordValue() {
    return this.passwordInput.input.value;
  }

  getInputNameValue() {
    return this.nameInput.input.value;
  }

  getInputSurnameValue() {
    return this.surnameInput.input.value;
  }

  getInputDniValue() {
    return this.dniInput.input.value;
  }

  getInputGenderValue() {
    return this.genderInput.input.value;
  }

  getInputTelephoneValue() {
    return this.telephoneInput.input.value;
  }

  render() {
    this.appendChild(this.containerForm);

    let style = document.createElement('style');
    style.innerText = `@import './style/Form.css'`;
    this.appendChild(style);
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define('x-signupform', SignUpForm);

export { SignUpForm };