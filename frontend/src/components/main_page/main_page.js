import * as React from 'react';

import Header from 'src/components/generic/header/header';
import PaymentChart from 'src/components/payment_chart/payment_chart';
import PaymentTableContainer from 'src/components/payment_table/payment_table_container';

import styles from './main_page.module.css';

const MainPage = () => (
  <div className={styles.container}>
    <div className={styles.containerRow}>
      <Header>Welcome!</Header>
    </div>
    <div className={styles.containerRow}>
      <PaymentChart />
    </div>
    <div className={styles.containerRow}>
      <PaymentTableContainer />
    </div>
  </div>
);

export default MainPage;
