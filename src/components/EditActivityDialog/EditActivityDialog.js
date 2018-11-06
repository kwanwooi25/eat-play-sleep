import moment from 'moment';
import React, { Component } from 'react';
import { withTranslate } from 'react-redux-multilingual';

/** Material UI */
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import CustomDateTimePicker from '../CustomDateTimePicker/CustomDateTimePicker';
import NumberInput from '../NumberInput/NumberInput';
import CustomSelector from '../CustomSelector/CustomSelector';
import CustomTextInput from '../CustomTextInput/CustomTextInput';

/** Helper functions */
import secondsToHMS from '../../helpers/secondsToHMS';

const Transition = props => <Slide direction="up" {...props} />;

const CUSTOM_SELECTOR_OPTIONS = {
  bottle: [ 'breast_milk', 'formula_milk' ],
  diaper: [ 'pee', 'poo', 'peepoo' ],
};

const NUMBER_ATTRIBUTES = {
  amount: { step: 10, min: 0, max: 500 },
  height: { step: 1, min: 0, max: 150 },
  weight: { step: 0.5, min: 0, max: 50 },
  head: { step: 0.5, min: 0, max: 100 },
};

class EditActivityDialog extends Component {
  state = {};

  componentWillReceiveProps(props) {
    this.setState(props.activity);
  }

  handleDateTimeChange = (name, date) => {
    this.setState({ [name]: date });
  }

  setDateTimeToNow = name => {
    this.setState({ [name]: moment() });
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleDurationChange = (name, change) => {
    const step = 60;
    let value = 0;

    if (change === 'minus') value = this.state[name] - step;
    else if (change === 'plus') value = this.state[name] + step;
    
    if (value < 0) value = 0;

    this.setState({ [name]: value }, () => {
      this.setState({
        duration_total: this.state.duration_left + this.state.duration_right
      });
    });
  }

  adjustValue = (name, value) => {
    const { min, max } = NUMBER_ATTRIBUTES[name];

    if (value > min && value <= max) return parseInt(value);
    else if (value <= min) return parseInt(min);
    else if (value > max) return parseInt(max);
  }

  handleNumberInputButtonClick = (name, change) => {
    let value = this.state[name];
    const { step } = NUMBER_ATTRIBUTES[name];
    
    if (change === 'minus') value -= step;
    else if (change === 'plus') value += step;

    value = this.adjustValue(name, value);
    this.setState({ [name]: value });
  }

  render() {
    const {
      translate,
      open,
      onClose,
      activity,
    } = this.props;

    const {
      time_start,
      time_end,
      type,
      amount,
      amount_unit,
      height,
      height_unit,
      weight,
      weight_unit,
      head,
      head_unit,
      memo 
    } = this.state;

    const { name } = activity;
  
    const shouldRenderStartTime =
      ['breast', 'pump', 'bottle', 'babyfood', 'diaper', 'sleep'].includes(name);
    const shouldRenderEndTime = ['bottle', 'sleep'].includes(name);
    const shouldRenderSidesDuration = ['breast', 'pump'].includes(name);
    const shouldRenderAmount = ['pump', 'bottle', 'babyfood'].includes(name);
    const shouldRenderCustomSelector = ['bottle', 'diaper'].includes(name);
    const shouldRenderMenuInput = ['babyfood'].includes(name);
    const shouldRenderHeightInput = ['growth'].includes(name);
    const shouldRenderWeightInput = ['growth'].includes(name);
    const shouldRenderHeadInput = ['growth'].includes(name);
  
    return (
      <Dialog
        open={open}
        onClose={() => { onClose(false) }}
        TransitionComponent={Transition}
        keepMounted
      >
        <div className="edit-activity-dialog">
          <div className="edit-activity-dialog__title">
            <h3>{name && translate(name)}</h3>
          </div>
          <div className="edit-activity-dialog__form">
            {shouldRenderStartTime && (
              <div className="edit-activity-dialog__form__element">
                <label
                  className="edit-activity-dialog__form__element__label"
                  htmlFor="time_start"
                >
                  {translate('time_start')}
                </label>
                <CustomDateTimePicker
                  className="edit-activity-dialog__form__element__date-time-picker"
                  value={time_start}
                  onChange={date => { this.handleDateTimeChange('time_start', date)}}
                  max={time_end}
                />
              </div>
            )}
            {shouldRenderEndTime && (
              <div className="edit-activity-dialog__form__element">
                <label
                  className="edit-activity-dialog__form__element__label"
                  htmlFor="time_end"
                >
                  {translate('time_end')}
                </label>
                <CustomDateTimePicker
                  className="edit-activity-dialog__form__element__date-time-picker"
                  value={time_end}
                  onChange={date => { this.handleDateTimeChange('time_end', date)}}
                  min={time_start}
                />
              </div>
            )}
            {shouldRenderSidesDuration && (
              <div className="edit-activity-dialog__form__element sides-duration">
                {['left', 'right', 'total'].map(side => {
                  const name = `duration_${side}`;
                  return (
                    <NumberInput
                      key={side}
                      label={translate(side)}
                      labelAlign="column"
                      value={secondsToHMS(this.state[name])}
                      onMinus={() => { this.handleDurationChange(name, 'minus')}}
                      onPlus={() => { this.handleDurationChange(name, 'plus')}}
                      readonly={side === 'total'}
                    />
                  )
                })}
              </div>
            )}
            {shouldRenderAmount && (
              <NumberInput
                label={translate('amount')}
                labelAlign="column"
                value={`${amount} ${amount_unit}`}
                onMinus={() => { this.handleNumberInputButtonClick('amount', 'minus') }}
                onPlus={() => { this.handleNumberInputButtonClick('amount', 'plus') }}
              />
            )}
            {shouldRenderCustomSelector && (
              <CustomSelector
                name="type"
                options={CUSTOM_SELECTOR_OPTIONS[name]}
                value={type}
                onChange={this.handleInputChange}
              />
            )}
            {shouldRenderMenuInput && (
              <CustomTextInput
                id="type"
                name="type"
                label={translate('menu')}
                value={type}
                onChange={this.handleInputChange}
              />
            )}{shouldRenderHeightInput && (
              <NumberInput
                label={translate('height')}
                labelAlign="column"
                value={`${height} ${height_unit}`}
                onMinus={() => { this.handleNumberInputButtonClick('height', 'minus') }}
                onPlus={() => { this.handleNumberInputButtonClick('height', 'plus') }}
              />
            )}
            {shouldRenderWeightInput && (
              <NumberInput
                label={translate('weight')}
                labelAlign="column"
                value={`${weight} ${weight_unit}`}
                onMinus={() => { this.handleNumberInputButtonClick('weight', 'minus') }}
                onPlus={() => { this.handleNumberInputButtonClick('weight', 'plus') }}
              />
            )}
            {shouldRenderHeadInput && (
              <NumberInput
                label={translate('head')}
                labelAlign="column"
                value={`${head} ${head_unit}`}
                onMinus={() => { this.handleNumberInputButtonClick('head', 'minus') }}
                onPlus={() => { this.handleNumberInputButtonClick('head', 'plus') }}
              />
            )}
            <CustomTextInput
              id="memo"
              label={translate('memo')}
              name="memo"
              value={memo}
              onChange={this.handleInputChange}
              multiline
            />
          </div>
          <div className="edit-activity-dialog__buttons">
            <button
              className="edit-activity-dialog__buttons__cancel"
              onClick={() => { onClose(false) }}
            >
              {translate('cancel')}
            </button>
            <button
              className="edit-activity-dialog__buttons__confirm"
              onClick={() => { onClose(true) }}
            >
              {translate('confirm')}
            </button>
          </div>
        </div>
      </Dialog>
    )
  }
}

export default withTranslate(EditActivityDialog);