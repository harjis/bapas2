import { getManager } from "typeorm";

import { User } from "../../entities/User";

const userQueries = {
  users(_: void, args: void): Promise<User[]> {
    return getManager().find(User);

  }
};

export default userQueries;
