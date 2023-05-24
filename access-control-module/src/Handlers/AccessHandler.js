const { isType } = require("../Common/Common.js");

class AccessHandler {
  add(resourceId, groupId) {
    if(isType(resourceId, "string") && isType(groupId, "string")) {
      return true;
    }
    return false;
  }
  remove(resourceId, groupId) {
    if(isType(resourceId, "string") && isType(groupId, "string")) {
      return true;
    }
    return false;
  }
  getGroupAccessById(resourceId) {
    if(isType(resourceId, "string")) {
      return ['mock', 'mock'];
    }
  }
  getResourceAccessByGroup(groupId) {
    if(isType(groupId, "string")) {
      return ['mock', 'mock', 'mock'];
    }
    return [];
  }
};