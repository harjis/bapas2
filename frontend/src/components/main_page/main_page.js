import * as React from 'react';
import { RadialChart, Hint } from 'react-vis';

import styles from './main_page.module.css';

export default class MainPage extends React.Component {
  state = {
    value: false
  };

  render() {
    const { value } = this.state;
    return (
      <div className={styles.container}>
        <h1>Welcome!</h1>
        <RadialChart
          className={'donut-chart-example'}
          innerRadius={100}
          radius={140}
          getAngle={d => d.theta}
          data={[
            { theta: 1 },
            { theta: 2 },
          ]}
          onValueMouseOver={v => this.setState({ value: v })}
          onSeriesMouseOut={v => this.setState({ value: false })}
          width={300}
          height={300}
          padAngle={0.04}
        >
          {value && <Hint value={value} />}
        </RadialChart>
      </div>
    );
  }
}
