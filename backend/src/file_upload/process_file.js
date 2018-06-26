const readline = require('readline');
const fs = require('fs');
const { getFilePath } = require('./init');

const processFile = (id, callback) => {
  const rl = readline.createInterface({
    input: fs.createReadStream(getFilePath(id))
  });
  rl.on('line', callback);
};

module.exports = processFile;
