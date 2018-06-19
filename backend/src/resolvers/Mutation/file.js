const { processUpload } = require('../../file_upload');
const file = {
  singleUpload: (obj, { file }) => processUpload(file),
  multipleUpload: (obj, { files }) => Promise.all(files.map(processUpload)),
};

module.exports = file;
