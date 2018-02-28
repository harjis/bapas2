import * as React from 'react';
import { connect } from 'react-redux';

import ErrorBand from './error_band';

class ErrorBandContainer extends React.Component {
  render() {
    return <ErrorBand errors={this.props.errors} />;
  }
}

const mapStateToProps = state => ({ errors: state.errors });
export default connect(mapStateToProps)(ErrorBandContainer);
