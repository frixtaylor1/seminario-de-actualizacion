let UserData = {
  id: "",
  name: "",
  surname: "",
  dni: "",
  telephone: "",
  gender: "",
  address: "",
  email: "",
  isActive: false,
  group: ""
};

class UserHandler {
  contructor() {
  }

  create(data) {
    if (Object.is(data, UserData)) {
      // .. creating a user
      return true;
    }
    return false;
  }
  remove(id) {
    if (typeof (id) == "string") {
      // .. removing a user
      return true;
    }
    return false;
  }
  update(id, data) {
    if (typeof (id) == "string" && Object.is(data, UserData)) {
      // .. updating a user.
      return true;
    }
    return false;
  }
  read(id) {
    let data = UserData;
    if (typeof (id) == 'string') {
      return data;
    }
  }
  getGroupMembership(id) {
    if (typeof (id) == 'string') {
      return ["1", "2", "3"];
    }
    return [];
  }
}

let userHandler = new UserHandler;
let data = UserData;
console.log(userHandler.create(data));