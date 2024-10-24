import { prompt } from "../../../util/global.js";
import MainScreen from "../Main/MainScreen.js";
import UserScreen from "../UserScreen.js";
import AddUserScreen from "./AddUserScreen.js";
import FindUserScreen from "./FindUserScreen.js";
import ListLoginUsersScreen from "./ListLoginUsersScreen.js";
import ListUsersScreen from "./ListUsersScreen.js";
import UpdateUserScreen from "./UpdateUserScreen.js";
import DeleteUserScreen from "./DeleteUserScreen.js";

export default class ManageUsersScreen extends UserScreen {
  static _LIST_USER = 1;
  static _ADD_USER = 2;
  static _UPDATE_USER = 3;
  static _DELETE_USER = 4;
  static _FIND_USER = 5;
  static _REGISTER_LOG_LIST = 6;
  static _BACK_MAIN_MENU = 7;

  static _showUsersScreen() {
    ListUsersScreen.showListUsers();
  }
  static _showAddUserScreen() {
    AddUserScreen.showAddUser();
  }
  static _showUpdateUserScreen() {
    UpdateUserScreen.showUpdateUser();
  }
  static _showDeleteUserScreen() {
    DeleteUserScreen.showDeleteUser();
  }
  static _showFindUserScreen() {
    FindUserScreen.showFindUser();
  }

  static _showLogInUserListScreen() {
    ListLoginUsersScreen.showListLoginUsers();
  }

  static _goBackUserMain() {
    console.log("\n\n \tPress Enter to Back To User Menu ... \n");
    prompt();
    this.showMainMenu();
  }

  static _goBackMainMenu() {
    console.clear();
    MainScreen.showMainMenu();
  }

  static _PerformUserMenuOption(option) {
    console.clear();

    if (option == this._LIST_USER) {
      this._showUsersScreen();
      this._goBackUserMain();
    } else if (option == this._FIND_USER) {
      this._showFindUserScreen();
      this._goBackUserMain();
    } else if (option == this._ADD_USER) {
      this._showAddUserScreen();
      this._goBackUserMain();
    } else if (option == this._UPDATE_USER) {
      this._showUpdateUserScreen();
      this._goBackUserMain();
    } else if (option == this._DELETE_USER) {
      this._showDeleteUserScreen();
      this._goBackUserMain();
    } else if (option == this._REGISTER_LOG_LIST) {
      this._showLogInUserListScreen();
      this._goBackUserMain();
    } else if (option == this._BACK_MAIN_MENU) {
      this._goBackMainMenu();
    }
  }

  static showMainMenu() {
    console.clear();
    this._drawScreenHeader("User Menu");
    console.log("Choices One Of : \n");
    console.log("[1] Show Table Of Users \n");
    console.log("[2] Add New User \n");
    console.log("[3] Update User \n");
    console.log("[4] Delete User \n");
    console.log("[5] Find User By User Name \n");
    console.log("[6] List Of Login Users  \n");
    console.log("[7] Back Main Menu \n");
    this._drawDabbleLien();
    this._PerformUserMenuOption(parseInt(this._readMenuOption(7)));
  }
}
