class ChatStorage {
  constructor() {
    this.storage = new Map();
  }

  storeChatMessages(idChat, messageData) {
    let arrayOfMessages = this.storage.get(idChat);
    arrayOfMessages = (arrayOfMessages === null || arrayOfMessages === undefined) ? new Array() : arrayOfMessages;
    arrayOfMessages.push(messageData);
    this.storage.set(idChat, arrayOfMessages);
  }

  getChatMessages(idChat) {
    return { 'idChat': idChat, 'arrayOfMessages': this.storage.get(idChat) };
  }
};

const chatStorage = new ChatStorage();

module.exports = { chatStorage };