import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const PaymentTable = props => (
  <Paper>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell numeric>Amount</TableCell>
        </TableRow>
      </TableHead>
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
  payments: PropTypes.array.isRequired
};

export default PaymentTable;
