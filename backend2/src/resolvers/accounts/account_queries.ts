import { createQueryBuilder, getManager } from "typeorm";

import { Account } from "../../entities/Account";

const accountQueries = {
  accounts(_: void, args: void): Promise<Account[]> {
    return createQueryBuilder(Account)
      .leftJoinAndSelect("Account.user", "user")
      .getMany();
  }
};

export default accountQueries;
