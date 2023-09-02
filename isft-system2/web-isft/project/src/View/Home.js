import { ApiController }  from '../Controller/ApiCallController.js';
import { SessionHandler } from '../Controller/SessionHandler.js';
import { HomeController } from '../Controller/HomeController.js';
import { HomeModel }      from '../Model/HomeModel.js';

class Home extends HTMLElement {
  constructor() {
    super();

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
    this.HomeController.enabled();
  }
  
  disabled() {
    this.HomeController.disabled();
  }

  render() {
  }
}

customElements.define('x-home', Home);

export { Home };