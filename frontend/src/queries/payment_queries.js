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

export const GET_PAYMENT_DATES = gql`
  query paymentDates {
    payments {
      paymentDate
    }
  }
`;
