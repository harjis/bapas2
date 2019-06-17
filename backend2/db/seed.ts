import { Connection, createConnection } from "typeorm";
import { User } from "../src/entities/User";
import { Account } from "../src/entities/Account";
import { OtherAccount } from "../src/entities/OtherAccount";
import { Payment } from "../src/entities/Payment";

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

  const otherAccount = new OtherAccount();
  otherAccount.name = 'Other Account';
  otherAccount.iban = 'FI 42 123345 12314';
  await connection.manager.save(otherAccount);
  console.log("Saved new otherAccount with id: " + otherAccount.id);

  const payment = new Payment();
  payment.amount = 123.12;
  payment.paymentDate = new Date();
  payment.account = account;
  payment.otherAccount = otherAccount;

  await connection.manager.save(payment);
  console.log("Saved new payment with id: " + otherAccount.id);
}
