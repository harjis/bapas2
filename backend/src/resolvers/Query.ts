import { getUserId, Context } from '../utils'

export const Query = {
  accounts(parent, args, ctx: Context, info) {
    getUserId(ctx)
    return ctx.db.query.accounts({})
  },
  users(parent, args, ctx: Context, info) {
    getUserId(ctx)
    return ctx.db.query.users({})
  }
}
