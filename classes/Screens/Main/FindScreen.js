import BankClient from "../../BankClient.js";
import ClientScreen from "../ClientScreen.js";

export default class FindClient extends ClientScreen {
  static showFindClient() {
    console.clear();

    this._drawScreenHeader("Find Client");
    let client;

    while (true) {
      const accountNumber = this.readAccountNumber();
      client = BankClient.find(accountNumber);
      if (client) break;
    }

    if (client.isEmpty()) {
      console.log("The User Not Found");
      return;
    }

    console.log(this._printClient(client));
  }
}
