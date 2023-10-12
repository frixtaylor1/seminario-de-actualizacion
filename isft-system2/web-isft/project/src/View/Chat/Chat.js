import { createElement }  from "../Utils/Utility";
import { ApiController }  from "../../Controller/ApiCallController";
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

  __onLoad() {
    let userList = this.modelReference.getUserList();

    userList.forEach(element => {
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

/* 
<!DOCTYPE html>
<html>
<head>
    <style>
        /* Estilos generales
        body, html {
          height: 100%;
          margin: 0;
      }

      /* Contenedor principal del chat
      #chat-container {
          display: flex;
          height: 100%;
      }

      /* Estilos para el panel de usuarios
      #user-panel {
          width: 20%;
          background: #f2f2f2;
          overflow-y: auto;
      }

      #user-list {
          list-style: none;
          padding: 0;
      }

      .user {
          padding: 10px;
          cursor: pointer;
          border-bottom: 1px solid #ddd;
      }

      .user:hover {
          background: #ddd;
      }

      /* Estilos para el área de chat
      #chat-panel {
          width: 80%;
          background: #ffffff;
          display: flex;
          flex-direction: column;
      }

      #chat {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
      }

      .message {
          margin: 10px;
          padding: 10px;
          border-radius: 5px;
          max-width: 70%;
      }

      .message.sender {
          align-self: flex-end;
          background-color: #593e8a;
          color: wheat;
      }

      .message.receiver {
          align-self: flex-start;
          background-color: #f2f2f2;
      }

      /* Estilos para el cuadro de entrada de mensajes
      #message-input {
          padding: 10px;
          border: none;
          border-top: 1px solid #ddd;
          width: 100%;
      }
  </style>
</head>
<body>
  <div id="chat-container">
      <div id="user-panel">
          <ul id="user-list">
              <li class="user">Usuario 1</li>
              <li class="user">Usuario 2</li>
              <li class="user">Usuario 3</li>
              <li class="user">Usuario 4</li>
          </ul>
      </div>
      <div id="chat-panel">
          <div id="chat">
              <div class="message sender">
                  Hola, ¿cómo estás?
              </div>
              <div class="message receiver">
                  ¡Hola! Estoy bien, ¿y tú?
              </div>
              <div class="message sender">
                  Estoy bien, gracias.
              </div>
          </div>
          <input type="text" id="message-input" placeholder="Escribe un mensaje..." />
      </div>
  </div>
</body>
</html>

 */