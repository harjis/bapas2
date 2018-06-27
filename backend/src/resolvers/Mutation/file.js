const saveFile = require('../../file_upload/save_file');
const deleteFile = require('../../file_upload/delete_file');
const PaymentBatchParser = require('../../parsers/payment_batch_parser');

const { getUserId } = require('../../utils');

const file = {
    addUpload: (parent, { file }, ctx) => {
      const userId = getUserId(ctx);
      return saveFile(file)
    },
    multipleUpload: (parent, { files }, ctx) => {
      const userId = getUserId(ctx);
      return Promise.all(files.map(saveFile))
    },
    deleteUpload: (parent, { id }, ctx) => {
      const userId = getUserId(ctx);
      return deleteFile(id)
    },
    processUpload: (parent, { id }, ctx, info) => {
      const userId = getUserId(ctx);
      const parser = new PaymentBatchParser(ctx, id, userId);
      parser.parse();
    }
  }
;

module.exports = file;
