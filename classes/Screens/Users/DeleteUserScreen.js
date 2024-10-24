import { prompt } from "../../../util/global.js";
import User from "../../User.js";
import UserScreen from "../UserScreen.js";

export default class DeleteUserScreen extends UserScreen {
  static showDeleteUser() {
    console.clear();

    this._drawScreenHeader("Delete User");
    let user;

    while (true) {
      let userName = this.readUserName();
      user = User.find(userName);
      if (user) break;
    }

    console.log(this._printUser(user));
    const fullName = user.fullName();
    let answer = prompt(`\nDo you Want to Delete data for ${fullName} ? (y/n)`);

    if (answer == "y" || answer == "Y") {
      const isDEleted = user.delete();
      if (isDEleted) console.log(`The data for ${fullName} is deleted ... `);
      else
        console.log(`The data for ${fullName} is not deleted try again later`);
    }
  }
}
