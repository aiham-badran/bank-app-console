import Person from "./Person.js";
import { clientFile } from "../util/global.js";

export default class BankClient extends Person {
  #_accountNumber;
  #_accountBalance;
  #_pinCode;

  #_mode;
  #_markedForDelete = false;

  static #_EMPTY_MODE = 0;
  static #_UPDATE_MODE = 1;
  static #_ADD_MODE = 2;

  static SV_FAILED_EMPTY = 0;
  static SV_SUCCEEDED = 1;
  static SV_FAILED_ACCOUNT_EXIST = 2;

  constructor(
    mode,
    accountNumber = "",
    pinCode = "",
    accountBalance = 0,
    firstName = "",
    lastName = "",
    email = "",
    phone = ""
  ) {
    super(firstName, lastName, email, phone);
    this.#_mode = mode;
    this.#_accountNumber = accountNumber;
    this.#_accountBalance = accountBalance;
    this.#_pinCode = pinCode;
  }

  get accountNumber() {
    return this.#_accountNumber;
  }

  get accountBalance() {
    return parseFloat(this.#_accountBalance);
  }
  set accountBalance(value) {
    this.#_accountBalance = parseFloat(value);
  }

  get pinCode() {
    return this.#_pinCode;
  }
  set pinCode(value) {
    this.#_pinCode = value;
  }

  get markedForDelete() {
    return this.#_markedForDelete;
  }

  #_update() {
    let clients = BankClient.#_loadClientsDataFromFile();
    clients = clients.map((client) => {
      if (client.accountNumber == this.accountNumber) {
        return this;
      }

      return client;
    });

    BankClient.#_saveClientsToFile(clients);
  }

  #_addDataLineToFile(line) {
    clientFile.append(line);
  }

  #_addNew() {
    this.#_addDataLineToFile(BankClient.#_convertClientObjToLine(this));
  }

  static #_convertLineToBankClientObject(line, separator = "#//#") {
    const client = line.split(separator);
    return new BankClient(
      this.#_UPDATE_MODE,
      client[0],
      client[1],
      client[2],
      client[3],
      client[4],
      client[5],
      client[6]
    );
  }

  static #_convertClientObjToLine(client, separator = "#//#") {
    let line = "";
    line += client.accountNumber + separator;
    line += client.pinCode + separator;
    line += client.accountBalance + separator;
    line += client.firstName + separator;
    line += client.lastName + separator;
    line += client.email + separator;
    line += client.phone;

    return line;
  }

  static #_loadClientsDataFromFile() {
    const clients = clientFile.read();
    return clients.map((client) =>
      this.#_convertLineToBankClientObject(client)
    );
  }

  static #_getEmptyClientObj() {
    return new BankClient(this.#_EMPTY_MODE);
  }

  static #_saveClientsToFile(clients) {
    const lines = [];

    for (let client of clients) {
      if (client.markedForDelete) continue;
      lines.push(this.#_convertClientObjToLine(client));
    }
    const line = lines.join("\n");
    clientFile.write(line);
  }

  static find(accountNumber) {
    let clientObj = null;

    const clients = this.#_loadClientsDataFromFile();
    clients.forEach((client) => {
      if (client.accountNumber == accountNumber) {
        clientObj = client;
        return;
      }
    });
    return clientObj;
  }

  static findByPin(accountNumber, pinCode) {
    let clientObj = this.find(accountNumber);

    if (clientObj?.pinCode == pinCode) return clientObj;

    return null;
  }

  static isClientExit(accountNumber) {
    return this.find(accountNumber) !== null;
  }

  static getAddNewUserObject(accountNumber) {
    return new BankClient(BankClient.#_ADD_MODE, accountNumber);
  }

  static getClientsList() {
    return BankClient.#_loadClientsDataFromFile();
  }

  static getTotalBalances() {
    let total = 0;
    const clients = this.#_loadClientsDataFromFile();

    clients.forEach((client) => (total += parseFloat(client.accountBalance)));

    return total;
  }

  isEmpty() {
    return this.#_mode == BankClient.#_EMPTY_MODE;
  }

  save() {
    switch (this.#_mode) {
      case BankClient.#_EMPTY_MODE:
        return BankClient.SV_FAILED_EMPTY;
      case BankClient.#_UPDATE_MODE: {
        this.#_update();
        return BankClient.SV_SUCCEEDED;
      }
      case BankClient.#_ADD_MODE: {
        if (!BankClient.isClientExit(this.accountNumber)) {
          this.#_addNew();
          this.#_mode = BankClient.#_UPDATE_MODE;
          return BankClient.SV_SUCCEEDED;
        } else {
          return BankClient.SV_FAILED_ACCOUNT_EXIST;
        }
      }
    }

    return BankClient.SV_FAILED_EMPTY;
  }

  delete() {
    const clients = BankClient.#_loadClientsDataFromFile();
    for (let client of clients) {
      if (client.accountNumber == this.accountNumber) {
        client.#_markedForDelete = true;
        break;
      }
    }

    BankClient.#_saveClientsToFile(clients);

    delete this;
    // this = BankClient.#_getEmptyClientObj();
    return true;
  }

  deposit(amount) {
    this.accountBalance += parseFloat(amount);
    this.save();
  }

  withdraw(amount) {
    amount = parseFloat(amount);
    if (this.accountBalance > amount) {
      this.accountBalance -= amount;
      this.save();

      return true;
    }

    return false;
  }
}
