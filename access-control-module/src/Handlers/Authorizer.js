const { isType } = require("../Common/Common.js");

class Authorizer {
  authorize(userId, resourceId)
  {
    if(isType(userId, "string") && isType(resourceId, "string"))
    {
      return true;
    }
    return false;
  }
};