import * as React from 'react';
import gql from 'graphql-tag';
import PropsTypes from 'prop-types';
import { graphql } from 'react-apollo';

import Button from 'src/components/generic/button/button';
import { CURRENT_USER } from '../header/header';

import styles from './settings.module.css';

const Settings = props => (
  <div className={styles.container}>
    <div>Register</div>
    <div className={styles.row}>
      <div>Name:</div>
      <input onChange={props.onChangeName} />
    </div>
    <div className={styles.row}>
      <Button onClick={props.onSubmit}>Submit</Button>
    </div>
  </div>
);

Settings.propTypes = {
  onChangeName: PropsTypes.func.isRequired,
  onSubmit: PropsTypes.func.isRequired
};

class SettingsContainer extends React.Component {
  state = {
    name: ''
  };

  handleChangeName = event => this.setState({ name: event.target.value });
  handleSubmit = () => {
    const { name } = this.state;
    this.props
      .mutate({
        variables: { name },
        refetchQueries: [
          {
            query: CURRENT_USER
          }
        ]
      })
      .then(response => {
        console.log(response);
      });
  };

  render() {
    return <Settings onChangeName={this.handleChangeName} onSubmit={this.handleSubmit} />;
  }
}

const USER_MUTATION = gql`
  mutation updateUser($name: String!) {
    updateUser(name: $name) {
      name
    }
  }
`;
export default graphql(USER_MUTATION)(SettingsContainer);
