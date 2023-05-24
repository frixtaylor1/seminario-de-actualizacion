const { isType } = require("../Common/Common.js");
const { GroupData } = require("../Entities/GroupData.js");

class GroupHandler {
  create(data) {
    if (Object.is(data, GroupData)) {
      return true;
    }
    return false;
  }

  remove(id) {
    if (isType(id, "string")) {
      return true;
    }
    return false;
  }

  update(id, data) {
    if (isType(id, "string") && Object.is(data, GroupData)) {
      return true;
    }
    return false;
  }

  read(id) {
    if (isType(id, "string")) {
      return GroupData;
    }
    return undefined;
  }

  getMembers(id) {
    if (isType(id, "string")) {
      return ['mock', 'mock', 'mock'];
    }
    return [];
  }
};