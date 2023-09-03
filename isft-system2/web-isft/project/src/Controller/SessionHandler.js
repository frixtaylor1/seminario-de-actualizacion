class SessionHandler {
  constructor() {
    this.localStorage = window.localStorage;
  }

  storeToken(token, iduser) {
    this.localStorage.setItem('token', token);
    this.localStorage.setItem('iduser', iduser)
  }

  getTokenAndId() {
    return { 
      'token' : this.localStorage.getItem('token'),
      'iduser': this.localStorage.getItem('iduser')
    } ;
  }
}

export { SessionHandler };