const { getUserId } = require('../../utils');

const UploadQueries = {
  uploads(parent, args, ctx, info) {
    getUserId(ctx);
    return ctx.db.query.files({}, info);
  },
};

module.exports = { UploadQueries };
