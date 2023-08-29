class SessionHandler {
  constructor() {
    this.localStorage = window.localStorage;
  }

  storeToken(token) {
    this.localStorage.setItem('token', token);
  }

  getToken() {
    return this.localStorage.getItem('token');
  }
}

export { SessionHandler };