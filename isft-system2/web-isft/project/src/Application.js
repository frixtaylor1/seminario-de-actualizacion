import { UnlogedNavBarController } from './Controller/UnlogedNavBarController.js';
import      { UserHomeController } from './Controller/UserHomeController.js';
import           { UserHomeModel } from './Model/UserHomeModel.js';
import           { ApiController } from './Controller/ApiCallController.js';
import           { UnlogedNavBar } from './View/Menus/UnlogedNavBar.js';
import              { IsftLoader } from './View/Loader/IsftLoader.js';
import                { UserHome } from './View/UserHome.js';
import                { Register } from './View/Register.js';
import                   { Login } from './View/Login.js';
import                    { Home } from './View/Home.js';


class Application extends HTMLElement {
  constructor() {
    super();
    this.viewReference;
    this.unlogedNavBar = new UnlogedNavBar();
    this.unlogedNavBarController = new UnlogedNavBarController(this.unlogedNavBar);
    
    this.home = new Home();
    this.userHomeController = new UserHomeController(this.home, new UserHomeModel(new ApiController()));
  }

  connectedCallback() {
    let loader = new IsftLoader();
    this.appendChild(loader);

    setTimeout(() => {
      this.removeChild(loader);
      this.unlogedNavBarController.enable();
      this.appendChild(this.unlogedNavBar);
      this.setCallbacks();
    }, 2500);
  }

  setCallbacks() {
    window.addEventListener('home-button-navbar-event',       () => { this.onViewChangeHome(); });
    window.addEventListener('login-button-navbar-event',      () => { this.onViewChangeLogin(); });
    window.addEventListener('register-button-navbar-event',   () => { this.onViewChangeRegister(); });
    window.addEventListener('register-button-signIn-event',   () => { this.onViewChangeRegister(); });
    window.addEventListener('logged-event',                   () => { this.onViewChangeLoggedHome() })
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

  onViewChangeLoggedHome() {
    if (this.viewReference) {
      this.removeChild(this.viewReference);
      this.removeChild(this.unlogedNavBar);
    }
    this.viewReference = new UserHome();
    this.appendChild(this.viewReference);
  }
}

customElements.define('x-application', Application);

export { Application }