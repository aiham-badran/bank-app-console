import { loginRegisterFile } from "../../../util/global.js";
import User from "../../User.js";
import UserScreen from "../UserScreen.js";

export default class ListLoginUsersScreen extends UserScreen {
  static writeLogData(currentUser, separator = "#//#") {
    let lineData = new Date().toISOString() + separator;
    lineData += currentUser.userName + separator;
    lineData += currentUser.password + separator;
    lineData += currentUser.permissions;
    loginRegisterFile.append(lineData);
  }
  static showListLoginUsers() {
    console.clear();
    const listLoginUsers = User._getLogData();
    const listLength = listLoginUsers.length;

    if (listLength < 1) {
      this._drawScreenHeader("List Of Login Users");
      console.log("\n\n\t\t\t No Data to View ! ...");
      this._drawDabbleLien();
      return;
    }

    this._drawScreenHeader("List Of Login Users", `(${listLength}) time(s)`);

    console.table(listLoginUsers, [
      "login date",
      "user name",
      "password",
      "permission",
    ]);
  }
}
