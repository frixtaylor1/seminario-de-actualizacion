import { createElement }  from "../Utils/Utility.js";
import { UserCard }       from "../Cards/UserCard.js";

class SideNav extends HTMLElement {
  constructor() {
    super();
    this.classList.add('sidenav');

    this.userCard = new UserCard('./style/UserCard.css');

    this.userHome             = createElement('a', { href: '#' });
    this.userHome.textContent = 'Home';
  }
  
  connectedCallback() {
    this.render();

  }

  disconnecetedCallback() {

  }

  render() {
    this.appendChild(this.userCard);
    this.appendChild(this.userHome);
  }
};
customElements.define('x-side-nav', SideNav);

export { SideNav };