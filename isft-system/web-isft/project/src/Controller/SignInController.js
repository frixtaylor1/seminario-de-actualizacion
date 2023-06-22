import { Crypto } from "./Crypto.js";

class SignInController {
  constructor(loginFormViewReference, SignInModelReference) {
    this.viewReference = loginFormViewReference;
    this.modelReference = SignInModelReference;

    this.viewReference.loginButton.addEventListener( 'click', () => { this.__onLogin() } );
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
