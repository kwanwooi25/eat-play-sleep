import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';

/** Material UI Components */
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';

/** Components */
import ActivityTimer from '../../components/ActivityTimer/ActivityTimer';
import ActivityTimerMulti from '../../components/ActivityTimerMulti/ActivityTimerMulti';
import CustomSelector from '../../components/CustomSelector/CustomSelector';
import NumberInput from '../../components/NumberInput/NumberInput';
import CustomDateTimePicker from '../../components/CustomDateTimePicker/CustomDateTimePicker';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';

/** Actions */
import * as actions from '../../actions';

const Transition = props => <Slide direction="left" {...props} />;

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

class Activity extends Component {
  constructor(props) {
    super(props);

    const {
      time_start = null,
      type = '',
      amount = 0,
      amount_unit = 'ml',
      height = 0,
      height_unit = 'cm',
      weight = 0,
      weight_unit = 'kg',
      head = 0,
      head_unit = 'cm',
      memo
    } = props.activity;

    this.state = {
      time_start,
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
    }
  }

  adjustValue = (name, value) => {
    const { min, max } = NUMBER_ATTRIBUTES[name];

    if (value > min && value <= max) return value;
    else if (value <= min) return min;
    else if (value > max) return max;
  }

  handleInputChange = e => {
    let { name, value } = e.target;
    const { activity, updateActivityInProgress } = this.props;

    this.setState({ [name]: value });
    activity[name] = value;
    updateActivityInProgress(activity);
  }

  handleNumberInputButtonClick = (name, change) => {
    const { activity, updateActivityInProgress } = this.props;
    let value = this.state[name];
    const { step } = NUMBER_ATTRIBUTES[name];
    
    if (change === 'minus') value -= step;
    else if (change === 'plus') value += step;

    value = this.adjustValue(name, value);
    this.setState({ [name]: value });
    activity[name] = value;
    updateActivityInProgress(activity);
  }

  handleDateTimeChange = date => {
    const { activity, updateActivityInProgress } = this.props;

    this.setState({ time_start: date });
    activity.time_start = date;
    updateActivityInProgress(activity);
  }

  setDateTimeToNow = () => {
    const { activity, updateActivityInProgress } = this.props;

    this.setState({ time_start: moment() });
    activity.time_start = moment();
    updateActivityInProgress(activity);
  }

  renderContent = () => {
    const { translate, activity } = this.props;
    const { name } = activity;
    const {
      time_start,
      amount,
      amount_unit,
      height,
      height_unit,
      weight,
      weight_unit,
      head,
      head_unit,
      type,
      memo
    } = this.state;

    const shouldRenderActivityTimerMulti = ['breast', 'pump'].includes(name);
    const shouldRenderActivityTimer = ['bottle', 'sleep'].includes(name);
    const shouldRenderDateTimePicker = ['babyfood', 'diaper', 'growth'].includes(name);
    const shouldRenderAmountInput = ['pump', 'bottle', 'babyfood'].includes(name);
    const shouldRenderCustomSelector = ['bottle', 'diaper'].includes(name);
    const shouldRenderMenuInput = ['babyfood'].includes(name);
    const shouldRenderHeightInput = ['growth'].includes(name);
    const shouldRenderWeightInput = ['growth'].includes(name);
    const shouldRenderHeadInput = ['growth'].includes(name);

    return (
      <div className="activity__content">
        {shouldRenderActivityTimerMulti && <ActivityTimerMulti activity={activity} />}
        {shouldRenderActivityTimer && <ActivityTimer activity={activity} />}
        {shouldRenderDateTimePicker && (
          <CustomDateTimePicker
            value={time_start}
            onChange={this.handleDateTimeChange}
          />
        )}
        {shouldRenderAmountInput && (
          <NumberInput
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
        )}
        {shouldRenderHeightInput && (
          <NumberInput
            label={translate('height')}
            value={`${height} ${height_unit}`}
            onMinus={() => { this.handleNumberInputButtonClick('height', 'minus') }}
            onPlus={() => { this.handleNumberInputButtonClick('height', 'plus') }}
          />
        )}
        {shouldRenderWeightInput && (
          <NumberInput
            label={translate('weight')}
            value={`${weight} ${weight_unit}`}
            onMinus={() => { this.handleNumberInputButtonClick('weight', 'minus') }}
            onPlus={() => { this.handleNumberInputButtonClick('weight', 'plus') }}
          />
        )}
        {shouldRenderHeadInput && (
          <NumberInput
            label={translate('head')}
            value={`${head} ${head_unit}`}
            onMinus={() => { this.handleNumberInputButtonClick('head', 'minus') }}
            onPlus={() => { this.handleNumberInputButtonClick('head', 'plus') }}
          />
        )}
        <CustomTextInput
          className="activity__content__memo"
          id="memo"
          label={translate('memo')}
          name="memo"
          value={memo}
          onChange={this.handleInputChange}
          multiline
        />
      </div>
    );
  }

  render() {
    const { onBack, onCancel, onSave, error, closeSnackbar } = this.props;
    const { title } = this.props.activity;

    return (
      <div className="activity">
        <div className="activity__title">
          <h2>{title}</h2>
          <IconButton color="inherit" onClick={onBack} aria-label="Back">
            <Icon>arrow_back</Icon>
          </IconButton>
        </div>

        {this.renderContent()}

        <div className="activity__buttons">
          <button
            className="activity__buttons__cancel"
            onClick={onCancel}
          >
            <Icon>clear</Icon>
          </button>
          <button
            className="activity__buttons__confirm"
            onClick={onSave}
          >
            <Icon>check</Icon>
          </button>
        </div>

        <Snackbar
          className="snackbar error"
          open={!!error}
          autoHideDuration={2000}
          onClose={closeSnackbar}
          TransitionComponent={Transition}
          message={<span>{error}</span>}
        />
      </div>
    )
  }
}

export default withTranslate(connect(null, actions)(Activity));