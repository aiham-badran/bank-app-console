import { prompt } from "../../../util/global.js";
import User from "../../User.js";
import UserScreen from "../UserScreen.js";

export default class UpdateUserScreen extends UserScreen {
  static showUpdateUser() {
    console.clear();

    this._drawScreenHeader("Update User");
    let user;

    while (true) {
      let userName = this.readUserName();
      user = User.find(userName);
      if (user) break;
    }

    console.log(this._printUser(user));

    let answer = prompt(
      `\nDo you Want to update data for ${user.fullName()} ? (y/n)`
    );

    if (answer == "y" || answer == "Y") {
      this._readUserInfo(user);
      const result = user.save();

      if (result == User.SV_SUCCEEDED) {
        console.log(this._printUser(user));
      } else if (result == User.SV_FAILED_ACCOUNT_EXIST) {
        console.log("The user is exist , check for data ...!");
      } else if (result == User.SV_FAILED_EMPTY) {
        console.log("you can not register empty user , check for data ...!");
      }
    }
  }
}
