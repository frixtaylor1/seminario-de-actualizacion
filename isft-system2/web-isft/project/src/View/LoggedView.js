import { ApiController } from '../ServerModel/ApiCallController.js';
import { SessionHandler } from '../Controller/SessionHandler.js';

class Logged extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.enabled();
    this.render();
  }

  disconnectedCallback() {
    this.disabled();
  }
  
  enabled() {
    this.loggedViewController.enabled();
  }
  
  disabled() {
    this.loggedViewController.disabled();
  }

  render() {
  }
}

customElements.define('x-logged', Logged);
