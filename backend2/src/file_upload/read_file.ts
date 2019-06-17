import fs from "fs";
import { getFilePath } from "./get_file_path";

export const readFile = id => {
  return fs
    .readFileSync(getFilePath(id), "utf-8")
    .trim()
    .split("\n")
    .filter(line => {
      return line !== "\r";
    });
};
