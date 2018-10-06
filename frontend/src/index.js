import * as React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloLink } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';

import Accounts from './components/accounts/accounts';
import ErrorBoundary from './components/generic/error_boundary/error_boundary';
import Header from './components/header/header';
import LoginContainer from './components/login/login_container';
import MainPage from './components/main_page/main_page';
import RegisterContainer from './components/register/register';
import SettingsContainer from './components/settings/settings';
import UploadContainer from './components/upload/upload_container';
import { getToken } from './utils/auth';
import { PrivateRoute } from './utils/routing';

import 'react-vis/dist/style.css';
import './index.module.css';

const uploadLink = createUploadLink({
  uri: 'http://localhost:4000'
});

const authLink = setContext((_, { headers }) => {
  const token = getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const link = ApolloLink.from([authLink, uploadLink]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <React.Fragment>
        <ErrorBoundary>
          <Header />
          <Switch>
            <PrivateRoute exact path="/" component={MainPage} />
            <PrivateRoute path="/accounts" component={Accounts} />
            <PrivateRoute path="/settings" component={SettingsContainer} />
            <PrivateRoute path="/upload" component={UploadContainer} />
            <Route path="/register" component={RegisterContainer} />
            <Route path="/login" component={LoginContainer} />
          </Switch>
        </ErrorBoundary>
      </React.Fragment>
    </Router>
  </ApolloProvider>,
  document.getElementById('app')
);
