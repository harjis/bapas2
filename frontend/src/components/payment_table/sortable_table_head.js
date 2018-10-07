import * as React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';

export default class SortableTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          {this.props.headers.map(column => (
            <TableCell
              key={column.id}
              numeric={column.numeric}
              sortDirection={orderBy === column.id ? order : false}
            >
              <Tooltip
                title="Sort"
                placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                enterDelay={300}
              >
                <TableSortLabel
                  active={orderBy === column.id}
                  direction={order}
                  onClick={this.createSortHandler(column.id)}
                >
                  {column.label}
                </TableSortLabel>
              </Tooltip>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
}

SortableTableHead.propTypes = {
  headers: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired
};
