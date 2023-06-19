import { ClassicInput } from "../Inputs/ClassicInput.js";
import { Button } from "../Buttons/Button.js";

class LoginForm extends HTMLElement {
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

    this.registerButton.href = '/register'

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
    this.loginButton.onclick = (e) => this.onLoginButton(e);
    this.registerButton.onclick = (e) => this.onRegisterButton(e);
  }
  async onRegisterButton(event) {
    
  }
  async onLoginButton(event) {
  /*   let formDataObject =
    {
      'nickname':   this.usernicknameInput.value,
      'password':   this.passwordInput.value,
      'name':       this.nameInput.value,
      'surname':    this.surnameInput.value,
      'dni':        this.dniInput.value,
      'gender':     this.genderInput.value,
      'telephone':  this.telephoneInput.value,
    };

    let response = await fetch('http://localhost:3036/createUser',
      {
        method: 'POST',
        body: JSON.stringify(formDataObject)
      });

    response.json().then((r) => {
      console.log(r);
    }); */
  }
}

customElements.define('x-loginform', LoginForm);

export { LoginForm };