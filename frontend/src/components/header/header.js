import * as React from 'react';
import { Link } from 'react-router-dom';

import styles from './header.module.css';

const leftItems = [{ label: 'Icon home', url: '' }, { label: 'Accounts', url: 'accounts' }];
const rightItems = [{ label: 'Register', url: 'register' }];

export default class Header extends React.Component {
  item({ label, url }) {
    return (
      <Link key={url} to={url}>
        <div className={styles.item}>{label}</div>
      </Link>
    );
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.leftContainer}>{leftItems.map(this.item)}</div>
        <div>{rightItems.map(this.item)}</div>
      </div>
    );
  }
}
