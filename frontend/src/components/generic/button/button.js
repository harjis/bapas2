import * as React from 'react';

import styles from './button.module.css';

const Button = props => (
  <div className={styles.container} onClick={props.onClick ? props.onClick : () => {}}>
    {props.children}
  </div>
);

export default Button;
