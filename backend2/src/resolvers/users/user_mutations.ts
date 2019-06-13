import { User } from "../../entities/User";
import { getManager } from "typeorm";

type Args = { email: string, password: string, name: string };
const userMutations = {
  createUser(_: void, args: Args) {
    const user = new User();
    user.email = args.email;
    user.password = args.password;
    user.name = args.name;
    return getManager().save(User, user).then(user => ({
      token: 'some_token',
      user
    })).catch(error => console.log(error));
  }
};

export default userMutations;
