import { createQueryBuilder } from "typeorm";
import { Payment } from "../../entities/Payment";

const paymentQueries = {
  payments(_: void, args: void) {
    return createQueryBuilder(Payment)
      .leftJoinAndSelect("Payment.account", "account")
      .leftJoinAndSelect("Payment.otherAccount", "otherAccount")
      .getMany();
  }
};

export default paymentQueries;
