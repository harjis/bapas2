import gql from 'graphql-tag';

export const GET_ACCOUNTS = gql`
  query AllAccounts {
    accounts {
      name
      iban
    }
  }
`;
