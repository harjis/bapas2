import * as React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createStore } from 'redux';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Provider } from 'react-redux';

import Accounts from './components/accounts/accounts';
import ErrorBandContainer from 'src/components/generic/error_band/error_band_container';
import Header from './components/header/header';
import LoginContainer from './components/login/login_container';
import RegisterContainer from './components/register/register';
import Workspace from './components/workspace/workspace';
import rootReducer from 'src/reducers';

const httpLink = new HttpLink({ uri: 'http://localhost:4000' });

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Header />
          <ErrorBandContainer />
          <Switch>
            <Route exact path="/" component={Workspace} />
            <Route path="/accounts" component={Accounts} />
            <Route path="/register" component={RegisterContainer} />
            <Route path="/login" component={LoginContainer} />
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  </Provider>,
  document.getElementById('app')
);
