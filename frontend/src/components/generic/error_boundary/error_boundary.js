import * as React from 'react';

import { withRouter } from 'react-router';

const initialState = {
  hasError: false,
  route: null
};
class ErrorBoundary extends React.Component {
  state = initialState;

  componentWillReceiveProps() {
    const newRoute = this.props.history.location.pathname;
    if (this.state.route !== newRoute) {
      this.setState(initialState);
    }
  }

  componentDidCatch(error, info) {
    const route = this.props.history.location.pathname;
    this.setState({ hasError: true, route });
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

export default withRouter(ErrorBoundary);
