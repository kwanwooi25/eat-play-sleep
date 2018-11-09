import React, { Component } from 'react';
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
  VictoryZoomContainer,
  VictoryLabel,
} from 'victory';

/** Helper functions */
import { comma } from '../../helpers/comma';
import secondsToHMS from '../../helpers/secondsToHMS';

const DATA_FILL_COLOR = {
  breast: '#FFC107',
  bottle: '#3F51B5',
  babyfood: '#FF5722',
};
const DATA_STROKE_COLOR = {
  breast: '#FFC107',
  bottle: '#3F51B5',
  babyfood: '#FF5722',
};
const LABEL_COLOR = {
  breast: '#FF6F00',
  bottle: '#1A237E',
  babyfood: '#BF360C',
};

class FeedChart extends Component {

  transformData = source => {
    const data = source.keys.map(key => {
      switch (source.name) {
        case 'breast':
          return { date: key, duration: source[key].duration / 5 };
        case 'bottle':
        case 'babyfood':
          return { date: key, amount: source[key].amount };
        default:
          return {};
      }
      
    });

    return data;
  }

  onBreastChartMouseOver = () => {
    return [
      {
        target: "data",
        mutation: props => {
          const { style } = props;
          const newStyle =
            Object.assign(
              {},
              style,
              {
                fillOpacity: 0.7,
                stroke: DATA_STROKE_COLOR['breast'],
                strokeWidth: 2
              }
            );
          return Object.assign({}, props, { style: newStyle });
        }
      }, {
        target: "labels",
        mutation: props => {
          const { duration } = props.datum;
          return { text: secondsToHMS(duration * 5) };
        }
      }
    ];
  }
  
  onBarChartMouseOver = name => {
    return [
      {
        target: "data",
        mutation: props => {
          const { style } = props;
          const newStyle =
            Object.assign(
              {},
              style,
              {
                fillOpacity: 0.7,
                stroke: DATA_STROKE_COLOR[name],
                strokeWidth: 1
              }
            );
          return Object.assign({}, props, { style: newStyle });
        }
      }, {
        target: "labels",
        mutation: props => {
          const { amount } = props.datum;
          return { text: `${comma(amount)}ml` };
        }
      }
    ];
  }
  
  onChartMouseOut = () => {
    return [
      { target: "data", mutation: () => null },
      { target: "labels", mutation: () => null }
    ];
  }

  render() {
    const {
      translate,
      breast,
      bottle,
      babyfood,
    } = this.props;

    const breastData = this.transformData(breast);
    const bottleData = this.transformData(bottle);
    const babyfoodData = this.transformData(babyfood);

    return (
      <div className="feed-chart">
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={20}
          containerComponent={<VictoryZoomContainer />}
        >
          <VictoryAxis
            tickCount={7}
            tickValues={breast.keys}
            tickFormat={x => parseInt(x.split('-')[1])}
          />
          <VictoryAxis
            label={translate('amount')}
            dependentAxis
            tickCount={4}
            tickFormat={x => `${comma(x)}ml`}
            style={{ axisLabel: { padding: -15 } }}
          />
          <VictoryAxis
            label={translate('durationLabel')}
            dependentAxis
            orientation="right"
            tickCount={4}
            tickFormat={x => secondsToHMS(x * 5)}
            style={{ axisLabel: { padding: -15 } }}
          />
          <VictoryLegend
            x={20} y={10}
            orientation="horizontal"
            gutter={25}
            style={{ border: { stroke: "black" } }}
            data={[
              { name: translate('breast'), symbol: { fill: DATA_FILL_COLOR['breast'] } },
              { name: translate('bottle'), symbol: { fill: DATA_FILL_COLOR['bottle'] } },
              { name: translate('babyfood'), symbol: { fill: DATA_FILL_COLOR['babyfood'] } },
            ]}
          />
          <VictoryStack>
            <VictoryBar
              data={bottleData}
              x="date"
              y="amount"
              color={DATA_FILL_COLOR['bottle']}
              barRatio={0.9}
              labels={() => null}
              labelComponent={<VictoryLabel dy={30}/>}
              style={{
                labels: {
                  fill: LABEL_COLOR['bottle'],
                  fontSize: 20,
                  stroke: LABEL_COLOR['bottle'],
                  strokeWidth: 1
                }
              }}
              events={[{
                target: "data",
                eventHandlers: {
                  onMouseOver: () => this.onBarChartMouseOver('bottle'),
                  onMouseOut: this.onChartMouseOut,
                }
              }]}
            />
            <VictoryBar
              data={babyfoodData}
              x="date"
              y="amount"
              color={DATA_FILL_COLOR['babyfood']}
              barRatio={0.9}
              labels={() => null}
              labelComponent={<VictoryLabel dy={30}/>}
              style={{
                labels: {
                  fill: LABEL_COLOR['babyfood'],
                  fontSize: 20,
                  stroke: LABEL_COLOR['babyfood'],
                  strokeWidth: 1
                }
              }}
              events={[{
                target: "data",
                eventHandlers: {
                  onMouseOver: () => this.onBarChartMouseOver('babyfood'),
                  onMouseOut: this.onChartMouseOut,
                }
              }]}
            />
          </VictoryStack>
          <VictoryGroup
            data={breastData}
            x="date"
            y="duration"
            color={DATA_FILL_COLOR['breast']}
          >
            <VictoryLine />
            <VictoryScatter
              size={5}
              labels={() => null}
              style={{
                labels: {
                  fill: LABEL_COLOR['breast'],
                  fontSize: 20,
                  stroke: LABEL_COLOR['breast'],
                  strokeWidth: 1
                }
              }}
              events={[{
                target: "data",
                eventHandlers: {
                  onMouseOver: this.onBreastChartMouseOver,
                  onMouseOut: this.onChartMouseOut,
                }
              }]}
            />
          </VictoryGroup>
        </VictoryChart>
      </div>
    )
  }
}

export default withTranslate(FeedChart);