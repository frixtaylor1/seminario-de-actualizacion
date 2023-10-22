import { Chat }               from '../Chat/Chat.js';
import { SideNav }            from '../SideNav/SideNav.js';
import { UserCard }           from "../Cards/UserCard.js";
import { BaseScene }          from './BaseScene.js';
import { LoggedNavBar }       from '../Menus/LoggedNavBar.js';
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
    this.chat     = new Chat();
    this.navBar   = new LoggedNavBar();

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

    this.chat.addEventListener('declined-modal-window-event', () => { 
      this.chat.removeChild(this.chat.modalWindow);
    });
  }
  
  disabled() {
    this.userHomeController.disabled();
  }

  render() {
    this.headerContainer.appendChild(this.navBar);
    this.asideContainer.appendChild(this.sideNav);
    this.appendChild(this.headerContainer);
    this.appendChild(this.asideContainer);
    this.appendChild(this.sectionContainer);

    let style = createElement('style');
    style.innerText = `@import './style/UserHomeScene.css'`;
    this.appendChild(style);
  }
}

customElements.define('x-userhome', UserHome);

export { UserHome };


