import { createElement }  from "../Utils/Utility.js";
import { ApiController }  from "../../Controller/ApiCallController.js";
import { ModalWindow }    from "../Forms/ModalWindow.js";

class ChatModel {
  constructor(apiController = new ApiController('http://127.0.0.1:3036')) {
    this.apiController = apiController;
  }

  async getUserList(callback = null) {
    try {
      
      const result = await this.apiController.callApi('/getUserList', 'POST');
      if (callback) {
        callback(null, result);
      }
      return result;

    } catch (error) {
      console.error(error);
      if (callback) {
        callback(error, null);
      }
      throw error;
    }
  }

  async propose(targetNickname) {
    let data = {
      'targetUser': targetNickname,
    };

    try {
      const result = await this.apiController.callApi('/propose', 'POST', data);
      if (callback) {
        callback(null, result);
      }
      return result;
    } catch (error) {
      console.error(error);
      if (callback) {
        callback(error, null);
      }
      throw error;
    }
  }

  async askForMessage(chatId) {
    let data = {
      'chatId': chatId,
    };

    try {
      const result = await this.apiController.callApi('/askForMessage', 'POST', data);
      if (callback) {
        callback(null, result);
      }
      return result;
    } catch (error) {
      console.error(error);
      if (callback) {
        callback(error, null);
      }
      throw error;
    }
  }

  async confirmProposal(proposalId) {
    let data = {
      'proposalId': proposalId,
    };

    try {
      const result = await this.apiController.callApi('/confirmProposal', 'POST', data);
      if (callback) {
        callback(null, result);
      }
      return result;
    } catch (error) {
      console.error(error);
      if (callback) {
        callback(error, null);
      }
      throw error;
    }
  }

  async declineProposal(proposalId) {
    let data = {
      'proposalId': proposalId,
    };

    try {
      const result = await this.apiController.callApi('/declineProposal', 'POST', data);
      if (callback) {
        callback(null, result);
      }
      return result;
    } catch (error) {
      console.error(error);
      if (callback) {
        callback(error, null);
      }
      throw error;
    }
  }
}

class ChatController {
  constructor(viewReference = new Chat(), modelReference = new ChatModel()) {
    this.viewReference  = viewReference;
    this.modelReference = modelReference;

    this.__setCallbacks();
  }

  __propose() {
    this.modelReference.propose()
  }

  __askForMessages() {
    this.modelReference.askForMessage()
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

class Chat extends HTMLElement {
  constructor() {
    super();
    this.classList.add('chat-component');

    this.userPanel    = createElement('div', { class: 'user-panel' });
    this.userList     = createElement('ul',  { class: 'user-list' });

    this.chatPanel    = createElement('div', { class: 'chat-panel' });
    this.chat         = createElement('div', { class: 'chat' });

    this.modalWindow  = new ModalWindow();

    this.controller = new ChatController(
      this, 
      new ChatModel(
        new ApiController('http://127.0.0.1:3036')
      )
    );
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {

  }

  render() {
    this.userPanel.appendChild(this.userList);
    this.appendChild(this.userPanel);
  
    let style = createElement('style');
    style.innerText = `@import "./style/Chat.css"`;
    this.appendChild(style);
  }
}
customElements.define('x-chat', Chat);

export { Chat };