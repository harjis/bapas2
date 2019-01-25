import * as React from 'react';
import { compose } from 'recompose';
import { graphql } from 'react-apollo/index';

import Errors, { withErrors } from '../generic/errors/errors';
import Success from '../generic/success/success';
import Upload from './upload';
import Uploads from './uploads';
import { ADD_UPLOAD, GET_UPLOADS, DELETE_UPLOAD, PROCESS_UPLOAD } from '../../queries/uploads';

class UploadContainer extends React.Component {
  state = {
    updateOk: undefined
  };

  handleSuccess = () => this.setState({ updateOk: true });
  handleFailed = error => this.props.onError([{ message: error.message }]);

  handleAddUpload = (file, validity) => {
    validity.valid &&
      this.props
        .addUpload({
          variables: { file },
          update: (cache, { data: { addUpload } }) => {
            const { uploads } = cache.readQuery({ query: GET_UPLOADS });
            cache.writeQuery({
              query: GET_UPLOADS,
              data: { uploads: uploads.concat([addUpload]) }
            });
          }
        })
        .then(this.handleSuccess)
        .catch(this.handleFailed);
  };

  handleDelete = id => {
    this.props
      .deleteUpload({
        variables: { id },
        update: (
          cache,
          {
            data: {
              deleteUpload: { id: deletedUploadId }
            }
          }
        ) => {
          const { uploads } = cache.readQuery({ query: GET_UPLOADS });
          cache.writeQuery({
            query: GET_UPLOADS,
            data: { uploads: uploads.filter(upload => upload.id !== deletedUploadId) }
          });
        }
      })
      .then(this.handleSuccess)
      .catch(this.handleFailed);
  };

  handleProcessFile = id => {
    this.props
      .processUpload({
        variables: { id },
        update: (
          cache,
          {
            data: {
              processUpload: { id, hasBeenProcessed }
            }
          }
        ) => {
          const { uploads } = cache.readQuery({ query: GET_UPLOADS });
          cache.writeQuery({
            query: GET_UPLOADS,
            data: {
              uploads: uploads.map(upload =>
                upload.id === id ? { ...upload, hasBeenProcessed } : upload
              )
            }
          });
        }
      })
      .then(this.handleSuccess)
      .catch(this.handleFailed);
  };

  render() {
    return (
      <React.Fragment>
        <Errors errors={this.props.errors} />
        {this.state.updateOk && <Success />}
        <Upload onUpload={this.handleAddUpload} />
        <Uploads
          loading={this.props.data.loading}
          onDelete={this.handleDelete}
          onProcess={this.handleProcessFile}
          onError={this.props.onError}
          uploads={this.props.data.uploads}
        />
      </React.Fragment>
    );
  }
}

export default compose(
  graphql(ADD_UPLOAD, { name: 'addUpload' }),
  graphql(DELETE_UPLOAD, { name: 'deleteUpload' }),
  graphql(GET_UPLOADS),
  graphql(PROCESS_UPLOAD, { name: 'processUpload' }),
  withErrors
)(UploadContainer);
