class UserHomeController {
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
      
      if(result.authorized === false) {
        return ;
      }

      result = result.data[0];

      this.viewReference.userCard.setNameTitle(result.name + ' ' + result.surname);
    } catch(error) {
      console.error(error);
    }
  }
}

export { UserHomeController };
