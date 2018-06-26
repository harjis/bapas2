import * as React from 'react';
import PropTypes from 'prop-types';

import Button from '../generic/button/button';

import styles from './upload.module.css';

const Upload = props => (
  <div className={styles.container}>
    <div className={styles.row}>Upload transactions</div>
    <div className={styles.row}>
      <form>
        <input
          type="file"
          onChange={({ target: { validity, files: [file] } }) =>
            validity.valid &&
            props.onUpload({
              variables: { file }
            })
          }
        />
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

export default Upload;
