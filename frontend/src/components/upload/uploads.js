import * as React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { graphql } from 'react-apollo/index';

import Button from '../generic/button/button';
import RemoveIcon from '../generic/remove/remove';
import Loading from '../generic/loading/loading';

import styles from './uploads.module.css';

const TableRow = ({ upload, onRemove }) => (
  <tr key={upload.filename}>
    <td>{upload.filename}</td>
    <td className={styles.controlButtons}>
      <Button onClick={() => {}}>Process</Button>
    </td>
    <td className={styles.controlButtons}>
      <RemoveIcon onClick={onRemove.bind(upload.id)} />
    </td>
  </tr>
);

const Uploads = props => {
  if (props.data.loading) return <Loading />;
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>Uploads</div>
      <table>
        <thead>
          <tr>
            <th>Filename</th>
            <th>Process</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {props.data.uploads.map(upload => (
            <TableRow key={upload.id} upload={upload} onRemove={props.onRemove} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

Uploads.propTypes = {
  data: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired
};

class UploadsContainer extends React.Component {
  handleRemove = () => {};
  render() {
    return <Uploads data={this.props.data} onRemove={this.handleRemove} />;
  }
}

const UPLOAD = gql`
  query {
    uploads {
      id
      filename
    }
  }
`;

export default compose(graphql(UPLOAD))(UploadsContainer);
