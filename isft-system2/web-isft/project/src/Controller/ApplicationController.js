import { Home } from "../View/Home.js";
import { Login } from "../View/Login.js";
import { Register } from "../View/Register.js";
import { UserHome } from "../View/UserHome.js";

class ApplicationController {
  constructor(viewReference, modelReference) {
    this.viewReference  = viewReference;
    this.modelReference = modelReference;
  }

  enable() {
    this.setCallbacks();
  }

  disable() {    
    this.addEventListener('home-button-navbar-event',       null);
    this.addEventListener('login-button-navbar-event',      null);
    this.addEventListener('register-button-navbar-event',   null);
    this.addEventListener('register-button-signIn-event',   null);
    this.addEventListener('logged-event',                   null);
  } 

  setCallbacks() {
    this.addEventListener('home-button-navbar-event',       () => { this.onViewChangeHome(); });
    this.addEventListener('login-button-navbar-event',      () => { this.onViewChangeLogin(); });
    this.addEventListener('register-button-navbar-event',   () => { this.onViewChangeRegister(); });
    this.addEventListener('register-button-signIn-event',   () => { this.onViewChangeRegister(); });
    this.addEventListener('logged-event',                   () => { this.onViewChangeLoggedHome() });
  }

  onViewChangeHome() {
    if (this.viewReference) {
      this.removeChild(this.viewReference);
    }
    this.viewReference = new Home();
    this.appendChild(this.viewReference);
  }

  onViewChangeLogin() {
    if (this.viewReference) {
      this.removeChild(this.viewReference);
    }
    this.viewReference = new Login();
    this.appendChild(this.viewReference);
  }

  onViewChangeRegister() {
    if (this.viewReference) {
      this.removeChild(this.viewReference);
    }
    this.viewReference = new Register();
    this.appendChild(this.viewReference);
  }

  onViewChangeLoggedHome() {
    if (this.viewReference) {
      this.removeChild(this.viewReference);
      this.removeChild(this.unlogedNavBar);
    }
    this.viewReference = new UserHome();
    this.appendChild(this.viewReference);
  }
}

export { ApplicationController };