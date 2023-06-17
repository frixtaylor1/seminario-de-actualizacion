const { Sanitizer } = require("../Common/Sanitizer.js");
const { isType } = require("../Common/TypeValidate.js");
const { DataBaseHandler } = require("../DBHandler/DBHandler.js");
const { DbConfig } = require("../Common/DBConfig.js");
const DBConfig = require("../Common/DBConfig.js");

let UserData = {
  "nickname": "",
  "password": "",
  "name": "",
  "surname": "",
  "dni": "",
  "gender": "",
  "telephone": "",
};

function User(nickname, password, name, surname, dni, gender, telephone) {
  this.nickname = nickname;
  this.password = password;
  this.name = name;
  this.surname = surname;
  this.dni = dni;
  this.gender = gender;
  this.telephone = telephone;

  this.getJson = function() {
    return {
      "nickname": this.nickname,
      "password": this.password,
      "name": this.name,
      "surname": this.surname,
      "dni": this.dni,
      "gender": this.gender,
      "telephone": this.telephone,
    };
  }
}

class UserHandler {
  constructor(dbHandler) {
    this.dbHandler = dbHandler;
  }
  async create(data) {
    let results;
/*     if (Object.is(data, UserData)) { */
      let Data = {
        'nickname': Sanitizer.sanitizeInput(data.nickname),
        'password': Sanitizer.sanitizeInput(data.password),
        'name': Sanitizer.sanitizeInput(data.name),
        'surname': Sanitizer.sanitizeInput(data.surname),
        'dni': Sanitizer.sanitizeInput(data.dni),
        'gender': Sanitizer.sanitizeInput(data.gender),
        'telephone': Sanitizer.sanitizeInput(data.telephone),
      };
      try {
        await this.dbHandler.connect();

        const storeProcedureName = 'usp_create_user';
        results = await this.dbHandler.executeStoreProcedure(storeProcedureName, Data);
        await this.dbHandler.close();

      } catch (error) {
        console.error('Database Error context -> UserHandler -> create', error);
        await this.dbHandler.close();
      }
      return results;
/*     } */
/*     return false; */
  }
};

let userHandler = new UserHandler(new DataBaseHandler((new DBConfig()).getEnv()));

let userdata = {
    "nickname": "frix",
    "password": "123456",
    "name": "Kevin",
    "surname": "Taylor",
    "dni": "40923413",
    "gender": "male",
    "telephone": "123123213",
};

(async () => {
  const result = await userHandler.create(userdata);
  console.log(result);
})();