import * as React from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo/index';
import gql from 'graphql-tag';

import Loading from 'src/components/generic/loading/loading';
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

  get leftSideItems() {
    if (isLoggedIn()) {
      return <div className={styles.leftItems}>{leftItems.map(this.item)}</div>;
    } else {
      // Maybe not that nice: Empty div needs to be returned so that login/logout stays right aligned
      return <div />;
    }
  }

  get rightSideItems() {
    if (isLoggedIn()) {
      const SettingsComponent = this.props.data.loading ? (
        <Loading />
      ) : (
        <div className={styles.item}>{this.props.data.currentUser.name}</div>
      );
      return (
        <div className={styles.rightItems}>
          <Link key={'settings'} to={'/settings'}>
            {SettingsComponent}
          </Link>
          <Link onClick={this.logout} key={'logout'} to={'/'}>
            <div className={styles.item}>Logout</div>
          </Link>
        </div>
      );
    } else {
      return <div className={styles.rightItems}>{rightItems.map(this.item)}</div>;
    }
  }

  render() {
    return (
      <div className={styles.container}>
        {this.leftSideItems}
        {this.rightSideItems}
      </div>
    );
  }
}

const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      name
    }
  }
`;

export default graphql(CURRENT_USER)(Header);
