const { getUserId } = require('../../utils');

const PaymentQueries = {
  payments(parent, args, ctx, info) {
    getUserId(ctx);
    return ctx.db.query.payments({}, info);
  }
};

module.exports = { PaymentQueries };
