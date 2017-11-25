import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/header/header';
import Accounts from './components/accounts/accounts';
import Workspace from './components/workspace/workspace';

export default class App extends React.Component {
  render() {
    return (
      <Router hashType="noslash">
        <div>
          <Header />

          <Switch>
            <Route exact path="/" component={Workspace} />
            <Route path="/accounts" component={Accounts} />
          </Switch>
        </div>
      </Router>
    );
  }
}
