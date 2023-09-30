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
    this.viewReference.addEventListener = undefined;
  } 

  setCallbacks() {
    this.viewReference.addEventListener('home-button-navbar-event',       () => { this.onViewChangeHome(); });
    this.viewReference.addEventListener('login-button-navbar-event',      () => { this.onViewChangeLogin(); });
    this.viewReference.addEventListener('register-button-navbar-event',   () => { this.onViewChangeRegister(); });
    this.viewReference.addEventListener('register-button-signIn-event',   () => { this.onViewChangeRegister(); });
    this.viewReference.addEventListener('logged-event',                   () => { this.onViewChangeLoggedHome() })
  }

  onViewChangeHome() {
    if (this.viewReference) {
      this.viewReference.removeChild(this.viewReference);
    }
    this.viewReference = new Home();
    this.viewReference.appendChild(this.viewReference);
  }

  onViewChangeLogin() {
    if (this.viewReference) {
      this.viewReference.removeChild(this.viewReference);
    }
    this.viewReference = new Login();
    this.viewReference.appendChild(this.viewReference);
  }

  onViewChangeRegister() {
    if (this.viewReference) {
      this.viewReference.removeChild(this.viewReference);
    }
    this.viewReference = new Register();
    this.viewReference.appendChild(this.viewReference);
  }

  onViewChangeLoggedHome() {
    if (this.viewReference) {
      this.viewReference.removeChild(this.viewReference);
      this.viewReference.removeChild(this.unlogedNavBar);
    }
    this.viewReference = new UserHome();
    this.viewReference.appendChild(this.viewReference);
  }
}

export { ApplicationController };