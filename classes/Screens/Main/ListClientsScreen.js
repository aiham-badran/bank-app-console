import BankClient from "../../BankClient.js";
import ClientScreen from "../ClientScreen.js";

export default class ListClients extends ClientScreen {
  static showListClients() {
    console.clear();
    const clients = BankClient.getClientsList();
    const clientsLength = clients.length;

    if (clientsLength < 1) {
      this._drawScreenHeader("Client List");
      console.log("\n\n\t\t\t No Clients to View ! ...");
      this._drawDabbleLien();
      return;
    }

    this._drawScreenHeader("Client List", `(${clientsLength}) Client(s)`);

    const arr = [];
    clients.forEach((client) => {
      arr.push(this._printClient(client, true));
    });

    console.table(arr, [
      "Account Number",
      "Full Name",
      "Email",
      "Phone",
      "Balance",
    ]);
  }
}
