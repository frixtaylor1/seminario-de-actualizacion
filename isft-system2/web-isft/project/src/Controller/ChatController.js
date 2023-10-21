import { Chat }           from "../View/Chat/Chat.js";
import { ChatModel }      from "../Model/ChatModel.js";
import { ModalWindow }    from "../View/Forms/ModalWindow.js";
import { createElement }  from "../View/Utils/Utility.js";

class ChatController {
  constructor(viewReference = new Chat(), modelReference = new ChatModel()) {
    this.viewReference        = viewReference;
    this.modelReference       = modelReference;
    this.idTargetUser         = undefined;

    this.__setCallbacks();
  }

  async __propose(targetUserId) {
    let results = await this.modelReference.propose(targetUserId);
    console.log(results.data);
  }

  async __askForProposal() {
    let results     = await this.modelReference.getProposals();
    let childNodes  = Array.from(this.viewReference.userList.children);

    results.data.proposals.forEach(proposal => {
      childNodes.forEach(userChat => {
        if (proposal) {
          if (proposal.idOriginUser === userChat.value) {
            document.dispatchEvent( new CustomEvent('new-proposal-chat'), { 
              detail: {
                idOriginUser: proposal.idOriginUser,
                idProposal  : proposal.idProposal,
              }
            }); 
          }
        }
      });      
    });
    console.log(results.data);
  }

  __settingNotificationOfProposal() {
    document.addEventListener('new-proposal-chat', (event) => {
      let childNodes = Array.from(this.viewReference.userList.children);
      childNodes.forEach(userChat => {
        if (userChat.value === event.idOriginUser) {
          userChat.style.backgroundColor = 'grey';
        }
      });
    });
  }

  __askForMessages() {
    this.modelReference.askForMessage();
  }

  __setCallbacks() {
    this.viewReference.addEventListener('accepted-modal-window-event', () => {
      this.__propose(this.idTargetUser);
    });
        
    // Configurar una tarea periódica para enviar el mensaje cada 15 segundos
    this.__askForProposal();

    setInterval(() => {
      this.__askForProposal();
    }, 15000);

    this.viewReference.addEventListener('accepted-modal-window-event', () => {
      this.__chatProposed();
    });

    document.addEventListener('chat-clicked', () => {
      this.__reloadChat();
      this.__onLoad();
    });
    
    this.__sendMessage();

    this.__settingNotificationOfProposal();
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
    this.idTargetUser        = idTargetUser;
  }

  __chatProposed() {
    this.viewReference.appendChild(this.viewReference.chatPanel);
  }

  __sendMessage() {
    this.viewReference.button.addEventListener('click', () => {
      let messageData = {
        'originId': localStorage.getItem('iduser'),
        'targetId': this.idTargetUser,
        'body'    : this.viewReference.input.value,
        'state'   : 'sendend',
      }
      this.modelReference.sendMessage(messageData);
    });
  }

  async __onLoad() {
    let userList = await this.modelReference.getUserList();
    if (userList !== undefined) {
      console.log(userList);
      userList.forEach(element => {
        let user      = createElement('li',   { class: 'user' });
        let ledState  = createElement('div',  { class: `led-state` });
        let userName  = createElement('p',    { class: 'user-name-panel'});
  
        if (element.status === 'active') {
          ledState.style.backgroundColor = 'green';
        } else {
          ledState.style.backgroundColor = 'red';
        }
  
        userName.textContent = element.nickname; 
        user.value           = element.iduser;
  
        user.addEventListener('click', () => { this.__userClicked(element.nickname, element.iduser) });
        user.appendChild(ledState);
        user.appendChild(userName);
        
        this.viewReference.userList.appendChild(user);
      });
    }
  }
}

export { ChatController };