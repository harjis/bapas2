import * as React from 'react';
import PropTypes from 'prop-types';

import styles from './error_band.module.css';

const showError = error => <li key={error.message}>{error.message}</li>;
const ErrorBand = props => <ul className={styles.container}>{props.errors.map(showError)}</ul>;

ErrorBand.propTypes = {
  errors: PropTypes.array.isRequired
};

export default ErrorBand;
