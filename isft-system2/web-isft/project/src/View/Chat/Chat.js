import { ChatController } from "../../Controller/ChatController.js";
import { createElement }  from "../Utils/Utility.js";
import { ApiController }  from "../../Controller/ApiCallController.js";
import { ChatModel }      from "../../Model/ChatModel.js";

class Chat extends HTMLElement {
  constructor() {
    super();
    this.classList.add('chat-component');

    this.modalWindow  = undefined;

    this.userPanel    = createElement('div',    { class: 'user-panel' });
    this.userList     = createElement('ul',     { class: 'user-list' });
    
    this.chatPanel    = createElement('div',    { class: 'chat-panel' });
    this.chat         = createElement('div',    { class: 'chat' });

    this.input        = createElement('input',  { 
      class       : 'message-input', 
      type        : 'text', 
      placeholder : 'Escribe un mensaje...' 
    }); 

    this.button           = createElement('button', { class:'bttn-message' });
    this.button.innerText = 'send';

    this.bottomChatPanel  = createElement('div', { class: 'bottom-chat-panel' });

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
    this.chatPanel.appendChild(this.chat);
    this.bottomChatPanel.appendChild(this.input);
    this.bottomChatPanel.appendChild(this.button);
    this.chatPanel.appendChild(this.bottomChatPanel);
    this.appendChild(this.userPanel);
  
    let style = createElement('style');
    style.innerText = `@import "./style/Chat.css"`;
    this.appendChild(style);
  }
}
customElements.define('x-chat', Chat);

export { Chat };