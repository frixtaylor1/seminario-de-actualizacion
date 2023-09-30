const { isType } = require("./TypeValidate.js");

class Sanitizer {
  static __sanitizeString(input) {
    const sanitizedInput = input.replace(/[^\w\s]/gi, '').replace(/'/g, "\\'");
    return sanitizedInput;
  }
  static __sanitizeNumber(input) {
    const sanitizedInput = input.replace(/[^0-9]/g, '');
    return sanitizedInput;
  }
  static sanitizeInput(input) {
    if (isType(input, "string")) {
      return this.__sanitizeString(input);
    }
    else if (isType(input, "number")) {
      return this.__sanitizeNumber(input);
    }
    else {
      throw new Error('Invalid input type');
    }
  }
}

module.exports = { Sanitizer };