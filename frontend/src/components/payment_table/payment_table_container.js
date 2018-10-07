import * as React from 'react';
import { Query } from 'react-apollo/index';

import Loading from 'src/components/generic/loading/loading';
import PaymentTable from './payment_table';
import { GET_PAYMENTS } from 'src/queries/payment_queries';
import Errors from 'src/components/generic/errors/errors';

class PaymentTableContainer extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'amount',
    orderByGQL: 'amount_ASC'
  };

  handleRequestSort = (event, property) => {
    let orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    if (orderBy === 'name') {
      console.log('Ordering by related fields is not yet supported');
      orderBy = 'amount';
    }

    this.setState({ order, orderBy, orderByGQL: `${orderBy}_${order.toUpperCase()}` });
  };

  render() {
    return (
      <Query variables={{ orderBy: this.state.orderByGQL }} query={GET_PAYMENTS}>
        {({ loading, error, data }) => {
          if (loading) return <Loading />;
          if (error) return <Errors errors={error} />;
          return (
            <PaymentTable
              order={this.state.order}
              orderBy={this.state.orderBy}
              onSort={this.handleRequestSort}
              payments={data.payments}
            />
          );
        }}
      </Query>
    );
  }
}

export default PaymentTableContainer;
