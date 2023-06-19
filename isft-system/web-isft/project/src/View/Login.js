import { UnlogedNavBar } from './Menus/UnlogedNavBar.js';
import { LoginForm } from './Forms/LoginForm.js';
import { SignInController } from '../Controller/SignInController.js';
import { SignInModel } from '../Model/SignInModel.js';
import { ApiController } from '../ServerModel/ApiCallController.js';

class Login {
  constructor() {
    this.navBar = new UnlogedNavBar();
    this.form = new LoginForm();
    this.signInController = new SignInController(this.form, new SignInModel(new ApiController('http://localhost:3036')) );
  }
}

function startApplication() {
  let login = new Login(); 
  document.body.appendChild(login.navBar);
  document.body.appendChild(login.form);
  document.body.style = `background: #e8e8e8;`;

}

window.onload = startApplication();