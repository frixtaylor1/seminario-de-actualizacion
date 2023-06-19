class SignInController {
  constructor(loginFormViewReference, SignInModelReference) {
    this.viewReference = loginFormViewReference;
    this.modelReference = SignInModelReference;

    this.viewReference.loginButton.addEventListener( 'click', () => { this.onLogin() } );
  }

  async onLogin() {
    const password = this.viewReference.passwordInput.input.value;
    const hashedPassword = password;

    const userData = {
      'nickname': this.viewReference.usernameInput.input.value,
      'password': hashedPassword
    };

    try {
      const result = await this.modelReference.signIn(userData);
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

export { SignInController };
