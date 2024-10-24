import { prompt } from "../../../util/global.js";
import CurrencyScreen from "../CurrencyScreen.js";
import Currency from "../../Currency.js";

export default class FindCurrencyScreen extends CurrencyScreen {
  static _showResult(cur) {
    if (cur) {
      this._printCurrency(cur);
    } else {
      console.log("something is wrong try again later ... ");
    }
  }
  static _findByCode() {
    this._showResult(Currency.findByCode(prompt("Places Enter code: ")));
  }
  static _findByCountry() {
    this._showResult(Currency.findByCountry(prompt("Places Enter country: ")));
  }

  static showFindCurrency() {
    this._drawScreenHeader("Currency Menu", "Find Currency");

    const findBy = prompt("Find By : [1] code or [2] country: ? ");
    if (findBy == "1") {
      this._findByCode();
    } else if (findBy == "2") {
      this._findByCountry();
    } else {
      console.log("something is wrong try again later ... ");
      return;
    }
  }
}
