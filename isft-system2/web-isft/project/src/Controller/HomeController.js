class HomeController {
  constructor(homeViewReference, homeModelReference, sessionHandlerReference) {
    this.viewReference    = homeViewReference;
    this.modelReference   = homeModelReference;
    this.sessionHandler   = sessionHandlerReference;

  }

  enabled() {
    this.__onLoadHome();
  }

  disabled() {
  }

  async __onLoadHome() {
    try{
      let tokenAndId = this.sessionHandler.getTokenAndId();
      let userData = {
        'iduser': tokenAndId.iduser,
        'path': 'getUserInfo'
      };
      let result = await this.modelReference.getUserInfo(userData);
      this.viewReference.userCard.getUserNameTitleReference().innerText = result.name;
      console.log(result);
    } catch(error) {
      console.error(error);
    }
  }
}

export { HomeController };
