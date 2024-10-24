import { prompt } from "../../../util/global.js";
import BankClient from "../../BankClient.js";
import ClientScreen from "../ClientScreen.js";

export default class UpdateClientScreen extends ClientScreen {
  static showUpdateClient() {
    console.clear();

    this._drawScreenHeader("Update Client");
    let client;

    while (true) {
      let accountNumber = this.readAccountNumber();
      client = BankClient.find(accountNumber);
      if (client) break;
    }

    console.log(this._printClient(client));

    let answer = prompt(
      `\nDo you Want to update data for ${client.fullName()} ? (y/n)`
    );

    if (answer == "y" || answer == "Y") {
      this._readClientInfo(client);
      const result = client.save();

      if (result == BankClient.SV_SUCCEEDED) {
        console.log(this._printClient(client));
      } else if (result == BankClient.SV_FAILED_ACCOUNT_EXIST) {
        console.log("The Client is exist , check for data ...!");
      } else if (result == BankClient.SV_FAILED_EMPTY) {
        console.log("you can not register empty client , check for data ...!");
      }
    }
  }
}
