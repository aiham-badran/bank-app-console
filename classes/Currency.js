import { currenciesFile } from "../util/global.js";

export default class Currency {
  static _EMPTY_MODE = 0;
  static _UPDATE_MODE = 1;

  _mode;
  _country;
  _currencyCode;
  _currencyName;
  _rate;

  constructor(mode, country, currencyCode, currencyName, rate) {
    this._mode = mode;
    this._country = country;
    this._currencyCode = currencyCode;
    this._currencyName = currencyName;
    this._rate = rate;
  }

  get country() {
    return this._country;
  }

  get currencyCode() {
    return this._currencyCode;
  }

  get currencyName() {
    return this._currencyName;
  }

  get rate() {
    return this._rate;
  }

  static _convertCurrenciesLineToObj(line, separator = "#//#") {
    const data = line.trim().split(separator);
    return new Currency(
      Currency._UPDATE_MODE,
      data[0],
      data[1],
      data[2],
      data[3]
    );
  }

  static _convertCurrenciesObjToLine(cur, separator = "#//#") {
    let line = "";
    line += cur.country + separator;
    line += cur.currencyCode + separator;
    line += cur.currencyName + separator;
    line += cur.rate;

    return line;
  }

  static _loadCurrenciesDateFromFile() {
    let currenciesToObj;
    const currencies = currenciesFile.read();
    return currencies.map((cur) => this._convertCurrenciesLineToObj(cur));
  }
  static _saveCurrencyDataToFile(currencies) {
    let data = currencies.map((cur) => this._convertCurrenciesObjToLine(cur));
    currenciesFile.write(data.join("\n"));
  }

  _update() {
    const currencies = Currency._loadCurrenciesDateFromFile();
    for (let cur in currencies) {
      if (currencies[cur].currencyCode == this.currencyCode) {
        currencies[cur] = this;
        break;
      }
    }

    Currency._saveCurrencyDataToFile(currencies);
  }

  updateRate(rate) {
    if (rate < 0) return false;
    this._rate = rate;
    this._update();

    return true;
  }

  IsEmpty() {
    return this._mode == Currency._EMPTY_MODE;
  }

  static findByCode(code) {
    const currencies = this._loadCurrenciesDateFromFile();
    for (let cur in currencies) {
      if (currencies[cur].currencyCode.toLowerCase() == code.toLowerCase()) {
        return currencies[cur];
      }
    }

    return null;
  }

  static findByCountry(country) {
    const currencies = this._loadCurrenciesDateFromFile();
    for (let cur in currencies) {
      if (currencies[cur].country.toLowerCase() == country.toLowerCase()) {
        return currencies[cur];
      }
    }

    return null;
  }

  static isCurrencyExist(code) {
    const cur = this.findByCode(code);
    if (cur) return true;

    return false;
  }

  static getCurrenciesList() {
    return this._loadCurrenciesDateFromFile();
  }

  static exchangeRateFromUSD(code, amount) {
    const cur = this.findByCode(code);
    if (cur) return parseFloat(cur.rate) * parseFloat(amount);

    return -1;
  }
  static exchangeRateToUSD(code, amount) {
    const cur = this.findByCode(code);
    if (cur) return parseFloat(amount) / parseFloat(cur.rate);

    return -1;
  }
}
