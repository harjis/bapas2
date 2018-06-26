import * as React from 'react';
import { compose } from 'recompose';
import { graphql, Mutation } from 'react-apollo/index';

import Errors, { ErrorsHOC } from '../generic/errors/errors';
import Success from '../generic/success/success';
import Upload from './upload';
import Uploads from './uploads';
import { ADD_UPLOAD, GET_UPLOADS, DELETE_UPLOAD } from '../../queries/uploads';

class UploadContainer extends React.Component {
  state = {
    updateOk: undefined
  };

  handleSuccess = () => this.setState({ updateOk: true });
  handleFailed = error => this.props.onError([{ message: error.message }]);

  render() {
    return (
      <React.Fragment>
        <Errors errors={this.props.errors} />
        {this.state.updateOk && <Success />}
        <Mutation
          mutation={ADD_UPLOAD}
          onCompleted={this.handleSuccess}
          onError={this.handleFailed}
        >
          {singleUpload => <Upload onUpload={singleUpload} />}
        </Mutation>
        <Mutation
          mutation={DELETE_UPLOAD}
          onCompleted={this.handleSuccess}
          onError={this.handleFailed}
        >
          {deleteUpload => (
            <Uploads
              loading={this.props.data.loading}
              onError={this.props.onError}
              onRemove={deleteUpload}
              uploads={this.props.data.uploads}
            />
          )}
        </Mutation>
      </React.Fragment>
    );
  }
}

export default compose(graphql(GET_UPLOADS), ErrorsHOC)(UploadContainer);