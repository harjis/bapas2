const { AccountQueries } = require('./queries/account_queries');
const { PaymentQueries } = require('./queries/payment_queries');
const { UploadQueries } = require('./queries/upload_queries');
const { UserQueries } = require('./queries/user_queries');

const Query = {
  ...AccountQueries,
  ...PaymentQueries,
  ...UploadQueries,
  ...UserQueries,
};

module.exports = { Query };
