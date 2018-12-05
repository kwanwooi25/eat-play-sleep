import styled from 'styled-components';
import FlexRowDiv from './FlexRowDiv';
import FlexColumnDiv from './FlexColumnDiv';
import ButtonBase from './Button';

const DateTimePicker = styled.div`
  width: 100%;
`;

const InputContainer = styled(FlexRowDiv)`
  justify-content: space-between;
  overflow: hidden;
  width: 100%;

  ${({ theme }) => `
    border: 1px solid ${theme.color[`${theme.primary}${theme.main}`]};
    border-radius: ${theme.space.xs};
  `}
`;

const Input = styled(ButtonBase)`
  flex: 1;
  border-radius: 0;

  ${({ theme }) => `
    font-size: ${theme.fontSize.md};
    padding: ${theme.space.sm};

    &:hover {
      background: ${theme.color[`${theme.primary}${theme.xxlight}`]};
    }
  `}
`;

const Value = styled.span`
  padding: ${({ theme: { space } }) => space.xs};
`;

const NowButton = styled(ButtonBase)`
  align-self: stretch;
  border-radius: 0;

  ${({ theme }) => `
    font-size: ${theme.fontSize.md};
    padding: ${theme.space.sm};
    background: ${theme.color[`${theme.primary}${theme.main}`]};
    color: ${theme.color[`${theme.primary}${theme.textContrast}`]};

    &:hover {
      background: ${theme.color[`${theme.primary}${theme.light}`]};
    }
  `}
`;

const DateTimeDisplay = styled(FlexRowDiv)`
  ${({ theme }) => `
    padding: ${theme.space.sm};
    background: ${theme.color[`${theme.primary}${theme.main}`]};
    color: ${theme.color[`${theme.primary}${theme.textContrast}`]};
  `}
`;

const DatePicker = styled.div`
  padding: ${({ theme: { space } }) => space.sm};
`;

const MonthSelect = styled(FlexRowDiv)``;

const Month = styled.span`
  ${({ theme }) => `
    color: ${theme.color[`${theme.primary}${theme.xdark}`]};
    font-size: ${theme.fontSize.lg};
    font-weight: ${theme.fontWeight.bold};
  `}
`;

const MonthSelectButton = styled(ButtonBase)`
  border-radius: 100%;
  width: 2.5rem;
  height: 2.5rem;

  ${({ theme }) => `
    margin: ${theme.space.xs};

    svg {
      fill: ${theme.color[`${theme.primary}${theme.dark}`]};
    }
  `}
`;

const Calendar = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 2px;
  align-items: center;
  justify-items: center;
`;

const WeekDay = styled.span`
  font-size: ${({ theme: { fontSize } }) => fontSize.sm};
`;

const Day = styled(ButtonBase)`
  padding: 0.5rem;
  width: 100%;

  ${({ theme, prevMonth, nextMonth, selected }) => `
    font-size: ${theme.fontSize.sm};
    &:hover {
      background: ${theme.color[`${theme.primary}${theme.xxlight}`]};
      color: ${theme.color[`${theme.primary}${theme.dark}`]};
    }

    ${prevMonth || nextMonth ? `
      color: ${theme.color[`${theme.grey}${theme.main}`]};
      &:hover {
        background: ${theme.color[`${theme.grey}${theme.xlight}`]};
        color: ${theme.color[`${theme.grey}${theme.main}`]};
      }
    ` : selected ? `
      background: ${theme.color[`${theme.primary}${theme.main}`]};
      color: ${theme.color[`${theme.primary}${theme.textContrast}`]};
    ` : ''}

    &:focus {
      background: ${theme.color[`${theme.primary}${theme.main}`]};
      color: ${theme.color[`${theme.primary}${theme.textContrast}`]};
    }

    &:disabled {
      cursor: default;
      background: ${theme.color[`${theme.grey}${theme.light}`]};
      color: ${theme.color[`${theme.grey}${theme.dark}`]};
    }
  `}
`;

const TimePicker = styled(FlexColumnDiv)``;

const TimePickerControls = styled(FlexRowDiv)`
  width: 100%;
`;

const TimePickerButtonGroup = styled(FlexRowDiv)``;

const TimePickerButton = styled(ButtonBase)`
  border-radius: 0;
  svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  ${({ theme }) => `
    color: ${theme.color[`${theme.primary}${theme.light}`]};
    font-size: ${theme.fontSize.xs};
    padding: ${theme.space.sm};

    svg {
      fill: ${theme.color[`${theme.primary}${theme.xlight}`]};
    }
  `}
`;

const TimePickerNumberContainer = styled(FlexRowDiv)`
  align-items: stretch;

  ${({ theme }) => `
    font-size: ${theme.fontSize.xl};
    font-weight: ${theme.fontWeight.bold};
  `}
`;

const TimePickerNumber = styled(FlexRowDiv)`
  ${({ theme }) => `
    border-top: 1px solid ${theme.color[`${theme.primary}${theme.xxlight}`]};
    border-bottom: 1px solid ${theme.color[`${theme.primary}${theme.xxlight}`]};
    padding: ${theme.space.xs} ${theme.space.md};
    margin: 0 ${theme.space.xs};
  `}
`;

const TimePickerNumberSeperator = styled.span``;

DateTimePicker.InputContainer = InputContainer;
DateTimePicker.Input = Input;
DateTimePicker.Value = Value;
DateTimePicker.NowButton = NowButton;
DateTimePicker.DateTimeDisplay = DateTimeDisplay;
DateTimePicker.DatePicker = DatePicker;
DateTimePicker.DatePicker.MonthSelect = MonthSelect;
DateTimePicker.DatePicker.MonthSelect.Month = Month;
DateTimePicker.DatePicker.MonthSelect.Button = MonthSelectButton;
DateTimePicker.DatePicker.Calendar = Calendar;
DateTimePicker.DatePicker.Calendar.WeekDay = WeekDay;
DateTimePicker.DatePicker.Calendar.Day = Day;
DateTimePicker.TimePicker = TimePicker;
DateTimePicker.TimePicker.Controls = TimePickerControls;
DateTimePicker.TimePicker.ButtonGroup = TimePickerButtonGroup;
DateTimePicker.TimePicker.Button = TimePickerButton;
DateTimePicker.TimePicker.NumberContainer = TimePickerNumberContainer;
DateTimePicker.TimePicker.Number = TimePickerNumber;
DateTimePicker.TimePicker.NumberSeperator = TimePickerNumberSeperator;

export default DateTimePicker;