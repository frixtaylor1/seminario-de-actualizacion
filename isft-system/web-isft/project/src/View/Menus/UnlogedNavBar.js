class UnlogedNavBar extends HTMLElement {
    constructor() {
      super();
      this.classList.add('navbar');
      this.list = document.createElement('ul');
      this.itemHome = document.createElement('li'); 
      this.homeButton = document.createElement('a');
      this.homeButton.innerText = 'Home';
      this.homeButton.href = '/home';
  
      this.itemLogin = document.createElement('li'); 
      this.loginButton = document.createElement('a');
      this.loginButton.innerText = 'Login';
      this.loginButton.href = '/login'
  
      this.itemRegister = document.createElement('li'); 
      this.registerButton = document.createElement('a');
      this.registerButton.innerText = 'Register';
      this.registerButton.href = '/register'

      this.itemHome.appendChild(this.homeButton);
      this.itemLogin.appendChild(this.loginButton);
      this.itemRegister.appendChild(this.registerButton);

      this.list.appendChild(this.itemHome);
      this.list.appendChild(this.itemLogin);
      this.list.appendChild(this.itemRegister);

      this.appendChild(this.list);
      
      let style = document.createElement('style');
      style.innerText = `@import './style/UnlogedNavBar.css';
                         @import './style/NavBarItem.css';`;
      this.appendChild(style);
    }
  }
  
  customElements.define('x-navbar', UnlogedNavBar);

export { UnlogedNavBar };