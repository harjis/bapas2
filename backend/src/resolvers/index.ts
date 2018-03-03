import { Query } from './Query';
import { account } from './Mutation/account';
import { auth } from './Mutation/auth';
import { AuthPayload } from './AuthPayload';

export default {
  Query,
  Mutation: {
    ...account,
    ...auth
  },
  AuthPayload
};
