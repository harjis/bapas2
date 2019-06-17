import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Payment } from "./Payment";

@Entity("other_accounts")
export class OtherAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  iban: string;

  @OneToMany(type => Payment, payment => payment.otherAccount)
  payments: Payment[];
}
