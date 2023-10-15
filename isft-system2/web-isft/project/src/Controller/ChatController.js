import { createElement }  from "../View/Utils/Utility.js";
import { Chat }           from "../View/Chat/Chat.js";
import { ChatModel }      from "../Model/ChatModel.js";

class ChatController {
  constructor(viewReference = new Chat(), modelReference = new ChatModel()) {
    this.viewReference        = viewReference;
    this.modelReference       = modelReference;
    this.userNicknameClicked  = undefined; 

    this.__setCallbacks();
  }

  __propose() {
    this.modelReference.propose();
  }

  __askForMessages() {
    this.modelReference.askForMessage();
  }

  __setCallbacks() {
    this.__onLoad();
  }

  __userClicked(nickname) {
    this.viewReference.parentElement.dispatchEvent(
      new CustomEvent('user-chat-clicked', { detail: { 'targetNickname': nickname } })
    );
  }

  async __onLoad() {
    let userList = await this.modelReference.getUserList();
    console.log(userList.data);

    userList.data.forEach(element => {
      let user = createElement('li', { class: 'user' });
      user.textContent = element.nickname;
      user.addEventListener('click', () => { this.__userClicked(element.nickname) });
      this.viewReference.userList.appendChild(user);
    });
  }
}

export { ChatController };