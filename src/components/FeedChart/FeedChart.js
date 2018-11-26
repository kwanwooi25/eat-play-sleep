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

/** Helper functions */
import secondsToHMS from '../../helpers/secondsToHMS';
import { mlToOz } from '../../helpers/unitChange';
import { comma } from '../../helpers/comma';

const DATA_FILL_COLOR = {
  breast: '#FFC107',
  bottle: '#3F51B5',
  babyfood: '#FF5722',
};

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

const CustomToolTip = ({ active, payload, label, translate, volumeUnit }) => {
  if (!active) return null;

  return (
    <div className="feed-chart__custom-tooltip">
      <h3 className="feed-chart__custom-tooltip__label">{label}</h3>
      {payload.map(({ name, value }) => {
        const activityName = ['breast', 'bottle', 'babyfood']
          .find(activityName => translate(activityName) === name);

        if (activityName === 'breast') value = secondsToHMS(value);
        else value = `${volumeUnit === 'oz' ? value : comma(value)}${volumeUnit}`;

        return (
          <div
            key={name}
            className="feed-chart__custom-tooltip__content"
            style={{ color: DATA_FILL_COLOR[activityName] }}
          >
            <span className="feed-chart__custom-tooltip__content__name">
              {name}
            </span>
            <span className="feed-chart__custom-tooltip__content__value">
              {value}
            </span>
          </div>
        )
      })}
    </div>
  )
}

class FeedChart extends Component {
  state = {
    data: [],
    width: 0,
    height: 0,
  }

  componentDidMount() {
    /** set chart size */
    const containerWidth = document.querySelector('.feed-chart').clientWidth;
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
      <div className="feed-chart">
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
      </div>
    )
  }
}

export default withTranslate(FeedChart);