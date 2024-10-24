import { prompt } from "../../../util/global.js";
import ClientScreen from "../ClientScreen.js";
import MainScreen from "../Main/MainScreen.js";
import WithdrawScreen from "./WithdrawScreen.js";
import TotalBalanceScreen from "./TotalBalanceScreen.js";
import DepositScreen from "./DepositScreen.js";
import TransferScreen from "./TransferScreen.js";
import TransferLogScreen from "./TransferLogScreen.js";

export default class TransactionScreen extends ClientScreen {
  static _DEPOSIT = 1;
  static _WITHDRAW = 2;
  static _TOTAL_BALLANCE = 3;
  static _TRANSFER = 4;
  static _TRANSFER_LOGS = 5;
  static _BACK_MAIN_MENU = 6;

  static _showDeposit() {
    DepositScreen.showDeposit();
  }
  static _showWithdraw() {
    WithdrawScreen.showWithdraw();
  }
  static _showTotalBalance() {
    TotalBalanceScreen.showTotalBalance();
  }

  static _showTransfer() {
    TransferScreen.showTransfer();
  }

  static _showTransferLogs() {
    TransferLogScreen.showTransferLog();
  }

  static _backMainMenu() {
    console.clear();
    MainScreen.showMainMenu();
  }

  static _goBackTransaction() {
    console.log("\n\n \tPress Enter to Back To Taransctions Menu ... \n");
    prompt();
    this.showTransactionScreen();
  }

  static _PerformTransactionOption(option) {
    console.clear();

    if (option == this._DEPOSIT) {
      this._showDeposit();
      this._goBackTransaction();
    } else if (option == this._WITHDRAW) {
      this._showWithdraw();
      this._goBackTransaction();
    } else if (option == this._TOTAL_BALLANCE) {
      this._showTotalBalance();
      this._goBackTransaction();
    } else if (option == this._TRANSFER) {
      this._showTransfer();
      this._goBackTransaction();
    } else if (option == this._TRANSFER_LOGS) {
      this._showTransferLogs();
      this._goBackTransaction();
    } else if (option == this._BACK_MAIN_MENU) {
      this._backMainMenu();
    }
  }
  static showTransactionScreen() {
    console.clear();
    this._drawScreenHeader("Main Menu");
    console.log("Choices One Of : \n");
    console.log("[1] Deposit Transaction \n");
    console.log("[2] Withdraw Transaction \n");
    console.log("[3] Show Total Balance \n");
    console.log("[4] Transfer Transaction \n");
    console.log("[5] List Of Transfers \n");
    console.log("[6] Back Main Menu \n");
    this._drawDabbleLien();
    this._PerformTransactionOption(parseInt(this._readMenuOption(6)));
  }
}
