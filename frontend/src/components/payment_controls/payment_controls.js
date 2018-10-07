import * as React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import styles from './payment_controls.module.css';

const PaymentControls = props => (
  <div className={styles.container}>
    <FormControl className={props.classes.formControl}>
      <InputLabel htmlFor="month-native-simple">Month</InputLabel>
      <Select
        native
        value={props.month}
        onChange={event => props.onSelectMonth(event.target.value)}
        inputProps={{
          name: 'month',
          id: 'month-native-simple'
        }}
      >
        {props.availableMonths.map(availableMonth => (
          <option value={availableMonth}>{availableMonth}</option>
        ))}
      </Select>
    </FormControl>

    <FormControl className={props.classes.formControl}>
      <InputLabel htmlFor="year-native-simple">Year</InputLabel>
      <Select
        native
        value={props.year}
        onChange={event => props.onSelectYear(event.target.value)}
        inputProps={{
          name: 'year',
          id: 'year-native-simple'
        }}
      >
        {props.availableYears.map(availableYear => (
          <option value={availableYear}>{availableYear}</option>
        ))}
      </Select>
    </FormControl>
  </div>
);

PaymentControls.propTypes = {
  availableMonths: PropTypes.array.isRequired,
  availableYears: PropTypes.array.isRequired,
  month: PropTypes.string.isRequired,
  onSelectMonth: PropTypes.func.isRequired,
  onSelectYear: PropTypes.func.isRequired,
  year: PropTypes.string.isRequired
};

const materialStyles = theme => ({
  formControl: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    minWidth: 100
  }
});

export default withStyles(materialStyles)(PaymentControls);
