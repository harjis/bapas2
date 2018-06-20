import * as React from 'react';

import styles from './remove.module.css';
import remove from 'src/images/remove.svg';

export default props => <img className={styles.icon} src={remove} onClick={props.onClick} />;
