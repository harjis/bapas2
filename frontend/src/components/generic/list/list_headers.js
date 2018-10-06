import * as React from 'react';
import PropTypes from 'prop-types';

import styles from './list.module.css';

const ListHeaders = props => (
  <div className={styles.headerContainer}>
    {Object.values(props.headers).map((header, i) => <span key={i}>{header}</span>)}
  </div>
);

ListHeaders.propTypes = {
  headers: PropTypes.object.isRequired
};

export default ListHeaders;
