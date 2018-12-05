import moment from 'moment';
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
  Area,
  Line
} from 'recharts';

/** Styled Components */
import Chart from '../styled_components/Chart';

/** Components */
import XAxisTick from './CustomXAxisTick';

/** Growth Standards */
import boysStandards from '../assets/boys_standards.json';
import girlsStandards from '../assets/girls_standards.json';

/** Utils */
import { cmToIn, kgToLb } from '../utils/unitChange';

const DATA_FILL_COLOR = {
  standard: '#009688',
  height: "#FF5722",
  weight: "#FF5722",
  head: "#FF5722",
};

const CustomToolTip = ({ active, payload, label, translate, unit }) => {
  if (!active) return null;

  return (
    <div className="growth-chart__item__custom-tooltip">
      <h3 className="growth-chart__item__custom-tooltip__label">{label}</h3>
      {payload.map(({ name, value }) => {
        const propName = ['standard', 'height', 'weight', 'head']
          .find(propName => translate(propName) === name);
        
        let formattedValue = '';
        if (name === translate('standard')) {
          formattedValue = `${value[0].toFixed(2)} ~ ${value[1].toFixed(2)} ${unit}`;
        } else {
          formattedValue = `${value.toFixed(2)} ${unit}`;
        }

        return (
          <div
            key={name}
            className="growth-chart__item__custom-tooltip__content"
            style={{ color: DATA_FILL_COLOR[propName] }}
          >
            <span className="growth-chart__item__custom-tooltip__content__name">
              {name}
            </span>
            <span className="growth-chart__item__custom-tooltip__content__value">
              {formattedValue}
            </span>
          </div>
        )
      })}
    </div>
  )
}

class GrowthChart extends Component {
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

  convertUnit = (data, convertFunc) => (
    data.map(({ third, fifteenth, median, eightyfifth, ninetyseventh, ...data }) => (
      {
        third: convertFunc(third),
        fifteenth: convertFunc(fifteenth),
        median: convertFunc(third),
        eightyfifth: convertFunc(eightyfifth),
        ninetyseventh: convertFunc(ninetyseventh),
        ...data
      }
    ))
  )

  getStandardsData = (baby, age) => {
    const { displayUnits } = this.props;
    const standards = baby.gender === 'boy' ? boysStandards : girlsStandards;

    const standardsData = {};
    const yDomain = {};

    Object.keys(standards).forEach(key => {
      standardsData[key] = standards[key]
        .filter(({ month }) => (age - 2 <= month && month <= age + 1));

      /** generate standards by date */
      let expandedToDate = [];
      standardsData[key].forEach((data, index) => {
        for (
          let i = moment(baby.birthday).add(data.month, 'months');
          i <= moment(baby.birthday).add(data.month + 1, 'months');
          i.add(1, 'days')
        ) {
          const startOfMonthAge = moment(baby.birthday).add(data.month, 'months');
          const nextMonthData = standardsData[key][index + 1];
          const date = i.format('MM-DD');
          const diff = i.diff(startOfMonthAge, 'days');
          const daysInMonth = startOfMonthAge.daysInMonth();
          
          if (nextMonthData && diff !== 0) {
            expandedToDate.push({
              date,
              third:
                data.third + ((nextMonthData.third - data.third) * diff / daysInMonth),
              fifteenth:
                data.fifteenth + ((nextMonthData.fifteenth - data.fifteenth) * diff / daysInMonth),
              median:
                data.median + ((nextMonthData.median - data.median) * diff / daysInMonth),
              eightyfifth:
                data.eightyfifth + ((nextMonthData.eightyfifth - data.eightyfifth) * diff / daysInMonth),
              ninetyseventh:
                data.ninetyseventh + ((nextMonthData.ninetyseventh - data.ninetyseventh) * diff / daysInMonth),
            })
          }
        }
      });

      standardsData[key] = expandedToDate;

      /** convert unit when needed */
      if ((key === 'height' || key === 'head') && displayUnits.length === 'in') {
        standardsData[key] = this.convertUnit(standardsData[key], cmToIn);
      } else if (key === 'weight' && displayUnits.weight === 'lb') {
        standardsData[key] = this.convertUnit(standardsData[key], kgToLb);
      }

      yDomain[key] = {
        min: parseInt(standardsData[key][0].third),
        max: parseInt(standardsData[key][standardsData[key].length - 1].ninetyseventh),
      }
    });

    return { standardsData, yDomain };
  }

  render() {
    const { translate, source, baby, displayUnits } = this.props;
    const { width, height } = this.state;

    const ageInMonth = moment().diff(moment(baby.birthday), 'months');
    const { standardsData, yDomain } = this.getStandardsData(baby, ageInMonth);
    let data = { height: [], weight: [], head: [] };

    if (source) {
      source.keys.forEach(key => {
        ['height', 'weight', 'head'].forEach(name => {
          standardsData[name]
            .filter(({ date }) => date === key)
            .forEach(standard => {
              data[name].push({
                date: key,
                [`${translate('standard')}`]: [standard.third, standard.ninetyseventh]
              });
            });

          if (source[key][name]) {
            const dateIndex = data[name].findIndex(({ date }) => date === key);
            data[name][dateIndex][`${translate(name)}`] = source[key][name];
          }
        });
      })
    }

    return (
      <div>
        {Object.keys(standardsData).map(name => {
          const unit =
            (name === 'height' || name === 'head') ?
              displayUnits.length :
              name === 'weight' && displayUnits.weight;
          
          return (
            <Chart key={name} ref={this.chartRef} marginBottom>
              <ComposedChart width={width} height={height} data={data[name]}>
                <XAxis dataKey="date" tick={<XAxisTick />} />
                <YAxis
                  label={{
                    value: translate(name),
                    angle: -90,
                    position: 'insideLeft'
                  }}
                  orientation="left"
                  tickFormatter={v => `${v}${unit}`}
                  domain={[yDomain[name].min, yDomain[name].max]}
                />
                <Tooltip
                  content={<CustomToolTip translate={translate} unit={unit} />}
                />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Area
                  type="monotone"
                  dataKey={translate('standard')}
                  fill={DATA_FILL_COLOR.standard}
                  fillOpacity={0.5}
                  stroke={DATA_FILL_COLOR.standard}
                />
                <Line
                  type="monotone"
                  dataKey={translate(name)}
                  stroke={DATA_FILL_COLOR[name]}
                  activeDot={{r: 8}}
                />
              </ComposedChart>
            </Chart>
          )
        })}
      </div>
    )
  }
}

export default withTranslate(GrowthChart);