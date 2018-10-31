const { AuthError, getUserId } = require('../../utils');

const UserQueries = {
  async currentUser(parent, args, ctx, info) {
    const id = getUserId(ctx);

    const user = await ctx.db.query.user({ where: { id } }, info);
    if (!user) {
      throw new AuthError();
    }

    return ctx.db.query.user({ where: { id } }, info);
  },
  users(parent, args, ctx, info) {
    getUserId(ctx);
    return ctx.db.query.users({}, info);
  },
};

module.exports = { UserQueries };
