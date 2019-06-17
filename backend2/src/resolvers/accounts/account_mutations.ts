import { Account } from "../../entities/Account";
import { getManager } from "typeorm";

type CreateAccountArgs = { name: string, iban: string };
const accountMutations = {
  createAccount(_: void, args: CreateAccountArgs) {
    const account = new Account();
    account.name = args.name;
    account.iban = args.iban;
    return getManager()
      .save(Account, account)
      .then(account => account)
      .catch(error => console.log(error));
  }
};

export default accountMutations;
