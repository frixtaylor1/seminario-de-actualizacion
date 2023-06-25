import { SignInForm } from './Forms/SignInForm.js';
import { SignInController } from '../Controller/SignInController.js';
import { SignInModel } from '../Model/SignInModel.js';
import { ApiController } from '../ServerModel/ApiCallController.js';

class Login extends HTMLElement {
  constructor() {
    super();   
 
    this.form = new SignInForm();
    this.signInController = new SignInController(this.form, new SignInModel(new ApiController('http://localhost:3036')));
  }

  connectedCallback() {
    this.enabled();
    this.render();
  }

  disconnectedCallback() {
    this.disabled();
  }
  
  enabled() {
    this.signInController.enable();
  }
  
  disabled() {
    this.signInController.disable()
  }

  render() {
    this.appendChild(this.form);
  }
}

customElements.define('x-login', Login);

export { Login };