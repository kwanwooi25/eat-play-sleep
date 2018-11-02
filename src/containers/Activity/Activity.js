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

  handleInputChange = e => {
    const { name, value } = e.target;
    const { activity, updateCurrentActivity } = this.props;

    this.setState({ [name]: value });
    activity[name] = value;
    updateCurrentActivity(activity);
  }

  handleNumberChange = (name, value) => {
    const { activity, updateCurrentActivity } = this.props;

    activity[name] = value;

    updateCurrentActivity(activity);
  }

  handleDateTimeChange = date => {
    const { activity, updateCurrentActivity } = this.props;

    this.setState({ time_start: date });
    activity.time_start = date;
    updateCurrentActivity(activity);
  }

  setDateTimeToNow = () => {
    const { activity, updateCurrentActivity } = this.props;

    this.setState({ time_start: new Date() });
    activity.time_start = new Date();
    updateCurrentActivity(activity);
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
            variant="outlined"
            format={translate('dateTimeFormat')}
            onNowButtonClick={this.setDateTimeToNow}
          />
        )}
        {shouldRenderAmountInput && (
          <NumberInput
            name="amount"
            unit={amount_unit}
            interval={10}
            value={amount}
            max={300}
            onChange={this.handleNumberChange}
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
            name="height"
            unit={height_unit}
            interval={1}
            value={height}
            max={150}
            onChange={this.handleNumberChange}
          />
        )}
        {shouldRenderWeightInput && (
          <NumberInput
            label={translate('weight')}
            name="weight"
            unit={weight_unit}
            interval={0.5}
            value={weight}
            max={50}
            onChange={this.handleNumberChange}
          />
        )}
        {shouldRenderHeadInput && (
          <NumberInput
            label={translate('head')}
            name="head"
            unit={head_unit}
            interval={0.5}
            value={head}
            max={100}
            onChange={this.handleNumberChange}
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