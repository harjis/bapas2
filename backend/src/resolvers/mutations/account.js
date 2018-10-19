const { getUserId } = require('../../utils');

const account = {
  async createAccount(parent, { name, iban }, ctx, info) {
    const userId = getUserId(ctx);
    return ctx.db.mutation.createAccount(
      {
        data: {
          name,
          iban,
          user: {
            connect: { id: userId }
          }
        }
      },
      info
    );
  }
};

module.exports = { account };
