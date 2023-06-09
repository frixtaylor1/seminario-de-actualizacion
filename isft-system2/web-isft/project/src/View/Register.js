import { SignUpForm } from './Forms/SignUpForm.js';
import { ApiController } from '../ServerModel/ApiCallController.js';
import { SignUpController } from '../Controller/SignUpController.js';
import { SignUpModel } from '../Model/SignUpModel.js';

class Register extends HTMLElement {
  constructor() {
    super();
    this.form = new SignUpForm();
    this.signUpController = new SignUpController(this.form, new SignUpModel(new ApiController('http://localhost:3036')));
  }

  connectedCallback() {
    this.render();
    this.enabled();
  }

  disconnectedCallback() {
    this.disabled();
  }
  
  enabled() {
  }
  
  disabled() {
  }

  render() {
    this.appendChild(this.form);
  }
}

customElements.define('x-register', Register);

export { Register };