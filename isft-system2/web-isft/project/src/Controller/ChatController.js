import { createElement }  from "../View/Utils/Utility.js";
import { Chat }           from "../View/Chat/Chat.js";
import { ChatModel }      from "../Model/ChatModel.js";

class ChatController {
  constructor(viewReference = new Chat(), modelReference = new ChatModel()) {
    this.viewReference        = viewReference;
    this.modelReference       = modelReference;
    this.idTargetUser         = undefined;
    this.clickedUserNickname  = undefined;

    this.__setCallbacks();
  }

  __propose(targetUserId) {
    let results = this.modelReference.propose(targetUserId);
    console.log(results);
  }

  __askForProposal() {
    this.modelReference.askForProposal();
  }

  __askForMessages() {
    this.modelReference.askForMessage();
  }

  __setCallbacks() {
    this.__onLoad();
    this.viewReference.addEventListener('accepted-modal-window-event', () => {
      this.__propose(this.idTargetUser);
    });
    document.addEventListener('click', () => { 
      this.__askForProposal(); 
    });
  }

  __userClicked(nickname, idTargetUser) {
    this.viewReference.parentElement.dispatchEvent(
      new CustomEvent('user-chat-clicked', { 
        detail: { 
          'targetNickname'  : nickname, 
          'idTargetUser'    : idTargetUser,
        } 
      })
    );
    this.viewReference.modalWindow.setMessage(`Propose a chat with ${nickname}`);
    this.clickedUserNickname = nickname;
    this.idTargetUser        = idTargetUser;
  }

  async __onLoad() {
    let userList = await this.modelReference.getUserList();
    userList.data.forEach(element => {
      let user = createElement('li', { class: 'user' });
      user.textContent = element.nickname;
      user.addEventListener('click', () => { this.__userClicked(element.nickname, element.iduser) });
      this.viewReference.userList.appendChild(user);
    });
  }
}

export { ChatController };