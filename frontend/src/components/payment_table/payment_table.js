import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import SortableTableHead from './sortable_table_head';

const headers = [
  { id: 'name', numeric: false, label: 'Name' },
  { id: 'amount', numeric: true, label: 'Amount' }
];

const PaymentTable = props => (
  <Paper>
    <Table>
      <SortableTableHead
        headers={headers}
        orderBy={props.orderBy}
        order={props.order}
        onSort={props.onSort}
      />
      <TableBody>
        {props.payments.map(row => (
          <TableRow key={row.id}>
            <TableCell component="th" scope="row">
              {row.otherAccount.name}
            </TableCell>
            <TableCell numeric>{row.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
);

PaymentTable.propTypes = {
  onSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  payments: PropTypes.array.isRequired
};

export default PaymentTable;
