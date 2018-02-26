import * as React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Button from 'src/components/generic/button/button';

import styles from './register.module.css';

const Register = props => (
  <div className={styles.container}>
    <div>Register</div>
    <div className={styles.row}>
      <div>Name:</div>
      <input onChange={props.onSetName} />
    </div>
    <div className={styles.row}>
      <div>Email:</div>
      <input onChange={props.onSetEmail} />
    </div>
    <div className={styles.row}>
      <div>Password:</div>
      <input type="password" onChange={props.onSetPassword} />
    </div>
    <div className={styles.row}>
      <Button onClick={props.onSubmit}>Submit</Button>
    </div>
  </div>
);

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
    if (this.state.email.length === 0 || this.state.name.length === 0) {
      // handle error
      return;
    }

    const { email, name, password } = this.state;
    this.props
      .mutate({
        variables: { email, name, password }
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <Register
        onSetEmail={this.handleSetEmail}
        onSetName={this.handleSetName}
        onSetPassword={this.handleSetPassword}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

const CREATE_USER_MUTATION = gql`
  mutation signup($email: String!, $name: String!, $password: String!) {
    signup(email: $email, name: $name, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

export default graphql(CREATE_USER_MUTATION)(RegisterContainer);
