import * as React from 'react';
import gql from 'graphql-tag';
import PropsTypes from 'prop-types';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';

import Button from 'src/components/generic/button/button';
import Errors, { ErrorsHOC } from 'src/components/generic/errors/errors';
import Success from 'src/components/generic/success/success';
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
    name: '',
    updateSucceeded: false
  };

  handleChangeName = event => this.setState({ name: event.target.value });
  handleSubmit = () => {
    this.setState({ updateSucceeded: false });
    this.props.onClearErrors();
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
      .then(() => this.setState({ updateSucceeded: true }))
      .catch(error => this.props.onError([error]));
  };

  render() {
    return (
      <React.Fragment>
        <Errors errors={this.props.errors} />
        {this.state.updateSucceeded && <Success />}
        <Settings onChangeName={this.handleChangeName} onSubmit={this.handleSubmit} />
      </React.Fragment>
    );
  }
}

SettingsContainer.propTypes = {
  errors: PropsTypes.array.isRequired,
  onError: PropsTypes.func.isRequired,
  onClearErrors: PropsTypes.func.isRequired
};

const USER_MUTATION = gql`
  mutation updateUser($name: String!) {
    updateUser(name: $name) {
      name
    }
  }
`;
export default compose(graphql(USER_MUTATION), ErrorsHOC)(SettingsContainer);
