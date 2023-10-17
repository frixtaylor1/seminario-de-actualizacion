import { Button }                 from "../Buttons/Button.js";
import { ApiController }          from "../../Controller/ApiCallController.js";
import { LoggedNavBarModel }      from "../../Model/LoggedNavBarModel.js";
import { LoggedNavBarController } from "../../Controller/LoggedNavBarController.js";

class LoggedNavBar extends HTMLElement {
    constructor() {
      super();      
      this.classList.add('navbar');
      this.list     = document.createElement('nav-bar-ul');
      this.logout   = new Button('Logout', 'nav-bar-button');
      this.isftLogo = new Button('ISFT N° 151', 'logo');

      this.loggedNavBarController = new LoggedNavBarController(
        this,
        new LoggedNavBarModel(
          new ApiController('http://127.0.0.1:3036')
        )
      );
    }

    connectedCallback() {
      this.render();
      this.loggedNavBarController.enable();
    }

    disconnectedCallback() {
      this.loggedNavBarController.disable();
    }

    render() {
      this.list.appendChild(this.logout);
      this.appendChild(this.isftLogo);
      this.appendChild(this.list);
      
      let style = document.createElement('style');
      style.innerText = `@import './style/LoggedNavBar.css';`;
      this.appendChild(style);
      }
  }
  
customElements.define('x-navbaruser', LoggedNavBar);

export { LoggedNavBar };