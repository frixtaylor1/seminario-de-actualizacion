import { LoggedNavBarModel }  from "../Model/LoggedNavBarModel.js";
import { LoggedNavBar }       from "../View/Menus/LoggedNavBar.js";

class LoggedNavBarController {
  constructor(viewReference = new LoggedNavBar(), modelReference = new LoggedNavBarModel()) {
    this.viewReference  = viewReference;
    this.modelReference = modelReference;
  }

  enable() {
    this.__setCallbacks();
  }

  disable() {
    this.__unSetCallbacks();
  }

  __setCallbacks() {
    this.viewReference.logout.addEventListener('click', () => { this.__logout() });
  }

  __unSetCallbacks() {
    this.viewReference.logout.addEventListener('click', null);
  }

  async __logout() {
    let results = await this.modelReference.logout();
    console.log(results);
    location.reload();
  }
};

export { LoggedNavBarController };