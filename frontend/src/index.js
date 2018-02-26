import * as React from 'react';
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

import Accounts from './components/accounts/accounts';
import Header from './components/header/header';
import RegisterContainer from './components/register/register';
import Workspace from './components/workspace/workspace';

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Workspace} />
          <Route path="/accounts" component={Accounts} />
          <Route path="/register" component={RegisterContainer} />
        </Switch>
      </div>
    </Router>
  </ApolloProvider>,
  document.getElementById('app')
);
