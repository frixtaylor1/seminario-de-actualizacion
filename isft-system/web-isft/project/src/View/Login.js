import { UnlogedNavBar } from './Menus/UnlogedNavBar.js';
import { SignInForm } from './Forms/SignInForm.js';
import { SignInController } from '../Controller/SignInController.js';
import { SignInModel } from '../Model/SignInModel.js';
import { ApiController } from '../ServerModel/ApiCallController.js';
import { IsftLoader } from './Loader/IsftLoader.js';

class Login {
  constructor() {
    this.navBar = new UnlogedNavBar();
    this.form = new SignInForm();
    this.signInController = new SignInController(this.form, new SignInModel(new ApiController('http://localhost:3036')) );
  }
}

function startApplication() {
  let login = new Login(); 
  document.body.appendChild(login.navBar);
  document.body.appendChild(login.form);
  document.body.style = ` background: #E8CBC0;  /* fallback for old browsers */
                          background: -webkit-linear-gradient(to right, #636FA4, #E8CBC0);  /* Chrome 10-25, Safari 5.1-6 */
                          background: linear-gradient(to right, #636FA4, #E8CBC0); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  `;
}

window.onload = startApplication();