import { Connection, createConnection } from "typeorm";
import { User } from "../src/entities/User";

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
}
