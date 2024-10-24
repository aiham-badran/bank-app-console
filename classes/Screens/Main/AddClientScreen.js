import BankClient from "../../BankClient.js";
import ClientScreen from "../ClientScreen.js";

export default class AddClientScreen extends ClientScreen {
  static showAddClient() {
    console.clear();

    this._drawScreenHeader("Add New Client");
    let accountNumber;

    while (true) {
      accountNumber = this.readAccountNumber();
      if (!BankClient.isClientExit(accountNumber)) break;
    }

    const client = BankClient.getAddNewUserObject(accountNumber);

    this._readClientInfo(client);
    const result = client.save();

    console.log(result);

    if (result == BankClient.SV_SUCCEEDED) {
      console.log(this._printClient(client));
    } else if (result == BankClient.SV_FAILED_ACCOUNT_EXIST) {
      console.log("The Client is exist , check for data ...!");
    } else if (result == BankClient.SV_FAILED_EMPTY) {
      console.log("you can not register empty client , check for data ...!");
    }
  }
}
