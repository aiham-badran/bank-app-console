export default class Person {
  constructor(firstName, lastName, email, phone) {
    this._fistName = firstName;
    this._lastName = lastName;
    this._email = email;
    this._phone = phone;
  }

  set firstName(firstName) {
    this._fistName = firstName;
  }

  get firstName() {
    return this._fistName;
  }

  set lastName(lastName) {
    this._lastName = lastName;
  }

  get lastName() {
    return this._lastName;
  }

  set email(email) {
    this._email = email;
  }

  get email() {
    return this._email;
  }

  set phone(phone) {
    this._phone = phone;
  }

  get phone() {
    return this._phone;
  }

  fullName() {
    return `${this._fistName} ${this._lastName}`;
  }
}
