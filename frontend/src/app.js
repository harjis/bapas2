import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import Header from './components/header/header';

export default class App extends React.Component {
  render() {
    return (
      <Router hashType="noslash">
        <div>
          <Header />

          <Route exact path="" />
          <Route path="calendar" />
          <Route path="accounts" />
        </div>
      </Router>
    );
  }
}
