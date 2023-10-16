import { UserHome } from "../View/Scenes/UserHome.js";

class UserHomeController {
  constructor(homeViewReference = new UserHome(), homeModelReference, sessionHandlerReference) {
    this.viewReference    = homeViewReference;
    this.modelReference   = homeModelReference;
    this.sessionHandler   = sessionHandlerReference;
  }

  enabled() {
    this.__onLoadHome();
    this.__setCallbacks();
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

      this.viewReference.userCard.setNameTitle(result.name + ' ' + result.surname);
      this.viewReference.userCard.setGroupTitle(result.group_name);
    } catch(error) {
      console.error(error);
    }
  }

  __setCallbacks() {
    this.viewReference.asideContainer.addEventListener('home-clicked', () => {
      this.__removeSectionChildren();
    });
    this.viewReference.asideContainer.addEventListener('user-info-clicked', () => { 
      this.__removeSectionChildren();

      this.viewReference.sectionContainer.appendChild(this.viewReference.userCard); 
    });
    this.viewReference.asideContainer.addEventListener('chat-clicked', () => {
      this.__removeSectionChildren();

      this.viewReference.sectionContainer.appendChild(this.viewReference.chat);
    });
  }

  __removeSectionChildren() {
    let childNodes = Array.from(this.viewReference.sectionContainer.children);
    childNodes.forEach(element => {
      this.viewReference.sectionContainer.removeChild(element);
    });
  }
}

export { UserHomeController };
