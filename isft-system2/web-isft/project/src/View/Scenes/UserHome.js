import { UserCard }           from '../Cards/UserCard.js';
import { UserHomeModel }      from '../../Model/UserHomeModel.js';
import { createElement }      from '../Utils/Utility.js';
import { ApiController }      from '../../Controller/ApiCallController.js';
import { SessionHandler }     from '../../Controller/SessionHandler.js';
import { UserHomeController } from '../../Controller/UserHomeController.js';
import { SideNavController } from '../../Controller/SideNavController.js';
import { SideNav } from '../SideNav/SideNav.js';

class UserHome extends HTMLElement {
  constructor() {
    super();

    this.userHomeController = new UserHomeController(
      this, 
      new UserHomeModel(
        new ApiController('http://localhost:3036')
      ), 
      new SessionHandler()
    );

    this.sideNav = new SideNav();
    this.sideNavController = new SideNavController(
      this.sideNav,
      null
    );
  }

  connectedCallback() {
    this.enabled();
    this.render();
  }

  disconnectedCallback() {
    this.disabled();
  }
  
  enabled() {
    this.userHomeController.enabled();
  }
  
  disabled() {
    this.userHomeController.disabled();
  }

  render() {
    this.appendChild(this.sideNav);
    let style = createElement('style');
    style.innerText = `@import './style/UserHomeScene.css'`;
    this.appendChild(style);
  }
}

customElements.define('x-userhome', UserHome);

export { UserHome };