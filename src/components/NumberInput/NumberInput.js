import React from 'react';

/** Material UI Components */
import Icon from '@material-ui/core/Icon';

const NumberInput = ({
  className = '',
  label,
  labelAlign = 'row', // 'row', 'column'
  value,
  onMinus,
  onPlus,
  readonly = false
}) => {
  return (
    <div className={`number-input-container ${className} label-align--${labelAlign}`}>
      {label && <label>{label}</label>}
      <div className="number-input">
        {readonly === false && (
          <button
            className="number-input__button"
            onClick={onMinus}
          >
            <Icon color="inherit">remove</Icon>
          </button>
        )}

        <div className="number-input__value">
          {value}
        </div>

        {readonly === false && (
          <button
            className="number-input__button"
            onClick={onPlus}
          >
            <Icon color="inherit">add</Icon>
          </button>
        )}
      </div>
    </div>
  )
}

export default NumberInput;