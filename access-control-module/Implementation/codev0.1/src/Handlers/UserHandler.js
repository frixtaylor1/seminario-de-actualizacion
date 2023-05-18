const { DBConfig } = require("../Common/config.js");
const { UserData } =  require("../Entities/UserData.js");
const { isType } = require("../Common/Common.js");

const { DataBaseHandler } = require("./DataBaseHandler.js");

class UserHandler {
  create(data) {
    if (Object.is(data, UserData)) {
      let dbHandler = new DataBaseHandler(DBConfig);
      dbHandler.connect();
      dbHandler.query("SELECT * FROM user_data");
      dbHandler.close(); 

      return true;
    }
    return false;
  }
  remove(id) {
    if (isType(id, "string")) {
      // .. removing a user
      return true;
    }
    return false;
  }
  update(id, data) {
    if (isType(id, "string") && Object.is(data, UserData)) {
      // .. updating a user.
      return true;
    }
    return false;
  }
  read(id) {
    let data = UserData;
    if (isType(id, "string")) {
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
}
let userHandler = new UserHandler();

let userData = UserData;

userData.name = "Marcos";
userData.surname = "Rodriguez";
userData.dni = "23123123";
userData.email = "asdasad@asd.com";
userData.isActive = "asdasd";
userData.telephone = "123123123";
userData.isActive = true;

userHandler.create(userData);

