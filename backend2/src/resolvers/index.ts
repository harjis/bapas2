import accountQueries from './accounts/account_queries';
import userQueries from './users/user_queries';
import userMutations from './users/user_mutations';
import accountMutations from "./accounts/account_mutations";
import paymentQueries from "./payments/payment_queries";

const resolvers = {
  Query: {
    ...accountQueries,
    ...paymentQueries,
    ...userQueries
  },
  Mutation: {
    ...accountMutations,
    ...userMutations
  }
};

export default resolvers;
