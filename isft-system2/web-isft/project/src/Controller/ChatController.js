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
    try {
      const results = await this.modelReference.getProposals();
      const userList = this.viewReference.userList;
      const proposals = results.data.proposals;
  
      for (const proposal of proposals) {
        const idOriginUser = proposal.idOriginUser;
  
        for (const userChat of userList.children) {
          if (idOriginUser === userChat.value) {
            const event = new CustomEvent('new-proposal-chat', {
              detail: {
                idOriginUser: idOriginUser,
                idProposal  : proposal.idProposal,
              },
            });
            document.dispatchEvent(event);
          }
        }
      }
  
      console.log(results.data);
    } catch (error) {
      console.error("Error fetching proposals:", error);
    }
  }

  __settingNotificationOfProposal() {
    document.addEventListener('new-proposal-chat', (event) => {
      console.log('IDORIGIN USER>', event.detail.idOriginUser)
      let classElement = `iduser-${event.detail.idOriginUser}`;
      let userChatLi = document.getElementsByClassName(classElement)[0];
      if (!userChatLi.classList.contains('revised')) {
        userChatLi.classList.add('notification-proposal-chat-added');
      }
    });
  }
  
  __askForMessages() {
    this.modelReference.askForMessage();
  }

  __setCallbacks() {
    this.viewReference.addEventListener('accept-send-proposal', () => {
      this.__propose(this.idTargetUser);
    });
        
    // Configurar una tarea periódica para enviar el mensaje cada 15 segundos
    this.__askForProposal();

    setInterval(() => {
      this.__askForProposal();
    }, 15000);

    this.viewReference.addEventListener('accept-send-proposal', () => {
      this.__displayChatPanel();
    });

    document.addEventListener('chat-clicked', () => {
      this.__reloadChat();
      this.__onLoad();
    });
    
    this.__sendMessage();

    this.__settingNotificationOfProposal();

    document.addEventListener('response-proposal-chat', (event) => {
      console.log('RESPONSE-PROPOSAL-CHAT', event.detail);
    })
  }
  __reloadChat() {
    let childNodes = Array.from(this.viewReference.userList.children);
    childNodes.forEach(element => {
      this.viewReference.userList.removeChild(element);
    });

    this.viewReference.addEventListener('user-chat-clicked', (event) => { 
      this.viewReference.appendChild(this.viewReference.modalWindow);
    });
    
    this.viewReference.addEventListener('accept-send-proposal', (event) => {
      this.viewReference.removeChild(this.viewReference.modalWindow);
    });

    this.viewReference.addEventListener('response-chat-proposal', (event) => {
      this.viewReference.appendChild(this.viewReference.modalWindow);
    });

    this.viewReference.addEventListener('accept-chat-proposal', (event) => {
      this.viewReference.removeChild(this.viewReference.modalWindow);
      this.__
    });
    
    this.viewReference.addEventListener('decline-chat-proposal', (event) => {
      this.viewReference.removeChild(this.viewReference.modalWindow);
    });
    
  }
  
  __userClicked(nickname, idTargetUser) {
    this.viewReference.modalWindow = new ModalWindow();

    this.clickedUserNickname = nickname;
    this.idTargetUser        = idTargetUser;

    let childNodes = Array.from(this.viewReference.userList.children);
    childNodes.forEach(element => {
      if (element.value === idTargetUser) {
        if (!element.classList.contains('revised')) {
          this.viewReference.dispatchEvent(
            new CustomEvent('user-chat-clicked', {
              detail: {
                'targetNickname': nickname,
                'idTargetUser'  : idTargetUser,
              }
            })
          );
          this.viewReference.modalWindow.setModalTitle('Propose a chat!');
          this.viewReference.modalWindow.setMessage(`Do you want to propose a chat with ${nickname}?`);
          this.viewReference.modalWindow.setAcceptEventName('accept-send-proposal');
          this.viewReference.modalWindow.setDeclineEventName('declined-modal-window-event');

        } else {
          this.viewReference.dispatchEvent(
            new CustomEvent('response-chat-proposal', {
              detail: {
                'idchat': `${localStorage.getItem('iduser')}-${idTargetUser}`,
              }
            })
          );
          this.viewReference.modalWindow.setModalTitle('Accept chat Proposal!');
          this.viewReference.modalWindow.setMessage(`Do you want to accept the chat proposal with ${nickname}?`);
          this.viewReference.modalWindow.setAcceptEventName('accept-chat-proposal');
          this.viewReference.modalWindow.setDeclineEventName('decline-chat-proposal');
        }
      } 
    });
  }

  __displayModalResponseChatProposal() {
    this.viewReference.parentElement.addEventListener('response-chat-proposal', (event) => {
      this.viewReference.parentElement.appendChild(this.viewReference.modalWindow);
    });
  }

  __displayChatPanel() {
    this.viewReference.appendChild(this.viewReference.chatPanel);
  }

  __confirmChatProposal() {
    this.modelReference.confirmChatProposal();
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
    
    userList.forEach(element => {
      let user      = createElement('li',   { class: `user iduser-${element.iduser}` });
      let ledState  = createElement('div',  { class: 'led-state' });
      let userName  = createElement('p',    { class: 'user-name-panel'});

      if (element.status === 'active') {
        ledState.style.backgroundColor = 'green';
      } else {
        ledState.style.backgroundColor = 'red';
      }

      userName.textContent = element.nickname; 
      user.value           = element.iduser;

      user.addEventListener('click', () => {
        if (user.classList.contains('notification-proposal-chat-added')) {
          document.dispatchEvent(new CustomEvent('response-proposal-chat', {
            detail: {
              'originId': localStorage.iduser,
              'targetId': element.iduser,
            }
          }));
          user.classList.remove('notification-proposal-chat-added');
          user.classList.add('revised');   
        }
        this.__userClicked(element.nickname, element.iduser) 
      });
      user.appendChild(ledState);
      user.appendChild(userName);
      
      this.viewReference.userList.appendChild(user);
    });
  }
}

export { ChatController };