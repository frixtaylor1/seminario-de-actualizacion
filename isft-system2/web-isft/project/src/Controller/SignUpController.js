import { Crypto } from "./Crypto.js";

class SignUpController {
  constructor(loginFormViewReference, SignInModelReference) {
    this.viewReference = loginFormViewReference;
    this.modelReference = SignInModelReference;

    this.viewReference.registerButton.addEventListener('click', () => { this.onRegister() });
  }

  async onRegister() {
    let hasher = new Crypto('SHA-256');
    const hashedPassword = await hasher.hash(this.viewReference.getInputPasswordValue());

    const userData = {
      'nickname'  : this.viewReference.getInputUserNameValue(),
      'password'  : hashedPassword,
      'name'      : this.viewReference.getInputNameValue(),
      'surname'   : this.viewReference.getInputSurnameValue(),
      'dni'       : this.viewReference.getInputDniValue(),
      'gender'    : this.viewReference.getInputGenderValue(),
      'telephone' : this.viewReference.getInputTelephoneValue(),
    };

    try {
      let result = await this.modelReference.signUp(userData);
      this.__callbackApiCall(null, result);
    } catch (error) {
      this.__callbackApiCall(error, null);
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

export { SignUpController };