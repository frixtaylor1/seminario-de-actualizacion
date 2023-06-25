import { Crypto } from "./Crypto.js";

class SignInController {
  constructor(loginFormViewReference, SignInModelReference) {
    this.viewReference = loginFormViewReference;
    this.modelReference = SignInModelReference;
  }

  enable() {
    this.viewReference.registerButton.addEventListener('click', () => { this.onRegisterButtonClick(); });
    this.viewReference.loginButton.addEventListener('click', () => { this.__onLogin(); })
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
        this.__callbackApiCall(null, result);
      } catch (error) {
        this.__callbackApiCall(error, null);
      }
    }
  }

  __callbackApiCall(error, result) {
    if (error) {
      console.error("error", error);
    } else {
      console.log(result);
    }
  }
}

export { SignInController };
