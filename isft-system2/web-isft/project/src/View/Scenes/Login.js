import { SignInForm }       from '../Forms/SignInForm.js';
import { SignInModel }      from '../../Model/SignInModel.js';
import { ApiController }    from '../../Controller/ApiCallController.js';
import { SessionHandler }   from '../../Controller/SessionHandler.js';
import { SignInController } from '../../Controller/SignInController.js';

class Login extends HTMLElement {
  constructor() {
    super();   
    
    this.form = new SignInForm();

    this.signInController = new SignInController(
      this.form, 
      new SignInModel(
        new ApiController('http://127.0.0.1:3036')
      ), 
      new SessionHandler()
    );
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