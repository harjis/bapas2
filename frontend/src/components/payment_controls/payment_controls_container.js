import * as React from 'react';

import PaymentControls from './payment_controls';
export default class PaymentControlsContainer extends React.Component {
  render() {
    return (
      <PaymentControls
        availableMonths={['1', '2']}
        availableYears={['2009', '2010']}
        month={'1'}
        onSelectMonth={() => {}}
        onSelectYear={() => {}}
        year={'2009'}
      />
    );
  }
}
