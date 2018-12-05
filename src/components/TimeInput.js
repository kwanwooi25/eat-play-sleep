import React, { Component } from 'react';

/** Styled Components */
import FormElement from '../styled_components/shared/FormElement';
import TimeInput from '../styled_components/TimeInput';

/** Components */
import Icon from './Icon';

class TimeInputContainer extends Component {
  constructor(props) {
    super(props);

    let { value } = props;

    this.state = this.parseValue(value);
  }
  
  componentWillReceiveProps(nextProps) {
    const { readonly, value } = nextProps;
    if (readonly && value) this.setState(this.parseValue(value));
  }

  parseValue = value => {
    const { hourController = false } = this.props;
    const maxValue = hourController ? 14 * 3600 : (59 * 60) + 59;

    if (value >= maxValue) value = maxValue;
    if (value <= 0) value = 0;

    const hour = Math.floor(value / 3600);
    const minute = Math.floor((value % 3600) / 60);
    const second = (value % 3600) % 60;

    return { hour, minute, second };
  }

  combineValue = (hour, minute, second) => {
    return (hour * 3600) + (minute * 60) + second;
  }


  handleButtonClick = (change, name) => {
    const { hour, minute, second } = this.state;

    let value = this.combineValue(hour, minute, second);

    let increment;
    if (name === 'hour') increment = 3600;
    if (name === 'minute') increment = 60;
    if (name === 'second') increment = 1;

    if (change === 'minus-ten') value -= increment * 10;
    else if (change === 'minus-one') value -= increment;
    else if (change === 'plus-one') value += increment;
    else if (change === 'plus-ten') value += increment * 10;

    this.setState(this.parseValue(value), () => this.handleChange());
  }

  handleChange = () => {
    const { hour, minute, second } = this.state;
    const { onChange } = this.props;
    
    const value = this.combineValue(hour, minute, second);

    onChange(value);
  }

  render() {
    const {
      label,
      labelAlign = 'column', // 'row', 'column'
      hourController = false,
      readonly = false,
      small = false,
    } = this.props;

    let inputs = [];
    if (hourController) inputs.push('hour');
    inputs.push('minute', 'second');

    return (
      <FormElement labelAlign={labelAlign}>
        {label && <FormElement.Label>{label}</FormElement.Label>}
        <TimeInput small={small}>
          {readonly === false && (
            <TimeInput.ButtonGroup>
              {inputs.map(name => (
                <TimeInput.ButtonGroup key={name}>
                  <TimeInput.Button onClick={() => this.handleButtonClick('plus-ten', name)}>
                    <Icon name="arrow_up_double" />
                  </TimeInput.Button>
                  <TimeInput.Button onClick={() => this.handleButtonClick('plus-one', name)}>
                    <Icon name="arrow_up" />
                  </TimeInput.Button>
                </TimeInput.ButtonGroup>
              ))}
            </TimeInput.ButtonGroup>
          )}

          <TimeInput.Display>
            {inputs.map(name => (
              <TimeInput.Display.Number key={name} name={name}>
                {`00${this.state[name]}`.slice(-2)}
              </TimeInput.Display.Number>
            ))}
          </TimeInput.Display>

          {readonly === false && (
            <TimeInput.ButtonGroup>
              {inputs.map(name => (
                <TimeInput.ButtonGroup key={name}>
                  <TimeInput.Button onClick={() => this.handleButtonClick('minus-ten', name)}>
                    <Icon name="arrow_down_double" />
                  </TimeInput.Button>
                  <TimeInput.Button onClick={() => this.handleButtonClick('minus-one', name)}>
                    <Icon name="arrow_down" />
                  </TimeInput.Button>
                </TimeInput.ButtonGroup>
              ))}
            </TimeInput.ButtonGroup>
          )}
        </TimeInput>
      </FormElement>
    )
  }
}

export default TimeInputContainer;