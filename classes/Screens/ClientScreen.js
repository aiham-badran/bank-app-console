import { prompt } from "../../util/global.js";
import Screen from "./Screen.js";

export default class ClientScreen extends Screen {
  static _printClient(client, row = false) {
    if (row) {
      return {
        "Account Number": client.accountNumber,
        "Full Name": client.fullName(),
        Email: client.email,
        Phone: client.phone,
        Balance: client.accountBalance,
      };
      // return `${client.accountNumber} ${client.fullName()} ${client.email} ${
      //   client.phone
      // } ${client.accountBalance}`;
    } else {
      return `
        Account Number : ${client.accountNumber} \n
        Full Name : ${client.fullName()}\n 
        Email : ${client.email}\n
        Pheon : ${client.phone}\n
        Balance : ${client.accountBalance}`;
    }
  }

  static _readClientInfo(client) {
    console.log("Please Enter Client Info : \n");

    client.firstName = prompt("First Name : # ");
    client.lastName = prompt("Last Name : # ");
    client.email = prompt("Email : # ");
    client.phone = prompt("Phone :  # ");
    client.pinCode = prompt("Pin Code :  # ");
    client.accountBalance = prompt("Balance : # ");
  }

  static readAccountNumber() {
    return prompt("Enter Account Number : ");
  }
}
