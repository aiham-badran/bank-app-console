import User from "../../User.js";
import UserScreen from "../UserScreen.js";

export default class FindUserScreen extends UserScreen {
  static showFindUser() {
    console.clear();

    this._drawScreenHeader("Find User");
    let user;

    while (true) {
      const userName = this.readUserName();
      user = User.find(userName);
      if (user) break;
    }

    if (user.isEmpty()) {
      console.log("The User Not Found");
      return;
    }

    console.log(this._printUser(user));
  }
}
