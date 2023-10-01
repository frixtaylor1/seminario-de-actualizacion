import { SideNav } from '../View/SideNav/SideNav.js';
import { APPLICATION_BACKGROUND_COLOR } from "../View/Utils/Utility.js";

class SideNavController {
  constructor(viewReference = new SideNav(), modelReference = null) {
    this.viewReference  = viewReference;
    this.modelReference = modelReference;
  }

  enable() {
  }

  disable() {
  }
}

export { SideNavController };