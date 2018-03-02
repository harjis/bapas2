import * as React from 'react';
import { connect } from 'react-redux';

import Errors from './errors';

class ErrorsContainer extends React.Component {
  render() {
    return <Errors errors={this.props.errors} />;
  }
}

const mapStateToProps = state => ({ errors: state.errors });
export default connect(mapStateToProps)(ErrorsContainer);
