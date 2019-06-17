import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Payment } from "./Payment";

@Entity("accounts")
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  iban: string;

  @ManyToOne(type => User, user => user.accounts)
  user: User;

  @OneToMany(type => Payment, payment => payment.account)
  payments: Payment[];
}
