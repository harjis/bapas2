const processFile = require('../file_upload/process_file');

const SEPARATOR = "\t";

class PaymentBatchParser {
  constructor(ctx, fileId, userId) {
    this.ctx = ctx;
    this.fileId = fileId;
    this.userId = userId;
    this.account = null;
    this.headers = [];
  }

  parse() {
    processFile(this.fileId, (line, lineNumber) => {
      if (lineNumber === 1) {
        this.account = this.createOrUseExistingAccount(line, this.userId);
      } else if (lineNumber === 2) {
        //noop for empty line
      } else if (lineNumber === 3) {
        this.headers = line.split(SEPARATOR).map(header => header.toLowerCase());
      } else {
        this.createPayment(line);
      }
    });
  }

  async createOrUseExistingAccount(line, userId) {
    const iban = line.split(SEPARATOR)[1];
    const account = await this.ctx.db.query.account({ where: { iban } })
    if (account) return account;
    return await this.ctx.db.mutation.createAccount(
      {
        data: {
          iban,
          user: {
            connect: { id: userId }
          }
        }
      }
    );
  }

  async createPayment(line) {
    if (line.trim().length === 0) return;
    const payment = line.split(SEPARATOR).reduce((acc, cur, i) => {
      return {
        ...acc,
        [this.headers[i]]: cur
      };
    }, {});

    return await this.ctx.db.mutation.createPayment(
      {
        data: {
          amount: payment['määrä'],
          payment_date: payment['maksupäivä'],
          account: {
            connect: { id: this.account.id }
          }
        }
      }
    );
  }
}

module.exports = PaymentBatchParser;
