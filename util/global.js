import pr from "prompt-sync";
import File from "./File.js";
import LoginScreen from "../classes/Screens/LoginScreen.js";

process.currentUser = null;

const clientFile = new File("client.txt");
const userFile = new File("user.txt");
const loginRegisterFile = new File("loginRegister.txt");
const transferLogFile = new File("transferLogs.txt");
const currenciesFile = new File("currencies.txt");

const prompt = (message = "") => {
  console.log(message);
  return pr({ sigint: true })();
};

function run(continueRun = false) {
  if (continueRun) {
    const answer = prompt("Do you Want to continue to Anther user : ");
    if (answer != "y" && answer != "Y") return;
  }

  LoginScreen.showLogin();
}

export {
  prompt,
  run,
  clientFile,
  userFile,
  loginRegisterFile,
  transferLogFile,
  currenciesFile,
};
