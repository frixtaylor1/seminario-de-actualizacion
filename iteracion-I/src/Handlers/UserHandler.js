
const { DBConfig } = require("../Common/Config.js");
const { UserData } = require("../Entities/UserData.js");

const { DataBaseHandler } = require("./DataBaseHandler.js");
const { Sanitizer } = require("../Common/Sanitizer.js");

const { isType } = require("../Common/Common.js");

const bcrypt = require('bcrypt');

class UserHandler {
  constructor(dbHandler) {
    this.dbHandler = dbHandler;
  }
  
  create(data) {
    if (Object.is(data, UserData)) {
      const sanitizedData = {
        username: Sanitizer.sanitizeInput(data.username),
        password: Sanitizer.sanitizeInput(data.password),
        name: Sanitizer.sanitizeInput(data.name),
        surname: Sanitizer.sanitizeInput(data.surname),
        dni: Sanitizer.sanitizeInput(data.dni),
        gender: Sanitizer.sanitizeInput(data.gender),
        telephone: Sanitizer.sanitizeInput(data.telephone)
      };
  
      sanitizedData.password = bcrypt.hashSync(sanitizedData.password, 5);
      this.dbHandler.connect();
      this.dbHandler.executeStoreProcedure("usp_create_user", sanitizedData);
      this.dbHandler.close();
  
      return true;
    }
    return false;
  }

  remove(id) {
    if (isType(id, "string")) {
      let Data = {
        dni: Sanitizer.sanitizeInput(id)
      };
      this.dbHandler.connect();
      this.dbHandler.executeStoreProcedure("usp_delete_user", Data);
      this.dbHandler.close();
      return true;
    }
    return false;
  }

  update(id, data) {
    if (isType(id, "string") && Object.is(data, UserData)) {
      let Data = {
        id_dni: Sanitizer.sanitizeInput(id),
        name: Sanitizer.sanitizeInput(data.name),
        surname: Sanitizer.sanitizeInput(data.surname),
        dni: Sanitizer.sanitizeInput(data.dni),
        gender: Sanitizer.sanitizeInput(data.gender),
        telephone: Sanitizer.sanitizeInput(data.telephone)
      };
      this.dbHandler.connect();
      this.dbHandler.executeStoreProcedure("usp_update_user", Data);
      this.dbHandler.close();
      return true;
    }
    return false;
  }
  read(id) {
    if (isType(id, "string")) {
      let Data = {
        dni: Sanitizer.sanitizeInput(id) 
      };

      this.dbHandler.connect();

      return new Promise((resolve, reject) => {
        this.dbHandler.executeStoreProcedure("usp_read_user", Data)
          .then((results) => {
            resolve(results);
          })
          .catch((error) => {
            console.error("StoredProcedure execution failed!", error);
            reject(error);
          })
          .finally(() => {
            this.dbHandler.close();
          });
      });
    }
  }

  getGroupMembership(id) {
    if (isType(id, "string")) {
      return ['mock', 'mock', 'mock'];
    }
    return [];
  }
};

let userHandler = new UserHandler(new DataBaseHandler(DBConfig));

let data = UserData;

data.username = "pepes";
data.password = "roco";
data.name = "Kevin";
data.surname = "Taylor";
data.dni = "123213123";
data.gender = "Male";
data.telephone = "545454545";
/* 
userHandler.create(data);
 */
/* 
userHandler.update("123213123", data);
*/

userHandler.read('123213123')
  .then((results) => {
    const jsonData = results;
    processData(jsonData);
  })
  .catch((error) => {
    console.error('Error al obtener los datos de la base de datos', error);
  }
);

function processData(data) {
  if (Array.isArray(data) && data.length > 0) {
    const row = data[0];
    if (row.user_json) {
      try {
        const parsedData = JSON.parse(row.user_json);
        const { iduser_data, name, surname, gender, dni, telephone } = parsedData;
        console.log('id:', iduser_data);
        console.log('name:', name);
        console.log('surname:', surname);
        console.log('gender:', gender);
        console.log('dni:', dni);
        console.log('telephone:', telephone);
      } catch (error) {
        console.error('Error al analizar el JSON:', error);
      }
    } else {
      console.error('El campo user_json no está presente en los datos');
    }
  } else {
    console.error('No se encontraron datos válidos');
  }
}