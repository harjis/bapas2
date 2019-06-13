import { getManager } from "typeorm";

import { User } from "../../entities/User";

type Args = { id: number };
const userQueries = {
  currentUser(_: void, args: Args): Promise<User> {
    return getManager().findOneOrFail(User, args.id);
  },
  users(_: void, args: void): Promise<User[]> {
    return getManager().find(User);

  }
};

export default userQueries;
