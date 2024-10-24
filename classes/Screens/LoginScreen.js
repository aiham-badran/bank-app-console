import { prompt } from "../../util/global.js";
import Screen from "./Screen.js";
import User from "../User.js";
import MainMenu from "./Main/MainScreen.js";
import ListLoginUsersScreen from "./Users/ListLoginUsersScreen.js";

export default class LoginScreen extends Screen {
  static _login() {
    let loginFailed = true;
    let countOfTrying = 3;
    let current;
    while (loginFailed) {
      let uName = prompt("Please Enter User Name : ");
      let pass = prompt("Please Enter Password : ");

      current = User.findByPassword(uName, pass);
      if (current) loginFailed = false;

      console.log("the User Name or Password is incorrect ...");
      countOfTrying--;
      console.log("You have ", countOfTrying, " time for login !!!");

      if (countOfTrying == 0) process.exit(0);
    }

    process.currentUser = current;
    ListLoginUsersScreen.writeLogData(current);
    MainMenu.showMainMenu();
  }

  static showLogin() {
    console.clear();

    this._drawScreenHeader("Login Screen ");

    this._login();
  }
}
