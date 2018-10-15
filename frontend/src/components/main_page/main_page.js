import * as React from 'react';

import Header from 'src/components/generic/header/header';
import PaymentsContainer from 'src/components/payments/payments_container';

import styles from './main_page.module.css';

const MainPage = () => (
  <div className={styles.container}>
    <div className={styles.containerRow}>
      <Header>Welcome!</Header>
    </div>
    <PaymentsContainer />
  </div>
);

export default MainPage;
