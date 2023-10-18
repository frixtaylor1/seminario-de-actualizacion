import { createElement } from "../View/Utils/Utility.js";
import { Chat } from "../View/Chat/Chat.js";
import { ChatModel } from "../Model/ChatModel.js";
import { ModalWindow } from "../View/Forms/ModalWindow.js";

class ChatController {
  constructor(viewReference = new Chat(), modelReference = new ChatModel()) {
    this.viewReference = viewReference;
    this.modelReference = modelReference;
    this.idTargetUser = undefined;
    this.clickedUserNickname = undefined;

    this.__setCallbacks();
  }

  async __propose(targetUserId) {
    let results = await this.modelReference.propose(targetUserId);
    console.log(results);
  }

  async __askForProposal() {
    let results = await this.modelReference.getProposals();
    console.log(results);
  }

  __askForMessages() {
    this.modelReference.askForMessage();
  }

  __setCallbacks() {
    this.__onLoad();
    this.viewReference.addEventListener('accepted-modal-window-event', () => {
      this.__propose(this.idTargetUser);
    });
    this.viewReference.chatPanel.addEventListener('click', () => {
      this.__askForProposal();
    });
    document.addEventListener('chat-clicked', () => {
      this.__reloadChat();
      this.__onLoad();
    });
  }
  __reloadChat() {
    let childNodes = Array.from(this.viewReference.userList.children);
    childNodes.forEach(element => {
      this.viewReference.userList.removeChild(element);
    });
  }
  
  __userClicked(nickname, idTargetUser) {
    this.viewReference.modalWindow = new ModalWindow();
    this.viewReference.dispatchEvent(
      new CustomEvent('user-chat-clicked', {
        detail: {
          'targetNickname': nickname,
          'idTargetUser': idTargetUser,
        }
      })
    );
    this.viewReference.modalWindow.setModalTitle('Propose a chat!');
    this.viewReference.modalWindow.setMessage(`Do you want to propose a chat with ${nickname}?`);
    this.clickedUserNickname = nickname;
    this.idTargetUser = idTargetUser;
  }

  async __onLoad() {
    let userList = await this.modelReference.getUserList();
    userList.forEach(element => {
      let user      = createElement('li',   { class: 'user' });
      let ledState  = createElement('div',  { class: `led-state ${element.nickname}` });
      let userName  = createElement('p',    { class: 'user-name-panel'});

      if (element.status === 'active') {
        ledState.style.backgroundColor = 'green';
      } else {
        ledState.style.backgroundColor = 'red';
      }

      userName.textContent = element.nickname; 

      user.addEventListener('click', () => { this.__userClicked(element.nickname, element.iduser) });
      user.appendChild(ledState);
      user.appendChild(userName);
      
      this.viewReference.userList.appendChild(user);
    });
  }
}

export { ChatController };