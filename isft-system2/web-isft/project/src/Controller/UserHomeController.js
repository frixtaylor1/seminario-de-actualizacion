import { UserHome } from "../View/Scenes/UserHome.js";

class UserHomeController {
  constructor(homeViewReference = new UserHome(), homeModelReference, sessionHandlerReference) {
    this.viewReference    = homeViewReference;
    this.modelReference   = homeModelReference;
    this.sessionHandler   = sessionHandlerReference;
  }

  enabled() {
    this.__onLoadHome();
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

      result = result.data;

      this.viewReference.userCard.setNameTitle(result.name + ' ' + result.surname);
      this.viewReference.userCard.setGroupTitle(result.group_name);
    } catch(error) {
      console.error(error);
    }
  }
}

export { UserHomeController };
