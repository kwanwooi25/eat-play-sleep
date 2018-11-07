import React from 'react';

/** Material UI Components */
import Icon from '@material-ui/core/Icon';

const TimeInput = ({
  className = '',
  label,
  labelAlign = 'row', // 'row', 'column'
  value,
  hourController = false,
  onHourMinus,
  onHourPlus,
  onMinuteMinus,
  onMinutePlus,
  onSecondMinus,
  onSecondPlus,
  readonly = false
}) => {
  return (
    <div className={`time-input-container ${className} label-align--${labelAlign}`}>
      {label && <label>{label}</label>}
      <div className="time-input">
        <div className="time-input__value">
          {value}
        </div>

        {readonly === false && (
          <div className="time-input__controllers">
            {hourController && (
              <div className="time-input__buttons">
                <button
                  className="time-input__buttons__button"
                  onClick={onHourPlus}
                >
                  <Icon color="inherit">add</Icon>
                </button>
                <button
                  className="time-input__buttons__button"
                  onClick={onHourMinus}
                >
                  <Icon color="inherit">remove</Icon>
                </button>
              </div>
            )}
            <div className="time-input__buttons">
              <button
                className="time-input__buttons__button"
                onClick={onMinutePlus}
              >
                <Icon color="inherit">add</Icon>
              </button>
              <button
                className="time-input__buttons__button"
                onClick={onMinuteMinus}
              >
                <Icon color="inherit">remove</Icon>
              </button>
            </div>
            <div className="time-input__buttons">
              <button
                className="time-input__buttons__button"
                onClick={onSecondPlus}
              >
                <Icon color="inherit">add</Icon>
              </button>
              <button
                className="time-input__buttons__button"
                onClick={onSecondMinus}
              >
                <Icon color="inherit">remove</Icon>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TimeInput;