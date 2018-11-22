import moment from 'moment';
import React, { Component } from 'react';
import { withTranslate } from 'react-redux-multilingual';

/** Material UI */
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';

/** Components */
import CustomDateTimePicker from '../CustomDateTimePicker/CustomDateTimePicker';
import NumberInput from '../NumberInput/NumberInput';
import TimeInput from '../TimeInput/TimeInput';
import CustomSelector from '../CustomSelector/CustomSelector';
import CustomTextInput from '../CustomTextInput/CustomTextInput';
import DialogButtonGroup from '../DialogButtonGroup/DialogButtonGroup';

const Transition = props => <Slide direction="up" {...props} />;

const CUSTOM_SELECTOR_OPTIONS = {
  bottle: [ 'breast_milk', 'formula_milk' ],
  diaper: [ 'pee', 'poo', 'peepoo' ],
};

class EditActivityDialog extends Component {
  state = {};

  componentWillReceiveProps(props) {
    this.setState(props.activity);
  }

  handleChange = () => this.props.onChange(this.state);

  handleDateTimeChange = (name, date) => {
    this.setState({ [name]: date }, () => this.handleChange());
  }

  setDateTimeToNow = name => {
    this.setState({ [name]: moment() }, () => this.handleChange());
  }

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value }, () => this.handleChange());
  }
  
  handleNumberInputChange = (name, value) => {
    this.setState({ [name]: value }, () => this.handleChange());
  }

  handleDurationChange = (name, value) => {
    this.setState({ [name]: value }, () => {
      if (name !== 'duration_total') {
        this.setState({
          duration_total: this.state.duration_left + this.state.duration_right
        }, () => this.handleChange());
      } else {
        this.handleChange();
      }
    });
  }

  render() {
    const {
      translate,
      open,
      onClose,
      activity,
      displayUnits,
    } = this.props;

    const {
      time_start,
      type,
      amount,
      height,
      weight,
      head,
      memo 
    } = this.state;

    const { name } = activity;
  
    const shouldRenderSidesDuration = ['breast', 'pump'].includes(name);
    const shouldRenderDuration = ['bottle', 'sleep'].includes(name);
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
        scroll="body"
      >
        <div className="edit-activity-dialog">
          <div className="edit-activity-dialog__title">
            <h3>{name && translate(name)}</h3>
          </div>
          <div className="edit-activity-dialog__form">
            <CustomDateTimePicker
              className="edit-activity-dialog__form__element__date-time-picker"
              value={time_start}
              onChange={date => this.handleDateTimeChange('time_start', date)}
            />
            {shouldRenderSidesDuration && (
              <div className="edit-activity-dialog__form__element">
                <div className="edit-activity-dialog__form__element__row">
                  {['left', 'right'].map(side => {
                    const name = `duration_${side}`;
                    return (
                      <TimeInput
                        key={side}
                        label={translate(side)}
                        labelAlign="column"
                        value={this.state[name]}
                        onChange={value => this.handleDurationChange(name, value)}
                        small
                      />
                    )
                  })}
                </div>
                <TimeInput
                  key={'total'}
                  label={translate('total')}
                  labelAlign="column"
                  value={this.state.duration_total}
                  onChange={value => this.handleDurationChange('duration_total', value)}
                  hourController
                  readonly
                />
              </div>
            )}
            {shouldRenderDuration && (
              <TimeInput
                value={this.state.duration_total}
                hourController={name === 'sleep'}
                onChange={value => this.handleDurationChange('duration_total', value)}
              />
            )}
            {shouldRenderAmount && (
              <NumberInput
                label={translate('amount')}
                labelAlign="column"
                value={amount}
                unit={displayUnits.volume}
                maxValue={displayUnits.volume === 'ml' ? 500 : 20}
                showDecimal={displayUnits.volume === 'oz'}
                onChange={value => this.handleNumberInputChange('amount', value)}
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
            )}
            {shouldRenderHeightInput && (
              <NumberInput
                label={translate('height')}
                labelAlign="column"
                value={height}
                unit={displayUnits.length}
                maxValue={displayUnits.length === 'cm' ? 140 : 60}
                showDecimal
                onChange={value => this.handleNumberInputChange('height', value)}
              />
            )}
            {shouldRenderWeightInput && (
              <NumberInput
                label={translate('weight')}
                labelAlign="column"
                value={weight}
                unit={displayUnits.weight}
                maxValue={displayUnits.weight === 'lb' ? 70 : 40}
                showDecimal
                onChange={value => this.handleNumberInputChange('weight', value)}
              />
            )}
            {shouldRenderHeadInput && (
              <NumberInput
                label={translate('head')}
                labelAlign="column"
                value={head}
                unit={displayUnits.length}
                maxValue={displayUnits.length === 'cm' ? 60 : 40}
                showDecimal
                onChange={value => this.handleNumberInputChange('head', value)}
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
          <DialogButtonGroup
            variant="confirm"
            cancelLabel={translate('cancel')}
            confirmLabel={translate('confirm')}
            onCancel={() => onClose(false)}
            onConfirm={() => onClose(true, this.state)}
          />
        </div>
      </Dialog>
    )
  }
}

export default withTranslate(EditActivityDialog);