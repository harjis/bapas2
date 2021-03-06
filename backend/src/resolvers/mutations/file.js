const saveFile = require('../../file_upload/save_file');
const deleteFile = require('../../file_upload/delete_file');
const PaymentBatchParser = require('../../parsers/payment_batch_parser');

const { getUserId } = require('../../utils');

const file = {
  addUpload: (parent, { file }, ctx, info) => {
    const userId = getUserId(ctx);
    return saveFile(ctx, info, file)
  },
  multipleUpload: (parent, { files }, ctx) => {
    const userId = getUserId(ctx);
    return Promise.all(files.map(saveFile))
  },
  deleteUpload: (parent, { id }, ctx) => {
    const userId = getUserId(ctx);
    return deleteFile(id, ctx)
  },
  async processUpload(parent, { id }, ctx, info) {
    const userId = getUserId(ctx);
    const parser = new PaymentBatchParser(ctx, id, userId);
    try {
      await parser.parse();
    } catch (e) {
      throw new Error('Parsing failed');
    }

    return ctx.db.mutation.updateFile({ where: { id }, data: { hasBeenProcessed: true } }, info);
  }
};

module.exports = file;
