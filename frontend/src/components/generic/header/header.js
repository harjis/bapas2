import * as React from 'react';

import styles from './header.module.css';

const Header = props => <div className={styles.container}>{props.children}</div>;

export default Header;
