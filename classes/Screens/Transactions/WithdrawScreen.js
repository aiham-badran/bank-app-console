import { prompt } from "../../../util/global.js";
import BankClient from "../../BankClient.js";
import ClientScreen from "../ClientScreen.js";

export default class WithdrawScreen extends ClientScreen {
  static showWithdraw() {
    console.clear();
    let client;

    this._drawScreenHeader("Transactions Menu", "Withdraw Transaction");

    while (true) {
      let accountNumber = this.readAccountNumber();
      client = BankClient.find(accountNumber);
      if (client) break;
    }

    console.log(this._printClient(client));

    const amount = prompt("\nAdd Amount to Withdraw ..");

    const answer = prompt(
      `\nDo you want to Withdraw this ${amount} from your account ?(y/n)`
    );

    if (answer == "y" || answer == "Y") {
      const isWithdraw = client.withdraw(parseFloat(amount));
      if (isWithdraw) {
        console.log(isWithdraw, "The Withdraw is successfully");
      } else {
        console.log(isWithdraw, "Not Enough Amount ..");
      }
    }
  }
}
