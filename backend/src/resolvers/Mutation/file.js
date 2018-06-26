const saveFile = require('../../file_upload/save_file');
const deleteFile = require('../../file_upload/delete_file');
const processFile = require('../../file_upload/process_file');
const { getUserId } = require('../../utils');

const createOrUseExistingAccount = async (ctx, line, userId) => {
  const iban = line.split("\t")[1];
  const account = await ctx.db.query.account({ where: { iban } })
  if (account) return account;
  return await ctx.db.mutation.createAccount(
    {
      data: {
        iban,
        user: {
          connect: { id: userId }
        }
      }
    }
  );
};

const file = {
  addUpload: (obj, { file }) => saveFile(file),
  multipleUpload: (obj, { files }) => Promise.all(files.map(saveFile)),
  deleteUpload: (obj, { id }) => deleteFile(id),
  async processUpload(parent, { id }, ctx, info) {
    const userId = getUserId(ctx);
    let account;
    processFile(id, (line, lineNumber) => {
      if (lineNumber === 1) account = createOrUseExistingAccount(ctx, line, userId);
    });
  }
};

module.exports = file;
