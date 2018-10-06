import * as React from 'react';
import PropTypes from 'prop-types';

import ListItem from './list_item';
import ListHeaders from './list_headers';

import styles from './list.module.css';

const List = props => (
  <div className={styles.container}>
    <ListHeaders headers={props.headers} />
    {props.items.map(item => <ListItem key={item.id} headers={props.headers} item={item} />)}
  </div>
);

List.propTypes = {
  headers: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired
};

export default List;
