import { readFileSync, writeFileSync, appendFileSync } from "node:fs";
import { join } from "path";

export default class File {
  constructor(name, path = "./store") {
    this.name = name;
    this.path = path;
    this.file = join(process.cwd(), path, name);
  }

  read() {
    let data;
    try {
      const res = readFileSync(this.file, "utf-8");
      data = res.trim("\n").split("\n");
    } catch (err) {
      data = [];
    }

    return data;
  }

  append(content) {
    try {
      appendFileSync(this.file, `${content}\n`, {
        flags: "a",
        encoding: "utf-8",
      });
      return true;
    } catch (err) {
      return false;
    }
  }

  write(content) {
    try {
      writeFileSync(this.file, `${content}`, {
        encoding: "utf-8",
      });
      return true;
    } catch (err) {
      return false;
    }
  }
}
