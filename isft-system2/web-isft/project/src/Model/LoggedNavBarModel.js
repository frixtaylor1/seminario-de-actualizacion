class LoggedNavBarModel {
  constructor(apiController) {
    this.apiController = apiController;
  }

  async logout(callback = null) {
    try {
      let userData = {
        'iduser': localStorage.iduser,
      };

      const result = await this.apiController.callApi('/logOut', 'POST', userData);
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

export { LoggedNavBarModel };