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

/** Helper functions */
import secondsToHMS from '../../helpers/secondsToHMS';

const DATA_FILL_COLOR = { sleep: "#9E9E9E" };

const XAxisTick = ({ x, y, payload }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={8}
        textAnchor="end"
        fill="#666"
        transform="rotate(-35)"
      >
        {payload.value}
      </text>
    </g>
  )
}

const CustomToolTip = ({ active, payload, label }) => {
  if (!active) return null;

  const { name, value } = payload[0];

  return (
    <div className="sleep-chart__custom-tooltip">
      <h3 className="sleep-chart__custom-tooltip__label">{label}</h3>
        <div
          className="sleep-chart__custom-tooltip__content"
          style={{ color: DATA_FILL_COLOR.sleep }}
        >
          <span className="sleep-chart__custom-tooltip__content__name">
            {name}
          </span>
          <span className="sleep-chart__custom-tooltip__content__value">
            {secondsToHMS(value)}
          </span>
        </div>
    </div>
  )
}

class SleepChart extends Component {
  state = { width: 0, height: 0 };

  componentDidMount() {
    /** set chart size */
    const containerWidth = document.querySelector('.sleep-chart').clientWidth;
    this.setState({ width: containerWidth, height: containerWidth });
  }
  
  render() {
    const { translate, source } = this.props;
    const { width, height } = this.state;

    const data = source && source.keys.map(key =>
      ({ date: key, [`${translate('sleep')}`]: source[key].duration }));

    return (
      <div className="sleep-chart">
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
      </div>
    )
  }
}

export default withTranslate(SleepChart);