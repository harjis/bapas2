import * as React from 'react';
import PropsTypes from 'prop-types';

import Button from 'src/components/generic/button/button';

import styles from './settings.module.css';

const Settings = props => (
  <div className={styles.container}>
    <div>Register</div>
    <div className={styles.row}>
      <div>Name:</div>
      <input onChange={props.onChangeName} />
    </div>
    <div className={styles.row}>
      <Button onClick={props.onSubmit}>Submit</Button>
    </div>
  </div>
);

Settings.propTypes = {
  onChangeName: PropsTypes.func.isRequired,
  onSubmit: PropsTypes.func.isRequired
};

export default Settings;
