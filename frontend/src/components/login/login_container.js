import * as React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { graphql } from 'react-apollo/index';

import Errors, { withErrors } from 'src/components/generic/errors/errors';
import Login from './login';
import { login } from 'src/utils/auth';

class LoginContainer extends React.Component {
  state = {
    email: '',
    password: ''
  };

  handleChangeEmail = event => this.setState({ email: event.target.value });
  handleChangePassword = event => this.setState({ password: event.target.value });
  handleLogin = () => {
    const { email, password } = this.state;
    this.props
      .mutate({
        variables: { email, password }
      })
      .then(response => {
        const { id, name } = response.data.login.user;
        const token = response.data.login.token;
        login(id, name, token);

        this.props.history.push('/');
      })
      .catch(error => this.props.onError([{ message: error.message }]));
  };

  render() {
    return (
      <React.Fragment>
        <Errors errors={this.props.errors} />
        <Login
          onChangeEmail={this.handleChangeEmail}
          onChangePassword={this.handleChangePassword}
          onSubmit={this.handleLogin}
        />
      </React.Fragment>
    );
  }
}

LoginContainer.propTypes = {
  errors: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  mutate: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired
};

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
      }
    }
  }
`;

export default compose(graphql(LOGIN_USER), withErrors)(LoginContainer);
