import * as React from 'react';

import Button from 'components/generic/button/button';

import styles from './register.module.css';

const Register = props => (
  <div className={styles.container}>
    <div>Register</div>
    <div className={styles.row}>
      <div>Email:</div>
      <input />
    </div>
    <div className={styles.row}>
      <div>Name:</div>
      <input />
    </div>

    <div className={styles.row}>
      <Button>Submit</Button>
    </div>
  </div>
);

export default Register;
