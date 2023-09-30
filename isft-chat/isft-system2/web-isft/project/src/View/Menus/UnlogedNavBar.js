import { Button } from "../Buttons/Button.js";

class UnlogedNavBar extends HTMLElement {
    constructor() {
      super();      
      this.classList.add('navbar');
      this.list = document.createElement('ul');
      this.itemHome = document.createElement('li'); 
      this.itemLogin = document.createElement('li'); 
      this.itemRegister = document.createElement('li'); 

      this.homeButton = new Button('Home', 'nav-bar-button');
      this.loginButton = new Button('Login', 'nav-bar-button');
      this.registerButton = new Button('Register', 'nav-bar-button');
    }

    connectedCallback() {
      this.render();
    }

    disconnectedCallback() {
      this.removeChild(this.list);
    }

    render() {
      this.itemHome.appendChild(this.homeButton);
      this.itemLogin.appendChild(this.loginButton);
      this.itemRegister.appendChild(this.registerButton);

      this.list.appendChild(this.itemHome);
      this.list.appendChild(this.itemLogin);
      this.list.appendChild(this.itemRegister);
    
      this.appendChild(this.list);
      
      let style = document.createElement('style');
      style.innerText = `@import './style/UnlogedNavBar.css';
                         @import './style/NavBarItem.css';`;
      this.appendChild(style);
      }
  }
  
customElements.define('x-navbar', UnlogedNavBar);

export { UnlogedNavBar };