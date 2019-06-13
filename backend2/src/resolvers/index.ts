import accountQueries from './accounts/account_queries';
import userQueries from './users/user_queries';
import userMutations from './users/user_mutations';

const resolvers = {
  Query: {
    ...accountQueries,
    ...userQueries
  },
  Mutation: {
    ...userMutations
  }
};

export default resolvers;
