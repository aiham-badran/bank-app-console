import User from "../../User.js";
import UserScreen from "../UserScreen.js";

export default class ListUsersScreen extends UserScreen {
  static showListUsers() {
    console.clear();
    const users = User.getUsersList();
    const usersLength = users.length;

    if (users < 1) {
      this._drawScreenHeader("Users List");
      console.log("\n\n\t\t\t No Users to View ! ...");
      this._drawDabbleLien();
      return;
    }

    this._drawScreenHeader("Users List", `(${usersLength}) Client(s)`);

    const arr = [];
    users.forEach((user) => {
      arr.push(this._printUser(user, true));
    });

    console.table(arr, [
      "User Name",
      "Full Name",
      "Email",
      "Phone",
      "permissions",
    ]);
  }
}
