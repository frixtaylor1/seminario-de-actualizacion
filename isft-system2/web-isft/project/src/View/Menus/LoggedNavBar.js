import { Button } from "../Buttons/Button.js";

class LoggedNavBar extends HTMLElement {
    constructor() {
      super();      
      this.classList.add('navbar');
      this.list     = document.createElement('nav-bar-ul');
      this.logout   = new Button('Logout', 'nav-bar-button');
      this.isftLogo = new Button('ISFT N° 151', 'logo');
    }

    connectedCallback() {
      this.render();
    }

    disconnectedCallback() {
      
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