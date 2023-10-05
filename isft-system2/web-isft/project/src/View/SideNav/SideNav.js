import { Button }         from "../Buttons/Button.js";
import { createElement }  from "../Utils/Utility.js";

class SideNav extends HTMLElement {
  constructor() {
    super();
    this.classList.add('sidenav');

    this.sideNavTitle             = createElement('h2', { class: 'sidenav-title' });
    this.sideNavTitle.textContent = '< I.S.F.T. 151 >';
    this.userHome                 = new Button('Home',      'sidenav-bttn', './style/SideNav.css');
    this.userInfo                 = new Button('User info', 'sidenav-bttn', './style/SideNav.css');
  }
  
  connectedCallback() {
    this.render();
  }

  disconnecetedCallback() {
  }

  render() {
    this.appendChild(this.sideNavTitle);
    this.appendChild(this.userHome);
    this.appendChild(this.userInfo);
  }
};
customElements.define('x-side-nav', SideNav);

export { SideNav };