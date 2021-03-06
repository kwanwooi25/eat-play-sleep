import React, { Component } from 'react';
import { withTranslate } from 'react-redux-multilingual';

/** Recharts */
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Bar,
} from 'recharts';

/** Styled Components */
import Chart from '../styled_components/Chart';

/** Components */
import XAxisTick from './CustomXAxisTick';

/** Utils */
import secondsToHMS from '../utils/secondsToHMS';

const DATA_FILL_COLOR = { sleep: "#9E9E9E" };

const CustomToolTip = ({ active, payload, label }) => {
  if (!active) return null;

  const { name, value } = payload[0];

  return (
    <Chart.Tooltip>
      <h3>{label}</h3>
      <Chart.Tooltip.Content key={name} style={{ color: DATA_FILL_COLOR.sleep }}>
        <span>{name}</span>
        <span>{secondsToHMS(value)}</span>
      </Chart.Tooltip.Content>
    </Chart.Tooltip>
  )
}

class SleepChart extends Component {
  constructor(props) {
    super(props);

    this.state = { width: 0, height: 0 };

    this.chartRef = React.createRef();
  }

  componentDidMount() {
    /** set chart size */
    const containerWidth = this.chartRef.current.clientWidth;
    this.setState({ width: containerWidth, height: containerWidth });
  }
  
  render() {
    const { translate, source } = this.props;
    const { width, height } = this.state;

    const data = source && source.keys.map(key =>
      ({ date: key, [`${translate('sleep')}`]: source[key].duration }));

    return (
      <Chart ref={this.chartRef}>
        <BarChart width={width} height={height} data={data}>
          <XAxis dataKey="date" tick={<XAxisTick />} />
          <YAxis
            label={{
              value: translate('durationLabel'),
              angle: -90,
              position: 'insideLeft'
            }}
            orientation="left"
            tickFormatter={v => secondsToHMS(v)}
          />
          <Tooltip content={<CustomToolTip />} />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar
            dataKey={translate('sleep')}
            barSize={20}
            fill={DATA_FILL_COLOR.sleep}
          />
        </BarChart>
      </Chart>
    )
  }
}

export default withTranslate(SleepChart);