const { Sanitizer } = require("../Common/Sanitizer.js");
const { isType } = require("../Common/TypeValidate.js");

class GroupHandler {
  constructor(dbHandler) {
    this.dbHandler = dbHandler;
  }

  async create(data) {
    let Data = {
      'name': Sanitizer.sanitizeInput(data.name),
    };

    if(!this.__validateUserDataCreate(Data)) {
      return Error('Error json input at createUserData');
    }

    try {
      await this.dbHandler.connect();

    } catch(error) {
      console.error(error);
      return error;
    }
  }

  async read(id) {

  }

  async update(id) {

  }

  async insertUserInGroup(data) {

  }

  __validateUserDataCreate(data) {
    return Object.values(data).every(element => isType(element, 'string') && element !== "");
  }
}

module.exports = { GroupHandler };