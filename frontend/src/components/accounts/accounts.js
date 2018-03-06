import * as React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Loading from 'src/components/generic/loading/loading';

import styles from './accounts.module.css';

const TableRow = account => (
  <tr key={account.iban}>
    <td>{account.name}</td>
    <td>{account.iban}</td>
  </tr>
);
const Accounts = props => {
  if (props.data.loading) return <Loading />;

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>Accounts</div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>IBAN</th>
            </tr>
          </thead>
          <tbody>{props.data.accounts.map(TableRow)}</tbody>
        </table>
      </div>
    </div>
  );
};

Accounts.propTypes = {
  data: PropTypes.object.isRequired
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
