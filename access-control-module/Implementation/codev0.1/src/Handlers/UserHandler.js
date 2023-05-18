const { isType } = require("../Common/Common.js");
const { UserData } =  require("../Entities/UserData.js");

class UserHandler {
  create(data) {
    if (Object.is(data, UserData)) {
      // .. creating a user
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