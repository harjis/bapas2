const fs = require("fs");
const { getFilePath } = require("./init");

const processFile = id => {
  return fs
    .readFileSync(getFilePath(id), "utf-8")
    .trim()
    .split("\n")
    .filter(line => {
      return line !== "\r";
    });
};

module.exports = processFile;
