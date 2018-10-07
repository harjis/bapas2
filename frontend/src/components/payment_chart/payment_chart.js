import * as React from 'react';
import { RadialChart, Hint } from 'react-vis';

export default class PaymentChart extends React.Component {
  state = {
    value: false
  };

  render() {
    return (
      <RadialChart
        className={'donut-chart-example'}
        innerRadius={100}
        radius={140}
        getAngle={d => d.theta}
        data={[{ theta: 1 }, { theta: 2 }]}
        onValueMouseOver={v => this.setState({ value: v })}
        onSeriesMouseOut={v => this.setState({ value: false })}
        width={300}
        height={300}
        padAngle={0.04}
      >
        {this.state.value && <Hint value={this.state.value} />}
      </RadialChart>
    );
  }
}
