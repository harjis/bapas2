import accountQueries from './accounts/account_queries';
import userQueries from './users/user_queries';
import userMutations from './users/user_mutations';
import accountMutations from "./accounts/account_mutations";
import paymentQueries from "./payments/payment_queries";
import fileQueries from './files/file_queries';

const resolvers = {
  Query: {
    ...accountQueries,
    ...fileQueries,
    ...paymentQueries,
    ...userQueries
  },
  Mutation: {
    ...accountMutations,
    ...userMutations
  }
};

export default resolvers;
