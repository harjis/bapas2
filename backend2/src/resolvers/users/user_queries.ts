import { createConnection } from "typeorm";

import { User } from "../../entities/User";

const userQueries = {
  async users(_: void, args: void): Promise<User[]> {
    return createConnection().then(async connection => {
      console.log('wat');
      const users = await connection.manager.find(User);
      console.log(users);
      return users;
    });
  }
};

export default userQueries;
