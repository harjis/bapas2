import * as React from 'react';
import PropTypes from 'prop-types';

import styles from './button.module.css';

const Button = props => (
  <div className={styles.container} onClick={props.onClick}>
    {props.children}
  </div>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.any
};

export default Button;
