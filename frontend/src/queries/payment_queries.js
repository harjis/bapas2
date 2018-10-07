import gql from 'graphql-tag';

export const GET_PAYMENTS = gql`
  query Payments($orderBy: PaymentOrderByInput) {
    payments(orderBy: $orderBy) {
      id
      amount
      paymentDate
      otherAccount {
        id
        name
      }
    }
  }
`;
