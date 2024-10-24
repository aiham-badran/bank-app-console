import { prompt } from "../../../util/global.js";
import BankClient from "../../BankClient.js";
import ClientScreen from "../ClientScreen.js";

export default class DeleteClientScreen extends ClientScreen {
  static showDeleteClient() {
    console.clear();

    this._drawScreenHeader("Delete Client");
    let client;

    while (true) {
      let accountNumber = this.readAccountNumber();
      client = BankClient.find(accountNumber);
      if (client) break;
    }

    console.log(this._printClient(client));
    const fullName = client.fullName();
    let answer = prompt(`\nDo you Want to Delete data for ${fullName} ? (y/n)`);

    if (answer == "y" || answer == "Y") {
      const isDEleted = client.delete();
      if (isDEleted) console.log(`The data for ${fullName} is deleted ... `);
      else
        console.log(`The data for ${fullName} is not deleted try again later`);
    }
  }
}
