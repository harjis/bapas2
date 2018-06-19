import * as React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { graphql } from 'react-apollo/index';

import Loading from '../generic/loading/loading';

import styles from './uploads.module.css';

const TableRow = upload => (
  <tr key={upload.filename}>
    <td>{upload.filename}</td>
  </tr>
);

const Uploads = props => {
  if (props.data.loading) return <Loading />;
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>Uploads</div>
      <table>
        <thead>
          <th>Filename</th>
        </thead>
        <tbody>{props.data.uploads.map(TableRow)}</tbody>
      </table>
    </div>
  );
};

Uploads.propTypes = {
  data: PropTypes.object.isRequired
};

class UploadsContainer extends React.Component {
  render() {
    return <Uploads data={this.props.data} />;
  }
}

const UPLOAD = gql`
  query {
    uploads {
      filename
    }
  }
`;

export default compose(graphql(UPLOAD))(UploadsContainer);
