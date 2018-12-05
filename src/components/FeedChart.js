import React, { Component } from 'react';
import { withTranslate } from 'react-redux-multilingual';

/** Recharts */
import {
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Bar,
  Line
} from 'recharts';

/** Styled Components */
import Chart from '../styled_components/Chart';

/** Components */
import XAxisTick from './CustomXAxisTick';

/** Utils */
import secondsToHMS from '../utils/secondsToHMS';
import { mlToOz } from '../utils/unitChange';
import { comma } from '../utils/comma';

const DATA_FILL_COLOR = {
  breast: '#FFC107',
  bottle: '#3F51B5',
  babyfood: '#FF5722',
};

const CustomToolTip = ({ active, payload, label, translate, volumeUnit }) => {
  if (!active) return null;

  return (
    <Chart.Tooltip>
      <h3>{label}</h3>
      {payload.map(({ name, value }) => {
        const activityName = ['breast', 'bottle', 'babyfood']
          .find(activityName => translate(activityName) === name);

        if (activityName === 'breast') value = secondsToHMS(value);
        else value = `${volumeUnit === 'oz' ? value : comma(value)}${volumeUnit}`;

        return (
          <Chart.Tooltip.Content key={name} style={{ color: DATA_FILL_COLOR[activityName] }}>
            <span>{name}</span>
            <span>{value}</span>
          </Chart.Tooltip.Content>
        )
      })}
    </Chart.Tooltip>
  )
}

class FeedChart extends Component {
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

  transformData = (source, displayUnits, translate) => {
    const volumeUnit = displayUnits.volume;
    const dates = source && source.keys;

    /** map dates to generate chart data */
    return dates.map(date => {
      const { breast, bottle, babyfood } = source;
      let breastDuration, bottleAmount, babyfoodAmount;

      if (breast) breastDuration = breast[date].duration;
      if (bottle) {
        bottleAmount =
          volumeUnit === 'ml' ?
          bottle[date].amount :
          mlToOz(bottle[date].amount).toFixed(2);
      }
      if (babyfood) {
        babyfoodAmount =
          volumeUnit === 'ml' ?
          babyfood[date].amount :
          mlToOz(babyfood[date].amount).toFixed(2);
      }

      const data = { date };
      if (breast) data[`${translate('breast')}`] = breastDuration;
      if (bottle) data[`${translate('bottle')}`] = bottleAmount;
      if (babyfood) data[`${translate('babyfood')}`] = babyfoodAmount;

      return data;
    });
  }

  render() {
    const { width, height } = this.state;
    const { translate, source, displayUnits, displayActivities } = this.props;
    const shouldRenderBreast = displayActivities.includes('breast');
    const shouldRenderBottle = displayActivities.includes('bottle');
    const shouldRenderBabyfood = displayActivities.includes('babyfood');

    const data = this.transformData(source, displayUnits, translate);

    return (
      <Chart ref={this.chartRef}>
        <ComposedChart width={width} height={height} data={data}>
          <XAxis
            dataKey="date"
            tick={<XAxisTick />}
          />
          {shouldRenderBreast && (
            <YAxis
              label={{
                value: translate('durationLabel'),
                angle: -90,
                position: 'insideLeft'
              }}
              yAxisId="duration"
              orientation="left"
              tickFormatter={v => secondsToHMS(v)}
            />
          )}
          {(shouldRenderBottle || shouldRenderBabyfood) && (
            <YAxis
              label={{
                value: translate('amount'),
                angle: shouldRenderBreast ? 90 : -90,
                position: shouldRenderBreast ? 'insideRight' : 'insideLeft'
              }}
              unit={displayUnits.volume}
              yAxisId="volume"
              orientation={shouldRenderBreast ? "right" : "left"}
              tickFormatter={v => comma(v)}
            />
          )}
          <Tooltip
            content={
              <CustomToolTip
                translate={translate}
                volumeUnit={displayUnits.volume}
              />
            }
          />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          
          {shouldRenderBottle && (
            <Bar
              dataKey={translate('bottle')}
              barSize={20}
              stackId="a"
              yAxisId="volume"
              fill={DATA_FILL_COLOR.bottle}
            />
          )}
          {shouldRenderBabyfood && (
            <Bar
              dataKey={translate('babyfood')}
              barSize={20}
              stackId="a"
              yAxisId="volume"
              fill={DATA_FILL_COLOR.babyfood}
            />
          )}
          {shouldRenderBreast && (
            <Line
              type="monotone"
              yAxisId="duration"
              dataKey={translate('breast')}
              stroke={DATA_FILL_COLOR.breast}
            />
          )}
        </ComposedChart>
      </Chart>
    )
  }
}

export default withTranslate(FeedChart);