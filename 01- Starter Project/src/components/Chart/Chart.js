import React from 'react';
import ChartBar from './ChartBar';
import './Chart.css';

const Chart = props => {
  const dataPointValues = props.dataPoints.map(dataPoint => dataPoint.value); // transform datapoint object to just a number (for the 12 months, we'll get an array of 12 values)
  const totalMaximum = Math.max(...dataPointValues);

  return (
    <div className='chart'>
      {props.dataPoints.map(dataPoint =>
        <ChartBar
          key={dataPoint.label}
          value={dataPoint.value}
          maxValue={totalMaximum}
          label={dataPoint.label}
        />)}
    </div>
  );
};

export default Chart;