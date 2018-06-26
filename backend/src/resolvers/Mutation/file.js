const saveFile = require('../../file_upload/save_file');
const deleteFile = require('../../file_upload/delete_file');
const processFile = require('../../file_upload/process_file');
const { getUserId } = require('../../utils');

const createAccount = (ctx, info, line, userId) => {
  const iban = line.split("\t")[1];
  const promise = ctx.db.mutation.createAccount(
    {
      data: {
        name: '',
        iban,
        user: {
          connect: { id: userId }
        }
      }
    },
    info
  );
  promise.then(res => console.log(res)).catch(err => console.log(err));
};

const file = {
  addUpload: (obj, { file }) => saveFile(file),
  multipleUpload: (obj, { files }) => Promise.all(files.map(saveFile)),
  deleteUpload: (obj, { id }) => deleteFile(id),
  async processUpload(parent, { id }, ctx, info) {
    const userId = getUserId(ctx);
    processFile(id, (line, lineNumber) => {
      if (lineNumber === 1) return createAccount(ctx, info, line, userId);
    });
  }
};

module.exports = file;
