import * as React from 'react';
import gql from 'graphql-tag';
import PropsTypes from 'prop-types';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';

import Button from 'src/components/generic/button/button';
import { login } from 'src/utils/auth';

import styles from './register.module.css';
import Errors, { withErrors } from 'src/components/generic/errors/errors';

const Register = props => (
  <div className={styles.container}>
    <div>Register</div>
    <div className={styles.row}>
      <div>Name:</div>
      <input onChange={props.onChangeName} />
    </div>
    <div className={styles.row}>
      <div>Email:</div>
      <input onChange={props.onChangeEmail} />
    </div>
    <div className={styles.row}>
      <div>Password:</div>
      <input type="password" onChange={props.onChangePassword} />
    </div>
    <div className={styles.row}>
      <Button onClick={props.onSubmit}>Submit</Button>
    </div>
  </div>
);

Register.propTypes = {
  onChangeName: PropsTypes.func.isRequired,
  onChangeEmail: PropsTypes.func.isRequired,
  onChangePassword: PropsTypes.func.isRequired,
  onSubmit: PropsTypes.func.isRequired
};

class RegisterContainer extends React.Component {
  state = {
    email: '',
    name: '',
    password: ''
  };

  handleSetName = event => this.setState({ name: event.target.value });
  handleSetEmail = event => this.setState({ email: event.target.value });
  handleSetPassword = event => this.setState({ password: event.target.value });
  handleSubmit = () => {
    const { email, name, password } = this.state;
    this.props
      .mutate({
        variables: { email, name, password }
      })
      .then(response => {
        const { id, name } = response.data.createUser.user;
        const token = response.data.createUser.token;
        login(id, name, token);
        this.props.history.push('/');
      })
      .catch(error => {
        this.props.onError([{ message: error.message }]);
      });
  };

  render() {
    return (
      <React.Fragment>
        <Errors errors={this.props.errors} />
        <Register
          onChangeEmail={this.handleSetEmail}
          onChangeName={this.handleSetName}
          onChangePassword={this.handleSetPassword}
          onSubmit={this.handleSubmit}
        />
      </React.Fragment>
    );
  }
}

RegisterContainer.propTypes = {
  errors: PropsTypes.array.isRequired,
  onError: PropsTypes.func.isRequired
};

const CREATE_USER_MUTATION = gql`
  mutation createUser($email: String!, $name: String!, $password: String!) {
    createUser(email: $email, name: $name, password: $password) {
      token
      user {
        id
      }
    }
  }
`;

export default compose(graphql(CREATE_USER_MUTATION), withErrors)(RegisterContainer);
