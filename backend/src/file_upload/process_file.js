const readline = require('readline');
const fs = require('fs');
const { getFilePath } = require('./init');

const processFile = (id, callback) => {
  const rl = readline.createInterface({
    input: fs.createReadStream(getFilePath(id))
  });
  let lineNumber = 1;
  rl.on('line', (line) => callback(line, lineNumber++));
};

module.exports = processFile;
