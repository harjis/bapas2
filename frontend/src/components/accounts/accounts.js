import * as React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const Accounts = props => {
  if (props.data.loading) return 'Loading';

  return (
    <div>
      <div>Accounts</div>
      <div>{props.data.accounts.map(account => account.name)}</div>
    </div>
  );
};

export default graphql(gql`
  query AllAccounts {
    accounts {
      id
      name
      iban
    }
  }
`)(Accounts);
