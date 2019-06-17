import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Account } from "./Account";
import { OtherAccount } from "./OtherAccount";

@Entity("payments")
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("float")
  amount: number;

  @Column("date")
  paymentDate: Date;

  @ManyToOne(type => Account, account => account.payments)
  account: Account;

  @ManyToOne(type => OtherAccount, otherAccount => otherAccount.payments)
  otherAccount: OtherAccount;
}
