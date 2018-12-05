import moment from 'moment';
import React, { Component } from 'react';
import { withTranslate } from 'react-redux-multilingual';

/** Material UI Components */
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';

/** Components */
import Icon from './Icon';

/** Styled Components */
import FormElement from '../styled_components/shared/FormElement';
import DateTimePicker from '../styled_components/shared/DateTimePicker';
import DialogContents from '../styled_components/shared/DialogContents';

/** Contstants */
const WEEKDAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

const Transition = props => <Slide direction="down" {...props} />;

class CustomDateTimePicker extends Component {
  constructor(props) {
    super(props);

    const date = moment(props.value) || moment();

    this.state = { isPickerOpen: false, date };
  }

  componentWillReceiveProps(props) {
    if (props.value) this.setState({ date: moment(props.value) });
  }

  openPicker = () => this.setState({ isPickerOpen: true });

  handlePickerClose = result => {
    const { onChange, value } = this.props;
    const { date } = this.state;

    if (result) {
      onChange(date);
      this.setState({ isPickerOpen: false });
    } else {
      onChange(value);
      this.setState({ isPickerOpen: false, date: moment(value) });
    }
  }

  handleNowButtonClick = () => {
    this.props.onChange(moment());
    this.setState({ date: moment() });
  }

  handleMonthClick = change => {
    let { date } = this.state;

    if (change === 'prev') date = moment(date).subtract(1, 'months');
    else if (change === 'next') date = moment(date).add(1, 'months');

    this.setState({ date });
  }

  handleDateClick = clicked => {
    let { date } = this.state;
    const parsed = clicked.split('-');
    const year = parsed[0];
    const month = parsed[1] - 1;
    const day = parsed[2];

    this.setState({ date: date.year(year).month(month).date(day) });
  }

  handleTimeButtonClick = (change, name) => {
    let { date } = this.state;
    let hour = date.hour();
    let minute = date.minute();
    let modifier = 0;

    if (change === 'plus-ten') modifier = 10;
    else if (change === 'plus-one') modifier = 1;
    else if (change === 'minus-one') modifier = -1;
    else if (change === 'minus-ten') modifier = -10;

    if (name === 'hour') {
      hour += modifier;
      if (hour >= 24) hour = 23;
      else if (hour <= 0) hour = 0;
    } else if (name === 'minute') {
      minute += modifier;
      if (minute >= 60) minute = 59;
      else if (minute <= 0) minute = 0;
    }

    this.setState({ date: date.hour(hour).minute(minute) });
  }

  renderCalendarDays = (date, min, max) => {
    const startOfMonth = moment(date).startOf('month');
    const endOfMonth = moment(date).endOf('month');
    const dayOfStartOfMonth = startOfMonth.weekday();
    const dayOfEndOfMonth = endOfMonth.weekday();
    const startOfCalendar = startOfMonth.subtract(dayOfStartOfMonth, 'days');
    const endOfCalendar = endOfMonth.add(6 - dayOfEndOfMonth, 'days');
    let calendarDates = [];

    for (let i = startOfCalendar; i <= endOfCalendar; i.add(1, 'days')) {
      calendarDates.push(i.format('YYYY-MM-DD'));
    }

    return calendarDates.map(dateToRender => {
      const selected = moment(date);
      const current = moment(dateToRender);
      let isValid = true;
      if (min) isValid = isValid && current.startOf('date') >= moment(min).startOf('date');
      if (max) isValid = isValid && current.startOf('date') <= moment(max).startOf('date');

      return (
        <DateTimePicker.DatePicker.Calendar.Day
          key={dateToRender}
          onClick={() => { this.handleDateClick(dateToRender) }}
          disabled={isValid === false}
          prevMonth={selected.month() > current.month()}
          nextMonth={selected.month() < current.month()}
          selected={selected.format('YYYY-MM-DD') === dateToRender}
        >
          {current.date()}
        </DateTimePicker.DatePicker.Calendar.Day>
      )
    })
  }

  render() {
    const {
      isPickerOpen,
      date,
    } = this.state;
    const {
      label,
      labelAlign = 'column',
      value = moment(),
      translate,
      datePicker = true,
      dateFormat = translate('dateFormat'),
      timePicker = true,
      timeFormat = translate('timeFormat'),
      showNowButton = true,
      removeBottomMargin = false,
      fullWidth = false,
      min,
      max,
    } = this.props;

    return (
        <FormElement labelAlign={labelAlign} bottomMargin={!removeBottomMargin}>
          {label && <FormElement.Label>{label}</FormElement.Label>}
          <DateTimePicker.InputContainer fullWidth={fullWidth}>
            <DateTimePicker.Input onClick={this.openPicker}>
              {datePicker && (
                <DateTimePicker.Value>
                  {moment(value).format(dateFormat)}
                </DateTimePicker.Value>
              )}
              {timePicker && (
                <DateTimePicker.Value>
                  {moment(value).format(timeFormat)}
                </DateTimePicker.Value>
              )}
            </DateTimePicker.Input>
            {showNowButton && (
              <DateTimePicker.NowButton onClick={this.handleNowButtonClick}>
                {translate('nowLabel')}
              </DateTimePicker.NowButton>
            )}
          </DateTimePicker.InputContainer>
          
          <Dialog
            open={isPickerOpen}
            onClose={this.handlePickerClose}
            TransitionComponent={Transition}
            keepMounted
          >
            <DateTimePicker.DateTimeDisplay>
              {datePicker && (
                <DateTimePicker.Value>
                  {date.format(translate('dateFormat'))}
                </DateTimePicker.Value>
              )}
              {timePicker && (
                <DateTimePicker.Value>
                  {date.format(translate('timeFormat'))}
                </DateTimePicker.Value>
              )}
            </DateTimePicker.DateTimeDisplay>

            {datePicker && (
              <DateTimePicker.DatePicker>
                <DateTimePicker.DatePicker.MonthSelect>
                  <DateTimePicker.DatePicker.MonthSelect.Button
                    onClick={() => this.handleMonthClick('prev')}
                  >
                    <Icon name="arrow_left" />
                  </DateTimePicker.DatePicker.MonthSelect.Button>
                  <DateTimePicker.DatePicker.MonthSelect.Month>
                    {date.format(translate('yearMonthFormat'))}
                  </DateTimePicker.DatePicker.MonthSelect.Month>
                  <DateTimePicker.DatePicker.MonthSelect.Button
                    onClick={() => this.handleMonthClick('next')}
                  >
                    <Icon name="arrow_right" />
                  </DateTimePicker.DatePicker.MonthSelect.Button>
                </DateTimePicker.DatePicker.MonthSelect>
                <DateTimePicker.DatePicker.Calendar>
                  {WEEKDAYS.map(weekday => (
                    <DateTimePicker.DatePicker.Calendar.WeekDay key={weekday}>
                      {translate(weekday)}
                    </DateTimePicker.DatePicker.Calendar.WeekDay>
                  ))}
                  {this.renderCalendarDays(date, min, max)}
                </DateTimePicker.DatePicker.Calendar>
              </DateTimePicker.DatePicker>
            )}

            {timePicker && (
              <DateTimePicker.TimePicker>
                <DateTimePicker.TimePicker.Controls>
                  {['hour', 'minute'].map(name => (
                    <DateTimePicker.TimePicker.ButtonGroup key={name}>
                      <DateTimePicker.TimePicker.Button
                        onClick={() => this.handleTimeButtonClick('plus-ten', name)}
                      >
                        <Icon name="arrow_up_double"/>
                      </DateTimePicker.TimePicker.Button>
                      <DateTimePicker.TimePicker.Button
                        onClick={() => this.handleTimeButtonClick('plus-one', name)}
                      >
                        <Icon name="arrow_up"/>
                      </DateTimePicker.TimePicker.Button>
                    </DateTimePicker.TimePicker.ButtonGroup>
                  ))}
                </DateTimePicker.TimePicker.Controls>
                <DateTimePicker.TimePicker.NumberContainer>
                  <DateTimePicker.TimePicker.Number>
                    {date.format('HH')}
                  </DateTimePicker.TimePicker.Number>
                  <DateTimePicker.TimePicker.NumberSeperator>
                    :
                  </DateTimePicker.TimePicker.NumberSeperator>
                  <DateTimePicker.TimePicker.Number>
                    {date.format('mm')}
                  </DateTimePicker.TimePicker.Number>
                </DateTimePicker.TimePicker.NumberContainer>
                <DateTimePicker.TimePicker.Controls>
                  {['hour', 'minute'].map(name => (
                    <DateTimePicker.TimePicker.ButtonGroup key={name}>
                      <DateTimePicker.TimePicker.Button
                        onClick={() => this.handleTimeButtonClick('minus-ten', name)}
                      >
                        <Icon name="arrow_down_double"/>
                      </DateTimePicker.TimePicker.Button>
                      <DateTimePicker.TimePicker.Button
                        onClick={() => this.handleTimeButtonClick('minus-one', name)}
                      >
                        <Icon name="arrow_down"/>
                      </DateTimePicker.TimePicker.Button>
                    </DateTimePicker.TimePicker.ButtonGroup>
                  ))}
                </DateTimePicker.TimePicker.Controls>
              </DateTimePicker.TimePicker>
            )}

            <DialogContents.ButtonGroup>
              <DialogContents.Button
                onClick={() => this.handlePickerClose(false)}
                cancel
              >
                {translate('cancel')}
              </DialogContents.Button>
              <DialogContents.Button onClick={() => this.handlePickerClose(true)}>
                {translate('confirm')}
              </DialogContents.Button>
            </DialogContents.ButtonGroup>
          </Dialog>
        </FormElement>

    )
  }
}

export default withTranslate(CustomDateTimePicker);