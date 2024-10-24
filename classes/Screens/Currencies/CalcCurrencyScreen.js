import { prompt } from "../../../util/global.js";
import Currency from "../../Currency.js";
import CurrencyScreen from "../CurrencyScreen.js";

export default class CalcCurrencyScreen extends CurrencyScreen {
  static _printExchangeToUSD() {
    let code = prompt("Enter the code for Currency :");
    let cur = Currency.findByCode(code);
    this._printCurrency(cur);

    let exc = Currency.exchangeRateToUSD(
      code,
      prompt(`Please Enter the amount of ${cur.currencyCode} : `)
    );

    console.log(`${cur.currencyCode} -> USD ==> ${exc}`);
  }

  static _printExchangeFromUSD() {
    let code = prompt("Enter the code for Currency :");
    let cur = Currency.findByCode(code);
    this._printCurrency(cur);

    let exc = Currency.exchangeRateFromUSD(
      code,
      prompt("Please Enter the amount of USD: ")
    );

    console.log(`USD -> ${cur.currencyCode} ==> ${exc}`);
  }
  static _printExchangeTwoCurrencies() {
    let code_1 = prompt("Enter the code for first Currency  :");
    let cur_1 = Currency.findByCode(code_1);
    this._printCurrency(cur_1);

    let code_2 = prompt("Enter the code for Currency to Exchange  :");
    let cur_2 = Currency.findByCode(code_2);
    this._printCurrency(cur_2);

    const amount = prompt("Please Enter the amount : ");

    let exc_1 = Currency.exchangeRateToUSD(code_1, amount);

    let exc_2 = Currency.exchangeRateFromUSD(code_2, exc_1);

    console.log(`${cur_1.currencyCode} -> ${cur_2.currencyCode} ==> ${exc_2}`);
  }

  static showCalcCurrency() {
    this._drawScreenHeader("Currencies Menu", "Calculator Currencies");
    const exchange = prompt(
      "For [1] Exchange To USD, [2] Exchange From USD, [3] author Exchange ?  "
    );

    if (exchange == "1") this._printExchangeToUSD();
    else if (exchange == "2") this._printExchangeFromUSD();
    else if (exchange == "3") this._printExchangeTwoCurrencies();
    else console.log("something is wrong please try again later ");
  }
}
