import * as React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import Accounts from './components/accounts/accounts';
import Header from './components/header/header';
import LoginContainer from './components/login/login_container';
import RegisterContainer from './components/register/register';
import Workspace from './components/workspace/workspace';
import { PrivateRoute } from './utils/routing';

import './index.module.css';

const httpLink = new HttpLink({ uri: 'http://localhost:4000' });

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <div>
        <Header />
        <Switch>
          <PrivateRoute exact path="/" component={Workspace} />
          <PrivateRoute path="/accounts" component={Accounts} />
          <Route path="/register" component={RegisterContainer} />
          <Route path="/login" component={LoginContainer} />
        </Switch>
      </div>
    </Router>
  </ApolloProvider>,
  document.getElementById('app')
);
