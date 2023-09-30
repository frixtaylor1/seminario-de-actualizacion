import { ApiController }      from '../Controller/ApiCallController.js';
import { SessionHandler }     from '../Controller/SessionHandler.js';
import { UserHomeController } from '../Controller/UserHomeController.js';
import { UserHomeModel }      from '../Model/UserHomeModel.js';
import { UserCard }           from './Cards/UserCard.js';

class UserHome extends HTMLElement {
  constructor() {
    super();

    this.userCard = new UserCard('./style/UserCard.css');

    this.userHomeController = new UserHomeController(
      this, 
      new UserHomeModel(
        new ApiController('http://localhost:3036')
      ), 
      new SessionHandler()
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
    this.appendChild(this.userCard);
  }
}

customElements.define('x-userhome', UserHome);

export { UserHome };