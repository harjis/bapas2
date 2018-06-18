const { getUserId } = require('../utils');

const Query = {
  accounts(parent, args, ctx, info) {
    getUserId(ctx)
    return ctx.db.query.accounts({}, info)
  },
  currentUser(parent, args, ctx, info) {
    const id = getUserId(ctx)
    return ctx.db.query.user({ where: { id } }, info)
  },
  users(parent, args, ctx, info) {
    getUserId(ctx)
    return ctx.db.query.users({}, info)
  }
};

module.exports = { Query };
