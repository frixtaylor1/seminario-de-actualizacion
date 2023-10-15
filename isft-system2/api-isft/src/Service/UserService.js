const { dataBaseHandler } = require("../DataBaseHandler/DataBaseHandler.js");

class UserService {
  constructor(dbHandler = dataBaseHandler) {
    this.dbHandler = dbHandler;
  }

  /**  
   * @brief Service para obtener la informacion de usuario
   * 
   * @param {JSON} data contains iduser
   * 
   * @returns {JSON} status and results
  */
  async getUserInfo(data) {
    try {
      await this.dbHandler.connect();
      
      let results = await this.dbHandler.executeStoreProcedure('usp_read_user_by_id', data);

      await this.dbHandler.close();


      console.log ('RESULTS>>', results[0]);
      return { status: 200, results: results[0]};
    
    } catch (error) {
      console.error(error);
      return { status: 400, results: error};
    }
  }

  /**  
   * @brief Service para obtener la informacion de usuario
   * 
   * @param {JSON} data contains iduser
  */
  async getUserList() {
    try {

      await this.dbHandler.connect();
      
      let data = {

      };

      let results = await this.dbHandler.executeStoreProcedure('usp_get_user_list', data);

      await this.dbHandler.close();
      
      return { status: 200, results: results };

    } catch (error) {
      console.error(error);

      return { status: 400, results: error };
    }
  }
};

module.exports = { UserService };