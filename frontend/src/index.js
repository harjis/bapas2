import * as React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createUploadLink } from 'apollo-upload-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { setContext } from 'apollo-link-context';

import Accounts from './components/accounts/accounts';
import CurrentUser from 'src/components/current_user/current_user';
import ErrorBoundary from './components/generic/error_boundary/error_boundary';
import Header from './components/header/header';
import LoginContainer from './components/login/login_container';
import MainPage from './components/main_page/main_page';
import RegisterContainer from './components/register/register';
import SettingsContainer from './components/settings/settings';
import UploadContainer from './components/upload/upload_container';
import { getToken, logout } from './utils/auth';
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

const resetToken = onError(({ graphQLErrors, operation }) => {
  // This is pretty horrible
  console.log(operation);
  if (graphQLErrors && graphQLErrors.some(error => error.message === 'Not authorized')) {
    logout();
  }
});
const authFlowLink = authLink.concat(resetToken);

const link = ApolloLink.from([authFlowLink, uploadLink]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <React.Fragment>
        <ErrorBoundary>
          <CurrentUser>
            {currentUser => (
              <React.Fragment>
                <Header currentUser={currentUser} />
                <Switch>
                  <PrivateRoute currentUser={currentUser} exact path="/" component={MainPage} />
                  <PrivateRoute currentUser={currentUser} path="/accounts" component={Accounts} />
                  <PrivateRoute
                    currentUser={currentUser}
                    path="/settings"
                    component={SettingsContainer}
                  />
                  <PrivateRoute
                    currentUser={currentUser}
                    path="/upload"
                    component={UploadContainer}
                  />
                  <Route path="/register" component={RegisterContainer} />
                  <Route path="/login" component={LoginContainer} />
                </Switch>
              </React.Fragment>
            )}
          </CurrentUser>
        </ErrorBoundary>
      </React.Fragment>
    </Router>
  </ApolloProvider>,
  document.getElementById('app')
);
