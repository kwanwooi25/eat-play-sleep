import React, { Component } from 'react';

class NumberInput extends Component {
  constructor(props) {
    super(props);

    const { value } = props;

    const hundred = Math.floor(value / 100) || 0;
    const ten = Math.floor((value - (hundred * 100)) / 10) || 0;
    const one = Math.floor(value - (hundred * 100) - (ten * 10)) || 0;
    const decimal = value - (hundred * 100) - (ten * 10) - one || 0;

    this.state = { hundred, ten, one, decimal };
  }

  componentDidMount() {
    const { value } = this.props;
    const { hundred, ten, one, decimal } = this.state;

    if (value) {
      const scrollHeight = this.hundredSpinner.children[0].scrollHeight;
      this.hundredSpinner.scrollTo({ top: hundred * scrollHeight });
      this.tenSpinner.scrollTo({ top: ten * scrollHeight });
      this.oneSpinner.scrollTo({ top: one * scrollHeight });
      
      if (this.decimalSpinner) {
        this.decimalSpinner.scrollTo({ top: decimal * scrollHeight });
      }
    }
  }

  handleSpinnerScroll = (e, name) => {
    const currentScrollPosition = e.target.scrollTop;
    const childScrollHeight = e.target.children[0].scrollHeight;
    let selected = Math.round(currentScrollPosition / childScrollHeight);

    this.setState({ [name]: selected }, () => {
      this.handleChange();
    });
  }

  handleChange = () => {
    const { hundred, ten, one, decimal } = this.state;
    const { isDecimal, onChange } = this.props;

    let value = (hundred * 100) + (ten * 10) + one;
    if (isDecimal) value += (decimal * 0.1);
    onChange(value);
  }

  renderNumbers = (numbers, name) =>
    numbers.map(number => <li key={`${number}-${name}`}>{number}</li>);

  render() {
    const {
      className = '',
      label,
      labelAlign = 'row', // 'row', 'column'
      unit,
      isDecimal,
    } = this.props;

    let numbers = [];
    for (let i = 0; i <= 9; i++) numbers.push(i);

    return (
      <div className={`number-input-container ${className} label-align--${labelAlign}`}>
        {label && <label>{label}</label>}
        <div className="number-input">
          <div className="number-input__spinner">
            {['hundred', 'ten', 'one'].map(name => (
              <div key={name} className={`number-input__spinner__${name}-wrapper`}>
                <ul
                  ref={ref => this[`${name}Spinner`] = ref}
                  className={`number-input__spinner__${name}`}
                  onScroll={e => this.handleSpinnerScroll(e, name)}
                >
                  {this.renderNumbers(numbers, name)}
                </ul>
              </div>
            ))}
            {isDecimal && <span className="number-input__point">.</span>}
            {isDecimal && (
              <div className="number-input__spinner__decimal-wrapper">
                <ul
                  ref={ref => this.decimalSpinner = ref}
                  className="number-input__spinner__decimal"
                  onScroll={e => this.handleSpinnerScroll(e, 'decimal')}
                >
                  {this.renderNumbers(numbers, 'decimal')}
                </ul>
              </div>
            )}
          </div>
          <div className="number-input__unit">
            {unit}
          </div>
        </div>
      </div>
    )
  }
}

export default NumberInput;