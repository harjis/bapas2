import { getUserId, Context } from '../../utils';

export const account = {
  async createAccount(parent, { name, iban }, ctx: Context, info) {
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
