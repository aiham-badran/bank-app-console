import Person from "./Person.js";
import { loginRegisterFile, userFile } from "../util/global.js";
import UserScreen from "./Screens/UserScreen.js";

export default class User extends Person {
  #_userName;
  #_permissions;
  #_password;

  #_mode;
  #_markedForDelete = false;

  static #_EMPTY_MODE = 0;
  static #_UPDATE_MODE = 1;
  static #_ADD_MODE = 2;

  static SV_FAILED_EMPTY = 0;
  static SV_SUCCEEDED = 1;
  static SV_FAILED_ACCOUNT_EXIST = 2;

  constructor(
    mode,
    userName = "",
    password = "",
    permissions = 0,
    firstName = "",
    lastName = "",
    email = "",
    phone = ""
  ) {
    super(firstName, lastName, email, phone);
    this.#_mode = mode;
    this.#_userName = userName;
    this.#_permissions = permissions;
    this.#_password = password;
  }

  get userName() {
    return this.#_userName;
  }

  set userName(value) {
    this.#_userName = value;
  }

  get permissions() {
    return parseInt(this.#_permissions);
  }
  set permissions(value) {
    this.#_permissions = value;
  }

  get password() {
    return this.#_password;
  }

  set password(value) {
    this.#_password = value;
  }

  get markedForDelete() {
    return this.#_markedForDelete;
  }

  #_update() {
    let users = User.#_loadUsersDataFromFile();
    users = users.map((user) => {
      if (user.userName == this.userName) {
        return this;
      }

      return user;
    });

    User.#_saveUsersToFile(users);
  }

  #_addDataLineToFile(line) {
    userFile.append(line);
  }

  #_addNew() {
    this.#_addDataLineToFile(User.#_convertUserObjToLine(this));
  }

  static _Encryption(pass) {
    pass = String(pass);
    const newPass = pass
      .split("")
      .map((c) => {
        return String.fromCharCode(c.charCodeAt() + 1);
      })
      .join("");

    return newPass;
  }

  static #_convertLineToUserObject(line, separator = "#//#") {
    const user = line.split(separator);
    return new User(
      this.#_UPDATE_MODE,
      user[0],
      user[1],
      user[2],
      user[3],
      user[4],
      user[5],
      user[6]
    );
  }

  static #_convertUserObjToLine(user, separator = "#//#") {
    let line = "";
    line += user.userName + separator;
    line += User._Encryption(user.password) + separator;
    line += user.permissions + separator;
    line += user.firstName + separator;
    line += user.lastName + separator;
    line += user.email + separator;
    line += user.phone;

    return line;
  }

  static #_loadUsersDataFromFile() {
    const users = userFile.read();
    return users.map((user) => this.#_convertLineToUserObject(user));
  }

  static #_getEmptyUserObj() {
    return new User(this.#_EMPTY_MODE);
  }

  static #_saveUsersToFile(users) {
    const lines = [];

    for (let user of users) {
      if (user.markedForDelete) continue;
      lines.push(this.#_convertUserObjToLine(user));
    }
    const line = lines.join("\n");
    userFile.write(line);
  }

  static find(userName) {
    let userObj = null;

    const users = this.#_loadUsersDataFromFile();
    users.forEach((user) => {
      if (user.userName == userName) {
        userObj = user;
        return;
      }
    });
    return userObj;
  }

  static findByPassword(userName, password) {
    let userObj = this.find(userName);

    if (userObj?.password == User._Encryption(password)) return userObj;
    setTimeout(() => {}, 600000);
    return null;
  }

  static isUserExit(userName) {
    return this.find(userName);
  }

  static getAddNewUserObject(userName) {
    return new User(User.#_ADD_MODE, userName);
  }

  static getUsersList() {
    return User.#_loadUsersDataFromFile();
  }

  static _getLogData(separator = "#//#") {
    const data = loginRegisterFile.read();

    const logs = data.map((d) => {
      const logData = d.split(separator);

      return {
        "login date": logData[0],
        "user name": logData[1],
        password: logData[2],
        permission: logData[3],
      };
    });

    return logs;
  }

  isEmpty() {
    return this.#_mode == User.#_EMPTY_MODE;
  }

  save() {
    switch (this.#_mode) {
      case User.#_EMPTY_MODE:
        return User.SV_FAILED_EMPTY;
      case User.#_UPDATE_MODE: {
        this.#_update();
        return User.SV_SUCCEEDED;
      }
      case User.#_ADD_MODE: {
        if (!User.isUserExit(this.userName)) {
          this.#_addNew();
          this.#_mode = User.#_UPDATE_MODE;
          return User.SV_SUCCEEDED;
        } else {
          return User.SV_FAILED_ACCOUNT_EXIST;
        }
      }
    }

    return User.SV_FAILED_EMPTY;
  }

  delete() {
    const users = User.#_loadUsersDataFromFile();
    for (let user of users) {
      if (user.userName == this.userName) {
        user.#_markedForDelete = true;
        break;
      }
    }

    User.#_saveUsersToFile(users);

    delete this;
    // this = User.#_getEmptyClientObj();
    return true;
  }

  checkAccessPermission(permission) {
    if (permission == UserScreen.P_All) return true;

    if ((permission & this.permissions) == permission) return true;

    return false;
  }
}
