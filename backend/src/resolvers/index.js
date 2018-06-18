const { Query } = require('./Query');
const { account } = require('./Mutation/account');
const { auth } = require('./Mutation/auth');
const { AuthPayload } = require('./AuthPayload');

export default {
  Query,
  Mutation: {
    ...account,
    ...auth
  },
  AuthPayload
};
