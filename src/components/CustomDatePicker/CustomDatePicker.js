import React from 'react';
import { InlineDatePicker } from 'material-ui-pickers';

const CustomDatePicker = ({ className = '', ...props }) => {
  return (
    <div className={`custom-date-picker ${className}`}>
      <InlineDatePicker onlyCalendar {...props} />
    </div>
  )
}

export default CustomDatePicker;