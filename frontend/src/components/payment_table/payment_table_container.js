import * as React from 'react';
import { compose } from 'recompose';
import { graphql } from 'react-apollo/index';

import Loading from 'src/components/generic/loading/loading';
import PaymentTable from './payment_table';
import { GET_PAYMENTS } from 'src/queries/payment_queries';
import { withErrorLogging } from 'src/components/generic/errors/errors';

class PaymentTableContainer extends React.Component {
  render() {
    if (this.props.data.loading) return <Loading />;
    return <PaymentTable payments={this.props.data.payments} />;
  }
}

export default compose(graphql(GET_PAYMENTS), withErrorLogging)(PaymentTableContainer);
