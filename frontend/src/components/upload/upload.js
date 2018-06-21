import * as React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { graphql, Mutation } from 'react-apollo/index';

import Button from '../generic/button/button';
import Errors, { ErrorsHOC } from '../generic/errors/errors';
import Success from '../generic/success/success';
import Uploads from './uploads';

import styles from './upload.module.css';

const Upload = props => (
  <div className={styles.container}>
    <div className={styles.row}>Upload transactions</div>
    <div className={styles.row}>
      <form>
        <input type="file" onChange={props.onUpload} />
        <Button
          onClick={() => {
            console.log('do nothing for now');
          }}
        >
          Upload
        </Button>
      </form>
    </div>
  </div>
);

Upload.propTypes = {
  onUpload: PropTypes.func.isRequired
};

class UploadContainer extends React.Component {
  state = {
    updateOk: undefined
  };

  handleUpload = ({ target: { validity, files: [file] } }) =>
    validity.valid &&
    this.props
      .mutate({
        variables: { file }
      })
      .then(() => this.setState({ updateOk: true }))
      .catch(error => this.props.onError([error]));

  handleRemoveSuccess = () => this.setState({ updateOk: true });
  handleRemoveFailed = error => this.props.onError([{ message: error.message }]);

  render() {
    return (
      <React.Fragment>
        <Errors errors={this.props.errors} />
        {this.state.updateOk && <Success />}
        <Upload onUpload={this.handleUpload} />
        <Mutation
          mutation={DELETE_UPLOAD}
          onCompleted={this.handleRemoveSuccess}
          onError={this.handleRemoveFailed}
        >
          {(deleteUpload) => (
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

const SINGLE_UPLOAD = gql`
  mutation singleUpload($file: Upload!) {
    singleUpload(file: $file) {
      id
      filename
      encoding
      mimetype
      path
    }
  }
`;

const UPLOADS = gql`
  query {
    uploads {
      id
      filename
    }
  }
`;
const DELETE_UPLOAD = gql`
  mutation deleteUpload($id: ID!) {
    deleteUpload(id: $id)
  }
`;

export default compose(graphql(SINGLE_UPLOAD), graphql(UPLOADS), ErrorsHOC)(UploadContainer);
