import * as React from 'react';
import PropTypes from 'prop-types';

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
      <RemoveIcon onClick={() => onRemove(upload.id)} />
    </td>
  </tr>
);

const Uploads = props => {
  if (props.loading) return <Loading />;
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
          {props.uploads.map(upload => (
            <TableRow key={upload.id} upload={upload} onRemove={props.onRemove} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

Uploads.propTypes = {
  loading: PropTypes.bool.isRequired,
  uploads: PropTypes.array,
  onRemove: PropTypes.func.isRequired
};

export default Uploads;
