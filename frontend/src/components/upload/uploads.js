import * as React from 'react';
import PropTypes from 'prop-types';

import Button from '../generic/button/button';
import RemoveIcon from '../generic/remove/remove';
import Loading from '../generic/loading/loading';

import styles from './uploads.module.css';

const TableRow = ({ upload, onProcess, onDelete }) => (
  <tr key={upload.filename}>
    <td>{upload.filename}</td>
    <td className={styles.controlButtons}>
      <Button onClick={() => onProcess(upload.id)}>Process</Button>
    </td>
    <td className={styles.controlButtons}>
      <RemoveIcon onClick={() => onDelete(upload.id)} />
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
            <TableRow
              key={upload.id}
              upload={upload}
              onDelete={props.onDelete}
              onProcess={props.onProcess}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

Uploads.propTypes = {
  loading: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onProcess: PropTypes.func.isRequired,
  uploads: PropTypes.array
};

export default Uploads;
