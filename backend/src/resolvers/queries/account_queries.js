const { getUserId } = require('../../utils');

const AccountQueries = {
  accounts(parent, args, ctx, info) {
    getUserId(ctx);
    return ctx.db.query.accounts({}, info);
  },
};

module.exports = { AccountQueries };
