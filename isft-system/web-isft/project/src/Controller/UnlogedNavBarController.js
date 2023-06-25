class UnlogedNavBarController {
  constructor(navBarReference) {
    this.navBar = navBarReference;
  }

  __setCallbacks() {
    this.navBar.homeButton.onclick = () => { this.homeButtonEvent(); }; 
    this.navBar.registerButton.onclick = () => { this.registerButtonEvent(); };
    this.navBar.loginButton.onclick = () => { this.loginButtonEvent(); };
  }

  enable() {
    this.__setCallbacks();
  }

  disable() {
    this.navBar.homeButton.onclick = null;
    this.navBar.registerButton.onclick = null;
    this.navBar.loginButton.onclick = null;
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