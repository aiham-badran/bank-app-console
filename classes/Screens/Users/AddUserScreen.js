import User from "../../User.js";
import UserScreen from "../UserScreen.js";

export default class AddUserScreen extends UserScreen {
  static showAddUser() {
    console.clear();

    this._drawScreenHeader("Add New User");
    let userName;

    while (true) {
      userName = this.readUserName();
      if (!User.isUserExit(userName)) break;
    }

    const user = User.getAddNewUserObject(userName);

    this._readUserInfo(user);
    const result = user.save();

    if (result == User.SV_SUCCEEDED) {
      console.log(this._printUser(user));
    } else if (result == User.SV_FAILED_ACCOUNT_EXIST) {
      console.log("The User is exist , check for data ...!");
    } else if (result == User.SV_FAILED_EMPTY) {
      console.log("you can not register empty User , check for data ...!");
    }
  }
}
