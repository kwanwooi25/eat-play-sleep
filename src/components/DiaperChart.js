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

const DATA_FILL_COLOR = { pee: '#FFEB3B', poo: '#795548' };

const CustomToolTip = ({ active, payload, label, translate }) => {
  if (!active) return null;

  return (
    <Chart.Tooltip>
      <h3>{label}</h3>
      {payload.map(({ name, value }) => {
        const typeName = ['pee', 'poo']
          .find(typeName => translate(typeName) === name);

        return (
          <Chart.Tooltip.Content key={name} style={{ color: DATA_FILL_COLOR[typeName] }}>
            <span>{name}</span>
            <span>{value}</span>
          </Chart.Tooltip.Content>
        )
      })}
    </Chart.Tooltip>
  )
}

class DiaperChart extends Component {
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

    const data = source && source.keys.map(key => (
      {
        date: key,
        [`${translate('pee')}`]: source[key].pee,
        [`${translate('poo')}`]: source[key].poo
      }
    ));

    return (
      <Chart ref={this.chartRef}>
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
          <Tooltip content={<CustomToolTip translate={translate} />} />
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
      </Chart>
    )
  }
}

export default withTranslate(DiaperChart);