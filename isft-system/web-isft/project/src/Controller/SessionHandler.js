class SessionHandler {
  constructor() {
    this.localStorage = window.localStorage;
    this.token;
  }

  storeToken(token) {
    this.token = token;
    this.localStorage.setItem('token', this.token);
  }
}

export { SessionHandler }