import React, { Component } from 'react';
import SVGIcon from '../SVGIcon/SVGIcon';

class TimeInput extends Component {
  state = { hour: 0, minute: 0, second: 0 };

  componentDidMount() {
    const { value } = this.props;
    if (value) this.setTimeSpinnerValue(value);
  }

  componentWillReceiveProps(nextProps) {
    const { readonly, value } = nextProps;
    if (readonly && value) this.setTimeSpinnerValue(value);
  }

  setTimeSpinnerValue = value => {
    const hour = Math.floor(value / 3600);
    const minute = Math.floor((value % 3600) / 60);
    const second = (value % 3600) % 60;
    const scrollHeight = this.minuteSpinner.children[0].scrollHeight;

    this.minuteSpinner.scrollTo({ top: minute * scrollHeight });
    this.secondSpinner.scrollTo({ top: second * scrollHeight });
    
    if (this.hourSpinner) {
      this.hourSpinner.scrollTo({ top: hour * scrollHeight });
    }

    this.setState({ hour, minute, second })
  }

  handleSpinnerScroll = (e, name) => {
    const currentScrollPosition = e.target.scrollTop - e.target.children[0].scrollTop;
    const childScrollHeight = e.target.children[0].scrollHeight;
    let selected = Math.round(currentScrollPosition / childScrollHeight);

    for (let element of e.target.children) element.classList.remove('selected');
    e.target.children[selected].classList.add('selected');

    this.setState({ [name]: selected }, () => {
      this.handleChange();
    });
  }

  handleButtonClick = (change, name) => {
    const spinner = this[`${name}Spinner`];
    const currentScrollPosition = spinner.scrollTop;
    const childScrollHeight = spinner.children[0].scrollHeight;
    let current = Math.round(currentScrollPosition / childScrollHeight);
    if (change === 'minus-ten') current -= 10;
    else if (change === 'minus-one') current -= 1;
    else if (change === 'plus-one') current += 1;
    else if (change === 'plus-ten') current += 10;

    spinner.scrollTo({ top: current * childScrollHeight, behavior: 'smooth' });
  }

  handleChange = () => {
    const { hour, minute, second } = this.state;
    const { hourController, onChange } = this.props;

    let value = (minute * 60) + second;
    if (hourController) value += (hour * 3600);
    onChange(value);
  }

  renderNumbers = (name) => {
    let numbers = [];
    const max = name === 'hour' ? 12 : 59;

    for (let i = 0; i <= max; i++) numbers.push(i);

    return numbers.map(number => (
      <li
        key={`${number}-${name}`}
        className={`${number === 0 ? 'selected' : ''}`}
      >
        {('00'+number).slice(-2)}
      </li>
    ));
  }

  render() {
    const {
      className = '',
      label,
      labelAlign = 'row', // 'row', 'column'
      hourController = false,
      readonly = false,
      small = false,
    } = this.props;

    const containerClassName =
      `time-input-container ${className} label-align--${labelAlign}`;

    let buttons = [];
    if (hourController) buttons.push('hour');
    buttons.push('minute', 'second');

    return (
      <div className={containerClassName}>
        {label && <label>{label}</label>}
        <div className={`time-input ${readonly ? 'readonly' : ''} ${small ? 'small' : ''}`}>
          {readonly === false && (
            <div className="time-input__buttons">
              {buttons.map(name => (
                <div className="time-input__buttons__group" key={name}>
                  <button onClick={() => this.handleButtonClick('plus-ten', name)}>
                    <SVGIcon name="arrow_up_double" />
                  </button>
                  <button onClick={() => this.handleButtonClick('plus-one', name)}>
                    <SVGIcon name="arrow_up" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="time-input__spinner">
            {hourController && (
              <div className="time-input__spinner__hour-wrapper">
                <ul
                  ref={ref => this.hourSpinner = ref}
                  className="time-input__spinner__hour"
                  onScroll={e => this.handleSpinnerScroll(e, 'hour')}
                >
                  {this.renderNumbers('hour')}
                </ul>
              </div>
            )}
            {hourController && <span className="time-input__colon">:</span>}
            <div className="time-input__spinner__minute-wrapper">
              <ul
                ref={ref => this.minuteSpinner = ref}
                className="time-input__spinner__minute"
                onScroll={e => this.handleSpinnerScroll(e, 'minute')}
              >
                {this.renderNumbers('minute')}
              </ul>
            </div>
            <span className="time-input__colon">:</span>
            <div className="time-input__spinner__second-wrapper">
              <ul
                ref={ref => this.secondSpinner = ref}
                className="time-input__spinner__second"
                onScroll={e => this.handleSpinnerScroll(e, 'second')}
              >
                {this.renderNumbers('second')}
              </ul>
            </div>
          </div>
          {readonly === false && (
            <div className="time-input__buttons">
              {buttons.map(name => (
                <div className="time-input__buttons__group" key={name}>
                  <button onClick={() => this.handleButtonClick('minus-ten', name)}>
                    <SVGIcon name="arrow_down_double" />
                  </button>
                  <button onClick={() => this.handleButtonClick('minus-one', name)}>
                    <SVGIcon name="arrow_down" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default TimeInput;