class UnlogedNavBarController {
  constructor(viewReference) {
    this.viewReference = viewReference;
  }

  __setCallbacks() {
    this.viewReference.homeButton.onclick      = () => { this.homeButtonEvent(); }; 
    this.viewReference.registerButton.onclick  = () => { this.registerButtonEvent(); };
    this.viewReference.loginButton.onclick     = () => { this.loginButtonEvent(); };
  }

  enable() {
    this.__setCallbacks();
  }

  disable() {
    this.viewReference.homeButton.onclick      = null;
    this.viewReference.registerButton.onclick  = null;
    this.viewReference.loginButton.onclick     = null;
  }

  homeButtonEvent() {
    window.dispatchEvent(new CustomEvent('home-button-navbar-event'));
  }

  registerButtonEvent() {
    window.dispatchEvent(new CustomEvent('register-button-navbar-event'));
  }

  loginButtonEvent() {
    window.dispatchEvent(new CustomEvent('login-button-navbar-event'));
  }
}

export { UnlogedNavBarController }