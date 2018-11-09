import React from 'react';
import { withTranslate } from 'react-redux-multilingual';

/** Victory Chart Components */
import {
  VictoryChart,
  VictoryBar,
  VictoryLine,
  VictoryAxis,
  VictoryTheme,
  VictoryStack,
  VictoryLegend,
  VictoryGroup,
  VictoryScatter,
  VictoryZoomContainer
} from 'victory';

/** Helper functions */
import { comma } from '../../helpers/comma';
import secondsToHMS from '../../helpers/secondsToHMS';

const FeedChart = ({
  translate,
  breast,
  bottle,
  babyfood,
}) => {
  const transformData = source => {
    const data = source.keys.map(key => {
      switch (source.name) {
        case 'breast':
          return { date: key, duration: source[key].duration };
        case 'bottle':
        case 'babyfood':
          return { date: key, amount: source[key].amount };
        default:
          return {};
      }
      
    });

    return data;
  }

  const breastData = transformData(breast);
  const bottleData = transformData(bottle);
  const babyfoodData = transformData(babyfood);

  return (
    <div className="feed-chart">
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={20}
        containerComponent={<VictoryZoomContainer />}
      >
        <VictoryAxis
          tickValues={breast.keys}
        />
        <VictoryAxis
          label={translate('amount')}
          dependentAxis
          tickFormat={x => `${comma(x)}ml`}
          style={{ axisLabel: { padding: -15 } }}
        />
        <VictoryAxis
          label={translate('durationLabel')}
          dependentAxis
          orientation="right"
          tickFormat={x => secondsToHMS(x)}
          style={{ axisLabel: { padding: -15 } }}
        />
        <VictoryLegend
          x={20} y={10}
          orientation="horizontal"
          gutter={25}
          style={{ border: { stroke: "black" } }}
          data={[
            { name: translate('breast'), symbol: { fill: "orange"} },
            { name: translate('bottle'), symbol: { fill: "navy"} },
            { name: translate('babyfood'), symbol: { fill: "tomato"} },
          ]}
        />
        <VictoryGroup
          data={breastData}
          x="date"
          y="duration"
          color="orange"
        >
          <VictoryLine />
          <VictoryScatter size={5} />
        </VictoryGroup>
        <VictoryStack>
          <VictoryBar
            data={bottleData}
            x="date"
            y="amount"
            color="navy"
          />
          <VictoryBar
            data={babyfoodData}
            x="date"
            y="amount"
            color="tomato"
          />
        </VictoryStack>
      </VictoryChart>
    </div>
  )
}

export default withTranslate(FeedChart);