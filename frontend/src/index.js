import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = new HttpLink({ uri: 'http://localhost:4000' });

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

import Header from './components/header/header';
import Accounts from './components/accounts/accounts';
import Workspace from './components/workspace/workspace';

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Workspace} />
          <Route path="/accounts" component={Accounts} />
        </Switch>
      </div>
    </Router>
  </ApolloProvider>,
  document.getElementById('app')
);
