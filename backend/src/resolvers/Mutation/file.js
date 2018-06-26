const { deleteFile, saveFile } = require('../../file_upload');
const file = {
  addUpload: (obj, { file }) => saveFile(file),
  multipleUpload: (obj, { files }) => Promise.all(files.map(saveFile)),
  deleteUpload: (obj, { id }) => deleteFile(id),
};

module.exports = file;
