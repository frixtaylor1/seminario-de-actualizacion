const { Sanitizer } = require("../Common/Sanitizer.js");
const { isType } = require("../Common/TypeValidate.js");

class UserHandler {
  constructor(dbHandler) {
    this.dbHandler = dbHandler;
  }

  async create(data) {
    let results;
    let Data = {
      'nickname': Sanitizer.sanitizeInput(data.nickname),
      'password': Sanitizer.sanitizeInput(data.password),
      'name': Sanitizer.sanitizeInput(data.name),
      'surname': Sanitizer.sanitizeInput(data.surname),
      'dni': Sanitizer.sanitizeInput(data.dni),
      'gender': Sanitizer.sanitizeInput(data.gender),
      'telephone': Sanitizer.sanitizeInput(data.telephone),
    };

    if (this.__validateUserDataCreate(Data)) {
      try {
        await this.dbHandler.connect();

        const storeProcedureName = 'usp_create_user';
        results = await this.dbHandler.executeStoreProcedure(storeProcedureName, Data);

        await this.dbHandler.close();
      } catch (error) {
        console.error('Database Error context -> UserHandler -> create', error);
        results = error; // Asignar el objeto de error a results
      }
    } else {
      results = new Error('Fields are null or empty in create');
    }

    return results;
  }

  __validateUserDataCreate(data) {
    return Object.values(data).every(element => isType(element, 'string') && element !== "");
  }
}

module.exports = { UserHandler };
