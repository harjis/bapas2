import * as React from 'react';
import { Query } from 'react-apollo/index';

import Errors from 'src/components/generic/errors/errors';
import Loading from 'src/components/generic/loading/loading';
import PaymentChart from 'src/components/payments/payment_chart/payment_chart';
import PaymentControls from './payment_controls/payment_controls';
import PaymentTable from 'src/components/payments/payment_table/payment_table';
import { GET_PAYMENT_DATES, GET_PAYMENTS } from 'src/queries/payment_queries';

import styles from '../main_page/main_page.module.css';

export default class PaymentsContainer extends React.Component {
  state = {
    month: 5,
    order: 'asc',
    orderBy: 'amount',
    orderByGQL: 'amount_ASC',
    year: 2016
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
      <React.Fragment>
        <Query query={GET_PAYMENT_DATES}>
          {({ loading: loadingDates, error: errorDates, data: dataDates }) => (
            <Query
              variables={{
                orderBy: this.state.orderByGQL,
                where: { paymentDate: `${this.state.year}-${this.state.month}` }
              }}
              query={GET_PAYMENTS}
            >
              {({ loading: loadingPayments, error: errorPayments, data: dataPayments }) => {
                if (loadingDates || loadingPayments) return <Loading />;

                if (errorDates) return <Errors errors={error} />;
                if (errorPayments) return <Errors errors={errorPayments} />;


                const monthsByYear = getMonthsByYear(dataDates.payments);
                const year = Object.keys(monthsByYear)[0];
                return (
                  <React.Fragment>
                    <div className={styles.containerRow}>
                      <PaymentControls
                        month={this.state.month}
                        monthsByYear={monthsByYear}
                        onSelectMonth={month => this.setState({ month })}
                        onSelectYear={year => this.setState({ year })}
                        year={this.state.year}
                      />
                    </div>
                    <div className={styles.containerRow}>
                      <PaymentChart />
                    </div>
                    <div className={styles.containerRow}>
                      <PaymentTable
                        order={this.state.order}
                        orderBy={this.state.orderBy}
                        onSort={this.handleRequestSort}
                        payments={dataPayments.payments}
                      />
                    </div>
                  </React.Fragment>
                );
              }}
            </Query>
          )}
        </Query>
      </React.Fragment>
    );
  }
}

// TODO Seriously. There does not seem to be way to get distinct values
const getMonthsByYear = dates =>
  dates.reduce((acc, cur) => {
    const date = new Date(cur.paymentDate);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    if (!acc[year]) {
      return {
        ...acc,
        [year]: [month]
      };
    }
    return {
      ...acc,
      [year]: [...new Set(acc[year].concat(month))]
    };
  }, {});
