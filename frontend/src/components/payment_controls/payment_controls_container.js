import * as React from 'react';
import { Query } from 'react-apollo/index';

import Errors from 'src/components/generic/errors/errors';
import Loading from 'src/components/generic/loading/loading';
import PaymentControls from './payment_controls';
import { GET_PAYMENT_DATES } from '../../queries/payment_queries';

export default class PaymentControlsContainer extends React.Component {
  render() {
    return (
      <Query query={GET_PAYMENT_DATES}>
        {({ loading, error, data }) => {
          if (loading) return <Loading />;
          if (error) return <Errors errors={error} />;
          const monthsByYear = getMonthsByYear(data.payments);
          const year = Object.keys(monthsByYear)[0];
          return (
            <PaymentControls
              month={monthsByYear[year][0]}
              monthsByYear={monthsByYear}
              onSelectMonth={() => {}}
              onSelectYear={() => {}}
              year={year}
            />
          );
        }}
      </Query>
    );
  }
}

// TODO Seriously. There does not seem to be way to get distinct values
const getMonthsByYear = dates =>
  dates.reduce((acc, cur) => {
    const date = new Date(cur.paymentDate);
    if (!acc[date.getFullYear()]) {
      return {
        ...acc,
        [date.getFullYear()]: [date.getMonth()]
      };
    }
    return {
      ...acc,
      [date.getFullYear()]: [...new Set(acc[date.getFullYear()].concat(date.getMonth()))]
    };
  }, {});
