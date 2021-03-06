import * as React from 'react';
import PropTypes from 'prop-types';

import Button from 'src/components/generic/button/button';

import styles from './login.module.css';

const Login = props => (
  <div className={styles.container}>
    <div>Login</div>
    <div className={styles.row}>
      <div>Email:</div>
      <input onChange={props.onChangeEmail} />
    </div>
    <div className={styles.row}>
      <div>Password:</div>
      <input onChange={props.onChangePassword} />
    </div>
    <div className={styles.row}>
      <Button onClick={props.onSubmit}>Login</Button>
    </div>
  </div>
);

Login.propTypes = {
  onChangeEmail: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default Login;
