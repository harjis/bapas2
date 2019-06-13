import { Connection, createConnection } from "typeorm";
import { User } from "../src/entities/User";
import { Account } from "../src/entities/Account";

createConnection().then(async connection => {
  createUser(connection);
}).catch(error => console.log(error));

async function createUser(connection: Connection) {
  console.log("Inserting a new user into the database...");
  const user = new User();
  user.email = "example@example.com";
  user.password = "example";
  user.name = "Example";
  await connection.manager.save(user);
  console.log("Saved a new user with id: " + user.id);

  console.log("Inserting a new account into the database...");
  const account = new Account();
  account.name = 'Account';
  account.iban = 'FI42 131500 102102';
  account.user = user;

  await connection.manager.save(account);
  console.log("Saved a new account with id: " + account.id);
}
