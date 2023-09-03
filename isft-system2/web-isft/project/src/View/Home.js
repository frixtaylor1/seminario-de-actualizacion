import { ApiController }  from '../Controller/ApiCallController.js';
import { SessionHandler } from '../Controller/SessionHandler.js';
import { HomeController } from '../Controller/HomeController.js';
import { HomeModel }      from '../Model/HomeModel.js';
import { UserCard }       from './Cards/UserCard.js';

class Home extends HTMLElement {
  constructor() {
    super();

    this.userCard = new UserCard('./style/UserCard.css');

    this.homeController = new HomeController(
      this, 
      new HomeModel(
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
    this.homeController.enabled();
  }
  
  disabled() {
    this.homeController.disabled();
  }

  render() {
    this.appendChild(this.userCard);
  }
}

customElements.define('x-home', Home);

export { Home };