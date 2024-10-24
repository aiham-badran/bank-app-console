import { transferLogFile } from "../../../util/global.js";
import ClientScreen from "../ClientScreen.js";

export default class TransferLogScreen extends ClientScreen {
  static _printClient(client) {
    return {
      "Account Number": client.accountNumber,
      Balance: client.accountBalance,
    };
  }

  static writeTransferLog(fromAccount, toAccount, amount, separator = "#//#") {
    let lineData = new Date().toISOString() + separator;
    lineData += fromAccount + separator;
    lineData += toAccount + separator;
    lineData += amount;
    transferLogFile.append(lineData);
  }

  static _getTransferLogs(separator = "#//#") {
    const data = transferLogFile.read();

    const logs = data.map((d) => {
      const logData = d.split(separator);

      return {
        "transfer date": logData[0],
        "from account number": logData[1],
        "to account number": logData[2],
        amount: logData[3],
      };
    });

    return logs;
  }

  static showTransferLog() {
    console.clear();
    const listTransfers = this._getTransferLogs();
    const listLength = listTransfers.length;

    if (listLength < 1) {
      this._drawScreenHeader("List Of Transfers");
      console.log("\n\n\t\t\t No Data to View ! ...");
      this._drawDabbleLien();
      return;
    }

    this._drawScreenHeader("List Of Transfers", `(${listLength}) time(s)`);

    console.table(listTransfers, [
      "transfer date",
      "from account number",
      "to account number",
      "amount",
    ]);
  }
}
