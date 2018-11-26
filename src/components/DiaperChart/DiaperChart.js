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

const DATA_FILL_COLOR = { pee: '#FFEB3B', poo: '#795548' };

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

const CustomToolTip = ({ active, payload, label, translate }) => {
  if (!active) return null;

  return (
    <div className="diaper-chart__custom-tooltip">
      <h3 className="diaper-chart__custom-tooltip__label">{label}</h3>
      {payload.map(({ name, value }) => {
        return (
          <div
            key={name}
            className="diaper-chart__custom-tooltip__content"
            style={{ color: DATA_FILL_COLOR[name] }}
          >
            <span className="diaper-chart__custom-tooltip__content__name">
              {name}
            </span>
            <span className="diaper-chart__custom-tooltip__content__value">
              {value}
            </span>
          </div>
        )
      })}
    </div>
  )
}

class DiaperChart extends Component {
  state = { width: 0, height: 0 };

  componentDidMount() {
    /** set chart size */
    const containerWidth = document.querySelector('.diaper-chart').clientWidth;
    this.setState({ width: containerWidth, height: containerWidth });
  }

  render() {
    const { translate, source } = this.props;
    const { width, height } = this.state;

    const data = source && source.keys.map(key => (
      {
        date: key,
        [`${translate('pee')}`]: source[key].pee,
        [`${translate('poo')}`]: source[key].poo
      }
    ));

    return (
      <div className="diaper-chart">
        <BarChart width={width} height={height} data={data}>
          <XAxis dataKey="date" tick={<XAxisTick />} />
          <YAxis
            label={{
              value: translate('countLabel'),
              angle: -90,
              position: 'insideLeft'
            }}
            orientation="left"
            minTickGap={10}
          />
          <Tooltip content={<CustomToolTip />} />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar
            dataKey={translate('pee')}
            barSize={20}
            stackId="a"
            fill={DATA_FILL_COLOR.pee}
          />
          <Bar
            dataKey={translate('poo')}
            barSize={20}
            stackId="a"
            fill={DATA_FILL_COLOR.poo}
          />
        </BarChart>
      </div>
    )
  }
}

export default withTranslate(DiaperChart);