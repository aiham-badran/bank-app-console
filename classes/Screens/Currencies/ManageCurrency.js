import { prompt } from "../../../util/global.js";
import CurrencyScreen from "../CurrencyScreen.js";
import MainScreen from "../Main/MainScreen.js";
import CalcCurrencyScreen from "./CalcCurrencyScreen.js";
import FindCurrencyScreen from "./FindCurrencyScreen.js";
import ListCurrenciesScreen from "./ListCurrencyScreen.js";
import UpdateRateScreen from "./UpdateRateScreen.js";
export default class ManageCurrency extends CurrencyScreen {
  static _LIST_CURRENCIES = 1;
  static _FIND_CURRENCY = 2;
  static _UPDATE_RATE = 3;
  static _CALC_CURRENCY = 4;
  static _BACK_MAIN_MENU = 5;

  static _showListCurrencyScreen() {
    ListCurrenciesScreen.showListCurrencies();
  }
  static _showFindCurrencyScreen() {
    FindCurrencyScreen.showFindCurrency();
  }
  static _showUpdateRateScreen() {
    UpdateRateScreen.showUpdateRate();
  }
  static _showCalcCurrencyScreen() {
    CalcCurrencyScreen.showCalcCurrency();
  }
  static _goBackCurrencyMain() {
    console.log("\n\n \tPress Enter to Back To Currency Menu ... \n");
    prompt();
    this.showManageCurrency();
  }
  static _goBackMainMenu() {
    console.clear();
    MainScreen.showMainMenu();
  }

  static _PerformCurrencyMenuOption(option) {
    console.clear();

    if (option == this._LIST_CURRENCIES) {
      this._showListCurrencyScreen();
      this._goBackCurrencyMain();
    } else if (option == this._FIND_CURRENCY) {
      this._showFindCurrencyScreen();
      this._goBackCurrencyMain();
    } else if (option == this._UPDATE_RATE) {
      this._showUpdateRateScreen();
      this._goBackCurrencyMain();
    } else if (option == this._CALC_CURRENCY) {
      this._showCalcCurrencyScreen();
      this._goBackCurrencyMain();
    } else if (option == this._BACK_MAIN_MENU) {
      this._goBackMainMenu();
    }
  }

  static showManageCurrency() {
    console.clear();
    this._drawScreenHeader("User Menu");
    console.log("Choices One Of : \n");
    console.log("[1] Show List Of Currencies \n");
    console.log("[2] Find Currency \n");
    console.log("[3] Update Rate \n");
    console.log("[4] Currency Calculator \n");
    console.log("[5] Back Main Menu \n");
    this._drawDabbleLien();
    this._PerformCurrencyMenuOption(parseInt(this._readMenuOption(5)));
  }
}
