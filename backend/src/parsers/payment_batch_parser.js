const processFile = require("../file_upload/process_file");
const runInSequence = require("../utils/sequence");

const SEPARATOR = "\t";

class PaymentBatchParser {
  constructor(ctx, fileId, userId) {
    this.ctx = ctx;
    this.fileId = fileId;
    this.userId = userId;
  }

  parse() {
    let account = null;
    let headers = null;
    const lines = processFile(this.fileId).map(
      (line, lineNumber) => previousPromise => {
        if (lineNumber === 0) {
          const iban = line.split(SEPARATOR)[1];
          return this.createOrUseExistingAccount(iban, this.userId);
        } else if (lineNumber === 1) {
          if (!account) account = previousPromise;
          return Promise.resolve(
            line.split(SEPARATOR).map(header => header.toLowerCase())
          );
        } else {
          if (!headers) headers = previousPromise;
          return this.createPayment(headers, account, line);
        }
      }
    );

    return runInSequence(lines);
  }

  async createOrUseExistingAccount(iban, userId = null) {
    const account = await this.ctx.db.query.account({ where: { iban } });
    if (account) return account;
    return await this.ctx.db.mutation.createAccount({
      data: {
        iban,
        user: {
          connect: { id: userId }
        }
      }
    });
  }

  async createOrUseExistingOtherAccount(iban, name) {
    const otherAccountsByIban = await this.ctx.db.query.otherAccounts({
      where: { iban }
    });
    if (otherAccountsByIban.length > 0) return otherAccountsByIban[0];
    const otherAccountsByName = await this.ctx.db.query.otherAccounts({
      where: { name }
    });
    if (otherAccountsByName.length > 0) return otherAccountsByName[0];

    return await this.ctx.db.mutation.createOtherAccount({
      data: {
        iban,
        name
      }
    });
  }

  async createPayment(headers, account, line) {
    const payment = line.split(SEPARATOR).reduce((acc, cur, i) => {
      return {
        ...acc,
        [headers[i]]: cur
      };
    }, {});
    const promise = this.createOrUseExistingOtherAccount(
      payment["tilinumero"],
      payment["saaja/maksaja"]
    );
    return promise.then(otherAccount => {
      const paymentDate = payment["maksupäivä"]
        .split(".")
        .reverse()
        .reduce((acc, cur) => acc + "-" + cur, "")
        .slice(1);
      return this.ctx.db.mutation.createPayment({
        data: {
          amount: parseFloat(payment["määrä"].replace(",", ".")),
          paymentDate,
          usersAccount: {
            connect: { id: account.id }
          },
          otherAccount: {
            connect: { id: otherAccount.id }
          }
        }
      });
    });
  }
}

module.exports = PaymentBatchParser;
