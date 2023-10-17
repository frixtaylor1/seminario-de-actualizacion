import { createElement }  from "../View/Utils/Utility.js";
import { Chat }           from "../View/Chat/Chat.js";
import { ChatModel }      from "../Model/ChatModel.js";
import { ModalWindow }    from "../View/Forms/ModalWindow.js";

class ChatController {
  constructor(viewReference = new Chat(), modelReference = new ChatModel()) {
    this.viewReference        = viewReference;
    this.modelReference       = modelReference;
    this.idTargetUser         = undefined;
    this.clickedUserNickname  = undefined;

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
  }

  __userClicked(nickname, idTargetUser) {
    this.viewReference.modalWindow = new ModalWindow();
    this.viewReference.parentElement.dispatchEvent(
      new CustomEvent('user-chat-clicked', { 
        detail: { 
          'targetNickname'  : nickname, 
          'idTargetUser'    : idTargetUser,
        } 
      })
    );
    this.viewReference.modalWindow.setModalTitle('Propose a chat!');
    this.viewReference.modalWindow.setMessage(`Do you want to propose a chat with ${nickname}?`);
    this.clickedUserNickname = nickname;
    this.idTargetUser        = idTargetUser;
  }

  async __onLoad() {
    let userList = await this.modelReference.getUserList();
    userList.forEach(element => {
      let container = createElement('div', { class: 'user-container' });
      let user      = createElement('li',  { class: 'user' });
      let ledState  = createElement('div', { class: `led-state ${element.nickname}` });
      
      if (element.status === 'active') {
        ledState.style.backgroundColor = 'green';
      } else {
        ledState.style.backgroundColor = 'red';
      }

      
      user.textContent = element.nickname;
      container.addEventListener('click', () => { this.__userClicked(element.nickname, element.iduser) });
      ledState.classList.add()
      container.appendChild(ledState);
      container.appendChild(user);

      this.viewReference.userList.appendChild(container);
    });
  }
}

export { ChatController };