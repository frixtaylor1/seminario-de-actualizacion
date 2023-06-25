import { UnlogedNavBarController } from './Controller/UnlogedNavBarController.js';
import { IsftLoader } from './View/Loader/IsftLoader.js';
import { UnlogedNavBar } from './View/Menus/UnlogedNavBar.js';
import { Register } from './View/Register.js';
import { Login } from './View/Login.js';
import { Home } from './View/Home.js';


class Application extends HTMLElement {
  constructor() {
    super();
    this.viewReference;
    this.unlogedNavBar = new UnlogedNavBar();
    this.unlogedNavBarController = new UnlogedNavBarController(this.unlogedNavBar);
  }

  connectedCallback() {
    let loader = new IsftLoader();
    this.appendChild(loader);
    console.log('Loading!');

    setTimeout(() => {
      this.removeChild(loader);
      this.unlogedNavBarController.enable();
      this.appendChild(this.unlogedNavBar);
      this.setCallbacks();
    }, 2500);
  }

  setCallbacks() {
    window.addEventListener('home-button-navbar-event', () => { this.onViewChangeHome(); });
    window.addEventListener('login-button-navbar-event', () => { this.onViewChangeLogin(); });
    window.addEventListener('register-button-navbar-event', () => { this.onViewChangeRegister(); });
    window.addEventListener('register-button-signIn-event', () => { this.onViewChangeRegister(); });
  }

  onViewChangeHome() {
    if (this.viewReference) {
      this.removeChild(this.viewReference)
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
}

customElements.define('x-application', Application);

export { Application }