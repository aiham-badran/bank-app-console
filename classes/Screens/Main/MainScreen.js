import { prompt, run } from "../../../util/global.js";
import ClientScreen from "../ClientScreen.js";
import AddClientScreen from "./AddClientScreen.js";
import UpdateClientScreen from "./UpdateClientScreen.js";
import FindClient from "./FindScreen.js";
import ListClients from "./ListClientsScreen.js";
import DeleteClientScreen from "./DeleteClientScreen.js";
import TransactionScreen from "../Transactions/TransactionsScreen.js";
import ManageUsersScreen from "../Users/ManageUsersScreen.js";
import User from "../../User.js";
import UserScreen from "../UserScreen.js";
import ManageCurrency from "../Currencies/ManageCurrency.js";

export default class MainScreen extends ClientScreen {
  static #_LIST_CLIENT = 1;
  static #_ADD_CLIENT = 2;
  static #_UPDATE_CLIENT = 3;
  static #_DELETE_CLIENT = 4;
  static #_FIND_CLIENT = 5;
  static #_TRANSACTIONS_MENU = 6;
  static #_USERS_MENU = 7;
  static #_CURRENCIES_MENU = 8;
  static #_EXIT = 9;

  static #_showClientsScreen() {
    ListClients.showListClients();
  }
  static #_showAddClientScreen() {
    AddClientScreen.showAddClient();
  }
  static #_showUpdateClientScreen() {
    UpdateClientScreen.showUpdateClient();
  }
  static #_showDeleteClientScreen() {
    DeleteClientScreen.showDeleteClient();
  }
  static #_showFindClientScreen() {
    FindClient.showFindClient();
  }
  static #_showTransactionsScreen() {
    TransactionScreen.showTransactionScreen();
  }
  static #_showUsersScreen() {
    ManageUsersScreen.showMainMenu();
  }
  static #_showCurrenciesScreen() {
    ManageCurrency.showManageCurrency();
  }
  static #_logout() {
    process.currentUser = null;
    this._drawScreenHeader("Login Screen");
    run(true);
  }
  static #_goBackMainMenu() {
    console.log("\n\n \tPress Enter to Back To Main Menu ... \n");
    prompt();
    MainScreen.showMainMenu();
  }

  static #_PerformMainMenuOption(option) {
    console.clear();

    if (option == this.#_LIST_CLIENT) {
      if (this._checkAccessRights(UserScreen.P_LIST_CLIENT))
        this.#_showClientsScreen();
      this.#_goBackMainMenu();
    } else if (option == this.#_FIND_CLIENT) {
      if (this._checkAccessRights(UserScreen.P_FIND_CLIENT))
        this.#_showFindClientScreen();
      this.#_goBackMainMenu();
    } else if (option == this.#_ADD_CLIENT) {
      if (this._checkAccessRights(UserScreen.P_ADD_CLIENT))
        this.#_showAddClientScreen();
      this.#_goBackMainMenu();
    } else if (option == this.#_UPDATE_CLIENT) {
      if (this._checkAccessRights(UserScreen.P_UPDATE_CLIENT))
        this.#_showUpdateClientScreen();
      this.#_goBackMainMenu();
    } else if (option == this.#_DELETE_CLIENT) {
      if (this._checkAccessRights(UserScreen.P_DELETE_CLIENT))
        this.#_showDeleteClientScreen();
      this.#_goBackMainMenu();
    } else if (option == this.#_TRANSACTIONS_MENU) {
      if (this._checkAccessRights(UserScreen.P_TRANSACTIONS))
        this.#_showTransactionsScreen();
      else this.#_goBackMainMenu();
    } else if (option == this.#_CURRENCIES_MENU) {
      if (this._checkAccessRights(UserScreen.P_CURRENCIES_MENU))
        this.#_showCurrenciesScreen();
      else this.#_goBackMainMenu();
    } else if (option == this.#_USERS_MENU) {
      if (this._checkAccessRights(UserScreen.P_MANAGE_USERS))
        this.#_showUsersScreen();
      else this.#_goBackMainMenu();
    } else if (option == this.#_EXIT) {
      this.#_logout();
    }
  }

  static showMainMenu() {
    console.clear();
    this._drawScreenHeader("Main Menu");
    console.log("Choices One Of : \n");
    console.log("[1] Show Table Of Clients \n");
    console.log("[2] Add New Client \n");
    console.log("[3] Update Client \n");
    console.log("[4] Delete Client \n");
    console.log("[5] Find Client By Account Number \n");
    console.log("[6] Show Transactions Menu \n");
    console.log("[7] Show Users Menu \n");
    console.log("[8] Currencies Menu \n");
    console.log("[9] Logout \n");
    this._drawDabbleLien();
    this.#_PerformMainMenuOption(parseInt(this._readMenuOption(9)));
  }
}
