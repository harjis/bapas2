const { Query } = require('./Query');
const { account } = require('./Mutation/account');
const { auth } = require('./Mutation/auth');
const { AuthPayload } = require('./AuthPayload');

module.exports = {
  Query,
  Mutation: {
    ...account,
    ...auth
  },
  AuthPayload
};
