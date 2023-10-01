import { createElement }  from "../Utils/Utility.js";
import { UserCard }       from "../Cards/UserCard.js";
import { Button } from "../Buttons/Button.js";

class SideNav extends HTMLElement {
  constructor() {
    super();
    this.classList.add('sidenav');

    this.userCard = new UserCard('./style/UserCard.css');

    this.userHome = new Button('Home', 'sidenav-bttn', './style/SideNav.css');
    this.userInfo = new Button('User info', 'sidenav-bttn', './style/SideNav.css');
  }
  
  connectedCallback() {
    this.render();
  }

  disconnecetedCallback() {
  }

  render() {
    this.appendChild(this.userCard);
    this.appendChild(this.userHome);
    this.appendChild(this.userInfo);
  }
};
customElements.define('x-side-nav', SideNav);

export { SideNav };