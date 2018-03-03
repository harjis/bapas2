import * as React from 'react';
import { Link } from 'react-router-dom';
import { withApollo } from 'react-apollo';

import { isLoggedIn, logout } from 'src/utils/auth';

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
    logout();
    this.props.client.resetStore();
  };

  render() {
    return (
      <div className={styles.container}>
        {isLoggedIn() ? (
          <div className={styles.leftItems}>{leftItems.map(this.item)}</div>
        ) : (
          // Maybe not that nice: Empty div needs to be returned so that login/logout stays right aligned
          <div />
        )}
        {!isLoggedIn() ? (
          <div className={styles.rightItems}>{rightItems.map(this.item)}</div>
        ) : (
          <Link onClick={this.logout} key={'logout'} to={'/'}>
            <div className={styles.item}>Logout</div>
          </Link>
        )}
      </div>
    );
  }
}

export default withApollo(Header);
