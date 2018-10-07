import gql from 'graphql-tag';

export const GET_PAYMENTS = gql`
  query {
    payments {
      id,
      amount,
      paymentDate,
      otherAccount {
        id,
        name
      }
    }
  }
`;
