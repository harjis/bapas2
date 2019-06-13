import userQueries from './users/user_queries';

const resolvers = {
  Query: {
    ...userQueries
  }
};

export default resolvers;
