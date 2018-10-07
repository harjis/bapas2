import * as React from 'react';

import Header from 'src/components/generic/header/header';
import PaymentChart from 'src/components/payment_chart/payment_chart';
import PaymentTable from 'src/components/payment_table/payment_table';

import styles from './main_page.module.css';

const rows = [{ id: 1, name: 'S-market', amount: 1 }, { id: 2, name: 'K-kauppa', amount: 2 }];

const MainPage = () => (
  <div className={styles.container}>
    <div className={styles.containerRow}>
      <Header>Welcome!</Header>
    </div>
    <div className={styles.containerRow}>
      <PaymentChart />
    </div>
    <div className={styles.containerRow}>
      <PaymentTable rows={rows} />
    </div>
  </div>
);

export default MainPage;
