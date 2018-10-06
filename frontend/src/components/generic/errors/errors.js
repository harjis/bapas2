import * as React from 'react';
import PropTypes from 'prop-types';

import styles from './errors.module.css';

const showError = error => <li key={error.message}>{error.message}</li>;
const Errors = props => {
  if (props.errors.length === 0) return null;
  return <ul className={styles.container}>{props.errors.map(showError)}</ul>;
};

Errors.propTypes = {
  errors: PropTypes.array.isRequired
};

export function withErrors(WrappedComponent) {
  return class extends React.Component {
    state = {
      errors: []
    };

    handleOnError = errors => this.setState({ errors });
    handleClearErrors = () => this.setState({ errors: [] });

    render() {
      return (
        <WrappedComponent
          {...this.props}
          errors={this.state.errors}
          onError={this.handleOnError}
          onClearErrors={this.handleClearErrors}
        />
      );
    }
  };
}

export function withErrorLogging(WrappedComponent) {
  return class extends React.Component {
    render() {
      if (this.props.data.error) {
        console.log(this.props.data.error.graphQLErrors, this.props.data.error.networkError);
      }
      return <WrappedComponent {...this.props} />;
    }
  };
}

export default Errors;
