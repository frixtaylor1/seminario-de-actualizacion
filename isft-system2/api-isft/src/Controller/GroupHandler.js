const { Sanitizer } = require("../Common/Sanitizer.js");
const { isType } = require("../Common/TypeValidate.js");

class GroupHandler {
  constructor(dbHandler) {
    this.dbHandler = dbHandler;
  }

  async create(data) {
    let results = {};
    let Data = {
      'name': Sanitizer.sanitizeInput(data.name),
    };

    if(this.__validateGroupData(Data)) {
      try {
        await this.dbHandler.connect();

        let storeProcedure = 'usp_create_group';
        results = await this.dbHandler.executeStoreProcedure(storeProcedure, Data);
        
      } catch(error) {
        console.error('Database Error context -> GroupHandler -> create', error);
        results = error;

      } finally {
        await this.dbHandler.close();
      }
    } else {
      results = new Error('Error json input at createGroupData');
    }

    return results;
  }

  async readById(data) {
    let results = {};
    let Data = {
      'id': Sanitizer.sanitizeInput(data.id),
    };

    if(this.__validateGroupData(Data)) {
      try {
        await this.dbHandler.connect();
        
        let storeProcedure = 'usp_read_group_by_id';
        results = await this.dbHandler.executeStoreProcedure(storeProcedure, Data);

      } catch(error) {
        console.error('Database Error context -> GroupHandler -> read', error);
        results = error;
      }
    } else {
      results = new Error('Fields are null or empty in read');
    }

    return results;
  }

  async updateById(data) {
    let results = {};
    let Data = {
      'id'  : Sanitizer.sanitizeInput(data.id),
      'name': Sanitizer.sanitizeInput(data.name), 
    };

    if(this.__validateGroupData(Data)) {
      try {
        await this.dbHandler.connect();

        let storeProcedure = 'usp_update_group_by_id';
        results = await this.dbHandler.executeStoreProcedure(storeProcedure, Data);
        
      } catch(error) {
        console.error('Database Error context -> GroupHandler -> update', error);
        results = error;
      }
    } else {
      results = new Error('Fields are null or empty in update');
    }

    return results;
  }

  async insertUserInGroup(data) {
    let results = {};
    let Data = {
      'iduser' : Sanitizer.sanitizeInput(data.iduser),
      'idgroup': Sanitizer.sanitizeInput(data.idgroup)
    };

    if(this.__validateGroupData(Data)) {
      try {
        await this.dbHandler.connect();

        let storeProcedure = 'usp_insert_user_in_group';
        results = await this.dbHandler.executeStoreProcedure(storeProcedure, Data);
      
      } catch(error) {
        console.error('Database Error context -> GroupHandler -> insertUserInGroup', error);
        results = error;
      }
    } else {
      results = new Error('Fields are empty or null!');
    }

    return results;
  }

  async deleteUserFromGroup(data) {
    let results = {};
    let Data = {
      'iduser' : Sanitizer.sanitizeInput(data.iduser),
      'idgroup': Sanitizer.sanitizeInput(data.idgroup)
    };

    if(this.__validateGroupData(Data)) {
      try {
        await this.dbHandler.connect();

        let storeProcedure = 'usp_delete_user_from_group';
        results = await this.dbHandler.executeStoreProcedure(storeProcedure, Data);
      
      } catch(error) {
        console.error('Database Error context -> GroupHandler -> deleteUserFromGroup', error);
        results = error;
      }
    } else {
      results = new Error('Fields are empty or null!');
    }
    
    return results;
  }

  __validateGroupData(data) {
    return Object.values(data).every(element => isType(element, 'string') && element !== "");
  }
}

module.exports = { GroupHandler };