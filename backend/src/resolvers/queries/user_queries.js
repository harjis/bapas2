const { getUserId } = require('../../utils');

const UserQueries = {
  currentUser(parent, args, ctx, info) {
    const id = getUserId(ctx);
    return ctx.db.query.user({ where: { id } }, info);
  },
  users(parent, args, ctx, info) {
    getUserId(ctx);
    return ctx.db.query.users({}, info);
  },
};

module.exports = { UserQueries };
