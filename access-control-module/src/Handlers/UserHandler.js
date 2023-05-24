const { DBConfig } = require("../Common/Config.js");
const { UserData } = require("../Entities/UserData.js");

const { DataBaseHandler } = require("./DataBaseHandler.js");
const { Sanitizer } = require("../Common/Sanitizer.js");

const { isType } = require("../Common/Common.js");

class UserHandler {
  constructor(dbHandler) {
    this.dbHandler = dbHandler;
  }
  
  create(data) {
    if(Object.is(data, UserData)) {
      let Data = {
        name: Sanitizer.sanitizeInput(data.name),
        surname: Sanitizer.sanitizeInput(data.surname),
        dni: Sanitizer.sanitizeInput(data.dni),
        gender: Sanitizer.sanitizeInput(data.gender),
        telephone: Sanitizer.sanitizeInput(data.telephone)
      };
      this.dbHandler.connect();
      this.dbHandler.executeStoreProcedure("usp_create_user", Data);
      this.dbHandler.close();
      return true;
    }
    return false;
  }

  remove(id) {
    if (isType(id, "string")) {
      let Data = {
        dni: Sanitizer.sanitizeInput(id)
      };
      this.dbHandler.connect();
      this.dbHandler.executeStoreProcedure("usp_delete_user", Data);
      this.dbHandler.close();
      return true;
    }
    return false;
  }

  update(id, data) {
    if (isType(id, "string") && Object.is(data, UserData)) {
      let Data = {
        id_dni: Sanitizer.sanitizeInput(id),
        name: Sanitizer.sanitizeInput(data.name),
        surname: Sanitizer.sanitizeInput(data.surname),
        dni: Sanitizer.sanitizeInput(data.dni),
        gender: Sanitizer.sanitizeInput(data.gender),
        telephone: Sanitizer.sanitizeInput(data.telephone)
      };
      this.dbHandler.connect();
      this.dbHandler.executeStoreProcedure("usp_update_user", Data);
      this.dbHandler.close();
      return true;
    }
    return false;
  }

  read(id) {
    if (isType(id, "string")) {
      let Data = {
        dni: Sanitizer.sanitizeInput(id) 
      };
      this.dbHandler.connect();
      let data = this.dbHandler.executeStoreProcedure("usp_read_user", Data);
      this.dbHandler.close();
      return data;
    }
    return undefined;
  }

  getGroupMembership(id) {
    if (isType(id, "string")) {
      return ['mock', 'mock', 'mock'];
    }
    return [];
  }
};

let userHandler = new UserHandler(new DataBaseHandler(DBConfig));

let data = UserData;

data.name = "Kevin";
data.surname = "Taylor";
data.dni = "123213123";
data.gender = "Male";
data.telephone = "545454545";
/* 
userHandler.update("123213123", data);
*/
console.log(userHandler.read("123213123"));