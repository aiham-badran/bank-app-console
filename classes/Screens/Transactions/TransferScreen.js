import { prompt } from "../../../util/global.js";
import BankClient from "../../BankClient.js";
import ClientScreen from "../ClientScreen.js";
import TransferLogScreen from "./TransferLogScreen.js";

export default class TransferScreen extends ClientScreen {
  static _printClient(client) {
    return `
      Account Number : ${client.accountNumber},
      Full Name : ${client.fullName()},
      Balance : ${client.accountBalance},
    `;
  }

  static showTransfer() {
    console.clear();

    let clientFrom;

    this._drawScreenHeader("Transactions Menu", `Transfer Transaction`);

    while (true) {
      const accountNumber = this.readAccountNumber();
      clientFrom = BankClient.find(accountNumber);
      if (clientFrom) break;
    }

    console.log(this._printClient(clientFrom));

    let clientFor;

    while (true) {
      const accountNumber = this.readAccountNumber();
      clientFor = BankClient.find(accountNumber);
      if (clientFor) break;
    }

    console.log(this._printClient(clientFor));

    let amount;
    while (true) {
      amount = prompt("How Amount Do you Want to Transfer ? ");
      if (amount < clientFrom.accountBalance) break;

      console.log("You Don't Have enough Money..");
    }

    const answer = prompt("Do you want complete this transfer ? (y/n) ... ");
    if (answer != "y" && answer != "Y") return;

    const withdrawer = clientFrom.withdraw(amount);

    if (withdrawer) {
      clientFor.deposit(amount);
      TransferLogScreen.writeTransferLog(
        clientFrom.accountNumber,
        clientFor.accountNumber,
        amount
      );
      console.log("The Transfer done successfully");
    } else {
      console.log("same thing is wrong try agin later");
    }
  }
}
