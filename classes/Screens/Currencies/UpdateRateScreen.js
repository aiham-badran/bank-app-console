import CurrencyScreen from "../CurrencyScreen.js";
import { prompt } from "../../../util/global.js";
import Currency from "../../Currency.js";

export default class UpdateRateScreen extends CurrencyScreen {
  static _showResult(cur) {
    if (cur) {
      this._printCurrency(cur);
    } else {
      console.log("something is wrong try again later ... ");
    }
  }

  static showUpdateRate() {
    this._drawScreenHeader("Currency Menu", "Find Currency");
    const cur = Currency.findByCode(prompt("Places Enter code: "));
    this._showResult(cur);

    const answer = prompt(
      `Do you want to update the rate of ${cur.currencyName} ? (y/n)`
    );

    if (answer != "y" && answer != "Y") return;

    const rate = prompt("Please Enter new Rate ? ");

    if (!cur.updateRate(rate))
      console.log("the rate is wrong , must be gater than 0");
  }
}
