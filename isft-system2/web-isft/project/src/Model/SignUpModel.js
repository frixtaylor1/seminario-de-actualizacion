class SignUpModel {
  constructor(apiController) {
    this.apiController = apiController;
  }

  async signUp(userData, callback) {
    try {
      const result = await this.apiController.callApi('/signUp', 'POST', userData);
      if (callback) {
        callback(null, result);
      }
      return result;
    } catch (error) {
      console.error(error);
      if (callback) {
        callback(error, null);
      }
      throw error;
    }
  }
}

export { SignUpModel }; 