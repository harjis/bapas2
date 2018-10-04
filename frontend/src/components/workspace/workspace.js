import * as React from 'react';
import { XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries } from 'react-vis';

import styles from './workspace.module.css';

export default function Workspace() {
  return (
    <div className={styles.container}>
      <h1>Welcome!</h1>
      <XYPlot
        width={300}
        height={300}>
        <HorizontalGridLines />
        <LineSeries
          data={[
            { x: 1, y: 10 },
            { x: 2, y: 5 },
            { x: 3, y: 15 }
          ]} />
        <XAxis />
        <YAxis />
      </XYPlot>
    </div>
  );
}
