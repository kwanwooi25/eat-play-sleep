import React from 'react';
import { withTranslate } from 'react-redux-multilingual';
import { InlineDateTimePicker } from 'material-ui-pickers';

const CustomDateTimePicker = ({
  translate,
  onNowButtonClick,
  ...props
}) => {
  return (
    <div className="custom-date-time-picker">
      <InlineDateTimePicker onlyCalendar {...props} />
      <button
        className="custom-date-time-picker__button"
        onClick={onNowButtonClick}
      >
        {translate('nowLabel')}
      </button>
    </div>
  )
};

export default withTranslate(CustomDateTimePicker);