import * as React from 'react';

import Button from 'src/components/generic/button/button';

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
      <Button onClick={props.onClick}>Submit</Button>
    </div>
  </div>
);

class RegisterContainer extends React.Component {
  state = {
    email: '',
    name: '',
  };

  render(){
    return <Register />
  }
}

export default Register;
