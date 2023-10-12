import { SideNav }            from '../SideNav/SideNav.js';
import { UserCard }           from "../Cards/UserCard.js";
import { BaseScene }          from './BaseScene.js';
import { UserHomeModel }      from '../../Model/UserHomeModel.js';
import { createElement }      from '../Utils/Utility.js';
import { ApiController }      from '../../Controller/ApiCallController.js';
import { SessionHandler }     from '../../Controller/SessionHandler.js';
import { SideNavController }  from '../../Controller/SideNavController.js';
import { UserHomeController } from '../../Controller/UserHomeController.js';

class UserHome extends BaseScene {
  constructor() {
    super();
    this.userCard = new UserCard('./style/UserCard.css');

    this.userHomeController = new UserHomeController(
      this, 
      new UserHomeModel(
        new ApiController('http://127.0.0.1:3036')
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
    this.asideContainer.appendChild(this.sideNav);

    this.appendChild(this.asideContainer);
    this.appendChild(this.sectionContainer);

    let style = createElement('style');
    style.innerText = `@import './style/UserHomeScene.css'`;
    this.appendChild(style);
  }
}

customElements.define('x-userhome', UserHome);

export { UserHome };


