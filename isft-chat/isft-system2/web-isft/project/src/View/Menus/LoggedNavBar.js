import { Button } from "../Buttons/Button.js";

class LoggedNavBar extends HTMLElement {
    constructor() {
      super();      
      this.classList.add('navbar');
      this.list = document.createElement('ul');
      this.itemHome = document.createElement('li'); 

      this.homeButton = new Button('Home', 'nav-bar-button');
    }

    connectedCallback() {
      this.render();
    }

    disconnectedCallback() {
      
    }

    render() {
      this.itemHome.appendChild(this.homeButton);

      this.list.appendChild(this.itemHome);
    
      this.appendChild(this.list);
      
      let style = document.createElement('style');
      style.innerText = `@import './style/LoggedNavBar.css';
                         @import './style/NavBarItem.css';`;
      this.appendChild(style);
      }
  }
  
customElements.define('x-navbaruser', LoggedNavBar);

export { LoggedNavBar };