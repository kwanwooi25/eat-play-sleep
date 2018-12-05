import React, { Component } from 'react';

/** Styled Components */
import FormElement from '../styled_components/shared/FormElement';
import NumberInput from '../styled_components/NumberInput';

/** Components */
import Icon from './Icon';

/** Utils */
import { ozToMl, mlToOz, inToCm, cmToIn, lbToKg, kgToLb } from '../utils/unitChange';

class NumberInputContainer extends Component {
  constructor(props) {
    super(props);

    let { value, unit } = props;

    if (unit === 'oz') value = mlToOz(value);
    if (unit === 'in') value = cmToIn(value);
    if (unit === 'lb') value = kgToLb(value);

    this.state = this.parseValue(value);
  }

  combineValue = (hundred, ten, one, decimal) => {
    const { showDecimal, unit } = this.props;

    let value = (hundred * 100) + (ten * 10) + one;
    if (showDecimal) {
      if (unit === 'oz' || unit === 'in' || unit === 'lb') {
        value += (decimal / 100);
      } else {
        value += (decimal / 10);
      }
    }

    return value;
  }

  parseValue = value => {
    const { maxValue = 999, unit } = this.props;
    if (value >= maxValue) value = maxValue;
    if (value <= 0) value = 0;
    
    const hundred = Math.floor(value / 100) || 0;
    const ten = Math.floor((value - (hundred * 100)) / 10) || 0;
    const one = Math.floor(value - (hundred * 100) - (ten * 10)) || 0;
    
    let decimal = value - (hundred * 100) - (ten * 10) - one || 0;
    if (unit === 'oz' || unit === 'in' || unit === 'lb') {
      decimal = Math.round((decimal * 100) / 25) * 25;
    } else {
      decimal = Math.round(decimal * 10);
    }

    return { hundred, ten, one, decimal };
  }

  handleButtonClick = (change, digit) => {
    const { hundred, ten, one, decimal } = this.state;
    const { unit } = this.props;

    let value = this.combineValue(hundred, ten, one, decimal);

    let decimalIncrement = 0.1;
    if (unit === 'oz' || unit === 'in' || unit === 'lb') decimalIncrement = 0.25;

    let increment;
    if (digit === 'hundred') increment = 100;
    else if (digit === 'ten') increment = 10;
    else if (digit === 'one') increment = 1;
    else if (digit === 'decimal') increment = decimalIncrement;

    if (change === 'plus') value += increment;
    if (change === 'minus') value -= increment;

    this.setState(this.parseValue(value), () => this.handleChange());
  }

  handleChange = () => {
    const { hundred, ten, one, decimal } = this.state;
    const { onChange, unit } = this.props;

    let value = this.combineValue(hundred, ten, one, decimal);

    if (unit === 'oz') value = ozToMl(value);
    else if (unit === 'in') value = inToCm(value);
    else if (unit === 'lb') value = lbToKg(value);

    onChange(value);
  }

  render() {
    const {
      label,
      labelAlign = 'column', // 'row', 'column'
      unit,
      maxValue,
      showDecimal = false,
    } = this.props;

    let inputs = [];

    if (maxValue >= 100) inputs.push('hundred');
    if (maxValue >= 10) inputs.push('ten');
    inputs.push('one');
    if (showDecimal) inputs.push('decimal');

    return (
      <FormElement labelAlign={labelAlign}>
        {label && <FormElement.Label>{label}</FormElement.Label>}
        <NumberInput labelAlign={labelAlign}>
          <NumberInput.Controls>
            <NumberInput.ButtonGroup>
              {inputs.map(name => (
                <NumberInput.Button
                  key={name}
                  onClick={() => this.handleButtonClick('plus', name)}
                >
                  <Icon name="arrow_up" />
                </NumberInput.Button>
              ))}
            </NumberInput.ButtonGroup>

            <NumberInput.Display>
              {inputs.map(name => (
                <NumberInput.Display.Number decimal={name === 'decimal'} key={name}>
                  {this.state[name]}
                </NumberInput.Display.Number>
              ))}
            </NumberInput.Display>
            
            <NumberInput.ButtonGroup>
              {inputs.map(name => (
                <NumberInput.Button
                  key={name}
                  onClick={() => this.handleButtonClick('minus', name)}
                >
                  <Icon name="arrow_down" />
                </NumberInput.Button>
              ))}
            </NumberInput.ButtonGroup>
          </NumberInput.Controls>
          <NumberInput.Unit>{unit}</NumberInput.Unit>
        </NumberInput>
      </FormElement>
    )
  }
}

export default NumberInputContainer;