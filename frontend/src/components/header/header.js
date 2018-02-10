import React from 'react';
import { Link } from 'react-router-dom';

import styles from './header.css';

export default class Header extends React.Component {
  item({ label, url }) {
    return (
      <Link key={url} to={url}>
        <div className={styles.item}>{label}</div>
      </Link>
    );
  }

  render() {
    const items = [{ label: 'Icon home', url: '' }, { label: 'Accounts', url: 'accounts' }];
    return <div className={styles.container}>{items.map(this.item)}</div>;
  }
}
