import { getUserId, Context } from '../utils'

export const Query = {
  accounts(parent, args, ctx: Context, info) {
    getUserId(ctx)
    return ctx.db.query.accounts({}, info)
  },
  currentUser(parent, args, ctx: Context, info) {
    const id = getUserId(ctx)
    return ctx.db.query.user({ where: { id } }, info)
  },
  users(parent, args, ctx: Context, info) {
    getUserId(ctx)
    return ctx.db.query.users({}, info)
  }
}
