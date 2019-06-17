import { User } from "../../entities/User";
import { getManager } from "typeorm";

type CreateUserArgs = { email: string, password: string, name: string };
type UpdateUserArgs = { id: number, name: string };
type DeleteUserArgs = { id: number };
const userMutations = {
  createUser(_: void, args: CreateUserArgs) {
    const user = new User();
    user.email = args.email;
    user.password = args.password;
    user.name = args.name;
    return getManager().save(User, user).then(user => ({
      token: 'some_token',
      user
    })).catch(error => console.log(error));
  },
  async updateUser(_: void, args: UpdateUserArgs) {
    const user = await getManager().findOneOrFail(User, args.id);
    user.name = args.name;
    await getManager().update(User, args.id, user);
    return user;
  },
  deleteUser(_: void, args: DeleteUserArgs) {
    return getManager().delete(User, args.id).then(result => ({
      count: result.affected
    }));
  }
};

export default userMutations;
