import { SideNav } from '../View/SideNav/SideNav.js';

class SideNavController {
  constructor(viewReference = new SideNav(), modelReference = null) {
    this.viewReference  = viewReference;
    this.modelReference = modelReference;

    this.__setCallbacks();
  }

  __setCallbacks() {
    this.viewReference.userInfo.addEventListener('click', () => { this.__dispatchClickedEventToUserInfo(); });
    this.viewReference.userHome.addEventListener('click', () => { this.__dispatchClickedEventToUserHome(); });
  }

  __dispatchClickedEventToUserInfo() {
    this.viewReference.parentElement.dispatchEvent(new CustomEvent('user-info-clicked'));
  }

  __dispatchClickedEventToUserHome() {
    this.viewReference.parentElement.dispatchEvent(new CustomEvent('home-clicked'));
  }
}

export { SideNavController };