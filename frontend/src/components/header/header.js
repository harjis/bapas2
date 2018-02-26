import * as React from 'react';
import { Link } from 'react-router-dom';
import { withApollo } from 'react-apollo';

import { USER_ID, USER_TOKEN } from 'src/constants/user_constants';

import styles from './header.module.css';

const leftItems = [{ label: 'Icon home', url: '' }, { label: 'Accounts', url: 'accounts' }];
const rightItems = [{ label: 'Login', url: 'login' }, { label: 'Register', url: 'register' }];

class Header extends React.Component {
  item({ label, url }) {
    return (
      <Link key={url} to={url}>
        <div className={styles.item}>{label}</div>
      </Link>
    );
  }

  logout = () => {
    localStorage.removeItem(USER_ID);
    localStorage.removeItem(USER_TOKEN);
    this.props.client.resetStore();
  };

  render() {
    console.log(this.props.client);
    console.log(localStorage);
    const userId = localStorage.getItem(USER_ID);
    return (
      <div className={styles.container}>
        <div className={styles.leftContainer}>{leftItems.map(this.item)}</div>
        {!userId ? (
          <div className={styles.rightContainer}>{rightItems.map(this.item)}</div>
        ) : (
          <a onClick={this.logout}>
            <div className={styles.item}>Logout</div>
          </a>
        )}
      </div>
    );
  }
}

export default withApollo(Header);
