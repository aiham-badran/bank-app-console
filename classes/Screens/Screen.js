import { prompt } from "../../util/global.js";

export default class Screen {
  static _drawSingleLien(repeat = 60) {
    console.log("_".repeat(repeat));
  }

  static _drawDabbleLien(repeat = 60) {
    console.log("=".repeat(repeat));
  }
  static _drawScreenHeader(title, subTitle = "") {
    this._drawSingleLien();
    console.log("\n\t\t\t", title);
    if (subTitle) console.log("\n\t\t\t", subTitle);

    if (process.currentUser != null)
      console.log("\n\t\t\tUser : ", process.currentUser.fullName());
    console.log("\t\t\tDate : ", new Date().toISOString());

    this._drawSingleLien();
  }

  static _readMenuOption(maxOption = 1) {
    while (true) {
      let option = prompt(
        `Please Enter Number Between 1 and ${maxOption.toString()} # `
      );

      if (option >= 1 && option <= maxOption) return option;

      console.log("Your choses is out of Options Please Try Agin ... \n");
    }
  }

  static _checkAccessRights(permission) {
    if (process.currentUser.checkAccessPermission(permission)) return true;

    console.log("You Do not have an permission to access here ...");
    return false;
  }
}
