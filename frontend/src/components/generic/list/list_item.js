import * as React from 'react';
import PropTypes from 'prop-types';

const ListItem = props => (
  <div>
    {Object.keys(props.headers).map(headerKey => (
      <span key={headerKey}>{props.item[headerKey]}</span>
    ))}
  </div>
);

ListItem.propTypes = {
  headers: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired
};

export default ListItem;
