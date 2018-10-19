const { account } = require('./mutations/account');
const { auth } = require('./mutations/auth');
const file = require('./mutations/file');

const { AccountQueries } = require('./queries/account_queries');
const { PaymentQueries } = require('./queries/payment_queries');
const { UploadQueries } = require('./queries/upload_queries');
const { UserQueries } = require('./queries/user_queries');

module.exports = {
  Query: {
    ...AccountQueries,
    ...PaymentQueries,
    ...UploadQueries,
    ...UserQueries,
  },
  Mutation: {
    ...account,
    ...auth,
    ...file
  }
};
