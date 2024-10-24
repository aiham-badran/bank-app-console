import Screen from "./Screen.js";
export default class CurrencyScreen extends Screen {
  static _printCurrency(currency) {
    console.log("Currency Card:");
    console.log("_____________________________");
    console.log("Country    : ", currency.country);
    console.log("Code       : ", currency.currencyCode);
    console.log("Name       : ", currency.currencyName);
    console.log("Rate(1$) = : ", currency.rate);

    console.log("\n_____________________________\n");
  }
}
