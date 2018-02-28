import * as React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo/index';

import Login from './login';
import { addErrors } from 'src/actions/error_actions';
import { USER_ID, USER_TOKEN } from 'src/constants/user_constants';

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
      .catch(error => this.props.onError([{ message: error.message }]));
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
  mutate: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired
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

const mapDispatchToProps = dispatch => {
  return {
    onError: errors => {
      dispatch(addErrors(errors));
    }
  };
};

const _LoginContainer = graphql(LOGIN_USER)(LoginContainer);
export default connect(null, mapDispatchToProps)(_LoginContainer);
