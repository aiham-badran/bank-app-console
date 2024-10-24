import { prompt } from "../../../util/global.js";
import BankClient from "../../BankClient.js";
import ClientScreen from "../ClientScreen.js";

export default class DepositScreen extends ClientScreen {
  static showDeposit() {
    console.clear();
    let client;

    this._drawScreenHeader("Transactions Menu", "Deposit Transaction");

    while (true) {
      let accountNumber = this.readAccountNumber();
      client = BankClient.find(accountNumber);
      if (client) break;
    }

    console.log(this._printClient(client));

    const amount = prompt("\nAdd Amount to Deposit ..");

    const answer = prompt(
      `\nDo you want to Deposit this ${amount} from your account ?(y/n)`
    );

    if (answer == "y" || answer == "Y") {
      client.deposit(parseFloat(amount));
      console.log("The Withdraw is successfully");
    }
  }
}
