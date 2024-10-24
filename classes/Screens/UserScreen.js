import { prompt } from "../../util/global.js";
import Screen from "./Screen.js";

export default class UserScreen extends Screen {
  static P_All = -1;
  static P_LIST_CLIENT = 1;
  static P_ADD_CLIENT = 2;
  static P_UPDATE_CLIENT = 4;
  static P_DELETE_CLIENT = 8;
  static P_FIND_CLIENT = 16;
  static P_TRANSACTIONS = 32;
  static P_MANAGE_USERS = 64;
  static P_CURRENCIES_MENU = 128;

  static _printUser(user, row = false, space = 5) {
    if (row) {
      return {
        "User Name": user.userName,
        "Full Name": user.fullName(),
        Email: user.email,
        Phone: user.phone,
        permissions: user.permissions,
      };
    } else {
      return `
        User Name : ${user.userName} \n
        Full Name : ${user.fullName()}\n 
        Email : ${user.email}\n
        Pheon : ${user.phone}\n`;
    }
  }

  static _readPermissionsToSet() {
    let permission = 0;

    let answer = prompt("Do you Want give User All Permissions (y/n) ");
    if (answer == "y" || answer == "Y") return this.P_All;

    answer = prompt(
      "Do you Want give User Permission for Show List Client (y/n) "
    );

    if (answer == "y" || answer == "Y") permission += this.P_LIST_CLIENT;

    answer = prompt("Do you Want give User Permission for Add Client (y/n) ");

    if (answer == "y" || answer == "Y") permission += this.P_ADD_CLIENT;

    answer = prompt(
      "Do you Want give User Permission for Update Client (y/n) "
    );

    if (answer == "y" || answer == "Y") permission += this.P_UPDATE_CLIENT;

    answer = prompt(
      "Do you Want give User Permission for Delete Client (y/n) "
    );

    if (answer == "y" || answer == "Y") permission += this.P_DELETE_CLIENT;

    answer = prompt("Do you Want give User Permission for Find Client (y/n) ");

    if (answer == "y" || answer == "Y") permission += this.P_FIND_CLIENT;

    answer = prompt(
      "Do you Want give User Permission for Use Transactions Menu (y/n) "
    );

    if (answer == "y" || answer == "Y") permission += this.P_TRANSACTIONS;

    answer = prompt("Do you Want give User Permission for Manage User (y/n) ");

    if (answer == "y" || answer == "Y") permission += this.P_MANAGE_USERS;

    return permission;
  }

  static _readUserInfo(user) {
    console.log("Please Enter User Info : \n");

    user.firstName = prompt("First Name : # ");
    user.lastName = prompt("Last Name : # ");
    user.password = prompt("Password :  # ");
    user.email = prompt("Email : # ");
    user.phone = prompt("Phone :  # ");
    user.permissions = this._readPermissionsToSet();
  }

  static readUserName() {
    const user = prompt("Enter User Name : ");

    return user;
  }
}
