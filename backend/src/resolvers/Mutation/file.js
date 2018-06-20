const { deleteFile, saveFile } = require('../../file_upload');
const file = {
  singleUpload: (obj, { file }) => saveFile(file),
  multipleUpload: (obj, { files }) => Promise.all(files.map(saveFile)),
  deleteUpload: (obj, { id }) => deleteFile(id),
};

module.exports = file;
