import React from 'react';
import { Link } from 'react-router-dom';

import './header.css';

export default class Header extends React.Component {
  item({ label, url }) {
    return (
      <Link key={url} to={url}>
        <div styleName="item">{label}</div>
      </Link>
    );
  }

  render() {
    const items = [
      { label: 'Icon home', url: '' },
      { label: 'Calendar', url: 'calendar' },
      { label: 'Accounts', url: 'accounts' }
    ];
    return <div styleName="container">{items.map(this.item)}</div>;
  }
}
