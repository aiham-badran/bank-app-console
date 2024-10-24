import CurrencyScreen from "../CurrencyScreen.js";
import Currency from "../../Currency.js";

export default class ListCurrenciesScreen extends CurrencyScreen {
  static _printCurrencyRow(cur) {
    return {
      Country: cur.country,
      Code: cur.currencyCode,
      Name: cur.currencyName,
      "Rate/{1$}": cur.rate,
    };
  }
  static showListCurrencies() {
    const listCountry = [];
    const currencies = Currency.getCurrenciesList();

    this._drawScreenHeader(
      "Currencies Menu",
      `Currencies List, (${currencies.length}) currencies`
    );
    currencies.forEach((cur) => listCountry.push(this._printCurrencyRow(cur)));

    console.table(listCountry, ["Country", "Code", "Name", "Rate/{1$}"]);
  }
}
