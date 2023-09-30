class Home extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.enabled();
  }
  
  disconnectedCallback() {
    this.disabled();
  }

  enabled() {
  }

  disabled() {
  }
}

customElements.define('x-home', Home);

export { Home };