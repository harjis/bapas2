import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { Context, getUserId } from '../../utils'

export const auth = {
  async createUser(parent, args, ctx: Context, info) {
    if (args.name.length === 0 || args.email.length === 0 || args.password.length === 0) {
      throw new Error('Name, email and password can not be empty string');
    }
    const existingUser = await ctx.db.query.user({ where: { email: args.email } })
    if (existingUser) throw new Error('User for email already exists')
    const password = await bcrypt.hash(args.password, 10)
    const user = await ctx.db.mutation.createUser({
      data: { ...args, password },
    })

    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user,
    }
  },

  async updateUser(parent, { name }, ctx: Context, info) {
    const id = getUserId(ctx)
    if (name.length === 0) {
      throw new Error('Name can not be empty string');
    }

    const userExists = await ctx.db.exists.User({
      id
    });

    if (!userExists) {
      throw new Error(`User not found or you are trying to modify other user`)
    }

    return ctx.db.mutation.updateUser({ where: { id }, data: { name } }, info);
  },

  async login(parent, { email, password }, ctx: Context, info) {
    const user = await ctx.db.query.user({ where: { email } })
    if (!user) {
      throw new Error(`No such user found for email: ${email}`)
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      throw new Error('Invalid password')
    }

    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user,
    }
  },

  async deleteUser(parent, { id }, ctx: Context, info) {
    const userExists = await ctx.db.exists.User({ id })
    if (!userExists) {
      throw new Error('User not found')
    }

    return ctx.db.mutation.deleteUser({ where: { id } })
  }
}
