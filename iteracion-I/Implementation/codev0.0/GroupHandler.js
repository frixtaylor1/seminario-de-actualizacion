let GroupData = {
  id: "",
  name: "",
  members: [],
  isActive: false
};

class GroupHandler {
  contructor() {
  }
  create(data) {
    if(Object.is(data, GroupData)) {
      return true;
    }
    return false;
  }
  remove(id) {
    if(typeof(id) == "string") {
      return true;
    }
    return false;
  }
  update(id, data) {
    if(typeof(id) == "string" && Object.is(data, GroupData)) {
      return true;
    }
    return false;
  }
  read(id) {
    if(typeof(id) == "string") {
      return GroupData;
    }
  }
  getMembers(id) {
    if(typeof(id) == "string") {
      return [];
    }
  }
}

let groupHanlder = new GroupHandler;
let data = GroupData;

console.log(groupHanlder.read(""));