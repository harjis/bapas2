const { getUserId } = require('../../utils');

const { db } = require('../../file_upload/init');

const UploadQueries = {
  uploads(parent, args, ctx) {
    getUserId(ctx);
    return db.get('uploads').value();
  },
};

module.exports = { UploadQueries };
