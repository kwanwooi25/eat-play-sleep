import React, { Component } from 'react';

/** Material UI Components */
import Icon from '@material-ui/core/Icon';

class NumberInput extends Component {
  constructor(props) {
    super(props);

    const {
      name,
      value = 0,
      unit,
      interval,
      min = 0,
      max = 1000
    } = props;

    this.state = { name, value, unit, interval, min, max };
  }

  adjustValue = value => {
    const { min, max } = this.state;

    if (value > min && value <= max) return value;
    else if (value <= min) return min;
    else if (value > max) return max;
  }

  handleInputChange = e => {
    const { onChange } = this.props;
    const { name } = this.state;

    const value = this.adjustValue(e.target.value);
    this.setState({ value });
    onChange(name, value);
  }

  handleButtonClick = change => {
    let { name, interval, value } = this.state;
    const { onChange } = this.props;

    if (change === 'minus') value -= interval;
    else if (change === 'plus') value += interval;

    value = this.adjustValue(value);
    this.setState({ value });
    onChange(name, value);
  }

  render() {
    const { unit, name, value } = this.state;
    const { label } = this.props;

    return (
      <div className="number-input-container">
        {label && <label htmlFor={name}>{label}</label>}
        <div className="number-input">
          <button
            className="number-input__button"
            onClick={() => { this.handleButtonClick('minus') }}
          >
            <Icon color="inherit" fontSize="large">remove</Icon>
          </button>
          <div className="number-input__value">
            <input
              id={name}
              type="number"
              value={value}
              onChange={this.handleInputChange}
            />
            <span className="number-input__value__unit">
              {unit}
            </span>
          </div>
          <button
            className="number-input__button"
            onClick={() => { this.handleButtonClick('plus') }}
          >
            <Icon color="inherit" fontSize="large">add</Icon>
          </button>
        </div>
      </div>
      
    )
  }
}

export default NumberInput;