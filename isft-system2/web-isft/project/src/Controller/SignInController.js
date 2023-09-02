import { Crypto } from "./Crypto.js";

class SignInController {
  constructor(loginFormViewReference, signInModelReference, sessionHandler) {
    this.viewReference    = loginFormViewReference;
    this.modelReference   = signInModelReference;
    this.sessionHandler   = sessionHandler;
  }

  enable() {
    this.viewReference.registerButton.addEventListener('click', () => { this.onRegisterButtonClick(); });
    this.viewReference.loginButton.addEventListener('click',    () => { this.__onLogin(); });
    this.viewReference.addEventListener('keydown',              () => { this.__keyDownHandler(); });
  }

  disable() {
    this.viewReference.registerButton.onclick = null;
    this.viewReference.loginButton.onclick = null;
  }

  onRegisterButtonClick() {
    window.dispatchEvent(new CustomEvent('register-button-signIn-event'));
  }

  async __onLogin() {
    if(this.viewReference.getInputUserNameValue() === "" || this.viewReference.getInputPasswordValue() === "") {
    } else {
      let hasher = new Crypto('SHA-256');
      const hashedPassword = await hasher.hash(this.viewReference.getInputPasswordValue());
      
      const userData = {
        'nickname': this.viewReference.getInputUserNameValue(),
        'password': hashedPassword
      };

      try {
        const result = await this.modelReference.signIn(userData);
        this.sessionHandler.storeToken(result['token']);
        
        if(result.error != undefined && result.error != '') {
          this.viewReference.messageLabel.setMessage(result.error);
        } else {
          this.viewReference.messageLabel.setMessage('You are logged!');
          window.dispatchEvent(new CustomEvent('registered-event'));
        }
      } catch (error) {
        this.__callbackApiCallDebug(error);
      }
    }
  }

  __callbackApiCallDebug(error) {
    if (error) {
      console.error("error", error);
    }
  }

  __keyDownHandler() {
    this.viewReference.messageLabel.setMessage('');
  }
}

export { SignInController };
