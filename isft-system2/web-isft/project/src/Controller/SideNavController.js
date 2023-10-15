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
    this.viewReference.chat.addEventListener('click',     () => { this.__dispatchClickedEventToChat(); });
  }

  __dispatchClickedEventToUserInfo() {
    this.viewReference.parentElement.dispatchEvent(new CustomEvent('user-info-clicked'));
  }

  __dispatchClickedEventToUserHome() {
    this.viewReference.parentElement.dispatchEvent(new CustomEvent('home-clicked'));
  }

  __dispatchClickedEventToChat() {
    this.viewReference.parentElement.dispatchEvent(new CustomEvent('chat-clicked')); 
  }
}

export { SideNavController };