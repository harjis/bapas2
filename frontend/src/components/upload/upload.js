import * as React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { graphql } from 'react-apollo/index';

import Button from '../generic/button/button';

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
  handleUpload = ({ target: { validity, files: [file] } }) =>
    validity.valid &&
    this.props.mutate({
      variables: { file },
      update: (proxy, { data: { singleUpload } }) => {
        const data = proxy.readQuery({ query: uploadsQuery });
        data.uploads.push(singleUpload);
        proxy.writeQuery({ query: uploadsQuery, data });
      }
    });

  render() {
    return <Upload onUpload={this.handleUpload} />;
  }
}

const UPLOAD = gql`
  mutation($file: Upload!) {
    singleUpload(file: $file) {
      id
      filename
      encoding
      mimetype
      path
    }
  }
`;

export default graphql(UPLOAD)(UploadContainer);
