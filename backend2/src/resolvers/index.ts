import userQueries from './users/user_queries';
import userMutations from './users/user_mutations';

const resolvers = {
  Query: {
    ...userQueries
  },
  Mutation: {
    ...userMutations
  }
};

export default resolvers;
