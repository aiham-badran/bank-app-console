import BankClient from "../../BankClient.js";
import ClientScreen from "../ClientScreen.js";

export default class TotalBalanceScreen extends ClientScreen {
  static _printClient(client) {
    return {
      "Account Number": client.accountNumber,
      "Full Name": client.fullName(),
      Balance: client.accountBalance,
    };
  }

  static showTotalBalance() {
    console.clear();

    const clients = BankClient.getClientsList();
    const clientsLength = clients.length;

    if (clientsLength < 1) {
      this._drawScreenHeader("Client List");
      console.log("\n\n\t\t\t No Clients to View ! ...");
      this._drawDabbleLien();
      return;
    }

    this._drawScreenHeader(
      "Transactions Menu",
      `Total Balance for (${clientsLength}) Client(s) `
    );

    const arr = [];
    clients.forEach((client) => {
      arr.push(this._printClient(client, true));
    });

    console.table(arr, ["Account Number", "Full Name", "Balance"]);

    console.log("The Total Balance is :", BankClient.getTotalBalances());
  }
}
