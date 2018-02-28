import * as React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Button from 'src/components/generic/button/button';
import { USER_ID, USER_TOKEN } from 'src/constants/user_constants';

import styles from './login.module.css';

const Login = props => (
  <div className={styles.container}>
    <div>Login</div>
    <div className={styles.row}>
      <div>Email:</div>
      <input onChange={props.onChangeEmail} />
    </div>
    <div className={styles.row}>
      <div>Password:</div>
      <input onChange={props.onChangePassword} />
    </div>
    <div className={styles.row}>
      <Button onClick={props.onSubmit}>Login</Button>
    </div>
  </div>
);

Login.propTypes = {
  onChangeEmail: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

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
        const id = response.data.login.user.id;
        const token = response.data.login.token;
        this.saveUser(id, token);

        this.props.history.push('/');
      })
      .catch(error => {
        console.log(error);
      });
  };

  saveUser(id, token) {
    localStorage.setItem(USER_ID, id);
    localStorage.setItem(USER_TOKEN, token);
  }

  render() {
    return (
      <Login
        onChangeEmail={this.handleChangeEmail}
        onChangePassword={this.handleChangePassword}
        onSubmit={this.handleLogin}
      />
    );
  }
}

LoginContainer.propTypes = {
  history: PropTypes.object.isRequired,
  mutate: PropTypes.func.isRequired
};

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }
`;

export default graphql(LOGIN_USER)(LoginContainer)
