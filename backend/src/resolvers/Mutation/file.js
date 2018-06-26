const saveFile = require('../../file_upload/save_file');
const deleteFile = require('../../file_upload/delete_file');
const processFile = require('../../file_upload/process_file');
const file = {
  addUpload: (obj, { file }) => saveFile(file),
  multipleUpload: (obj, { files }) => Promise.all(files.map(saveFile)),
  deleteUpload: (obj, { id }) => deleteFile(id),
  processFile: (obj, { id }) => processFile(id),
};

module.exports = file;
