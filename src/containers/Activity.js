import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';

/** Components */
import Icon from '../components/Icon';
import ActivityTimer from '../components/ActivityTimer';
import CustomDateTimePicker from '../components/CustomDateTimePicker';
import CustomSelector from '../components/CustomSelector';
import NumberInput from '../components/NumberInput';
import CustomTextInput from '../components/CustomTextInput';

/** Actions */
import * as actions from '../actions';

/** Styled Components */
import Activity from '../styled_components/Activity';

/** Constants */
const CUSTOM_SELECTOR_OPTIONS = {
  bottle: [ 'breast_milk', 'formula_milk' ],
  diaper: [ 'pee', 'poo', 'peepoo' ],
};

class ActivityContainer extends Component {
  constructor(props) {
    super(props);

    const {
      time_start = null,
      type = '',
      amount = 0,
      height = 0,
      weight = 0,
      head = 0,
      memo
    } = props.activity;

    this.state = {
      time_start,
      type,
      amount,
      height,
      weight,
      head,
      memo
    }
  }

  handleInputChange = e => {
    let { name, value } = e.target;
    const { activity, updateActivityInProgress } = this.props;

    this.setState({ [name]: value });
    activity[name] = value;
    updateActivityInProgress(activity);
  }

  handleNumberInputChange = (name, value) => {
    const { activity, updateActivityInProgress } = this.props;
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
    const {
      translate,
      activity,
      auth: { currentUser : { settings: { displayUnits } } },
    } = this.props;
    const { name } = activity;
    const {
      time_start,
      amount,
      height,
      weight,
      head,
      type,
      memo
    } = this.state;

    const shouldRenderActivityTimer = ['breast', 'bottle', 'pump', 'sleep'].includes(name);
    const shouldRenderDateTimePicker = ['babyfood', 'diaper', 'growth'].includes(name);
    const shouldRenderAmountInput = ['pump', 'bottle', 'babyfood'].includes(name);
    const shouldRenderCustomSelector = ['bottle', 'diaper'].includes(name);
    const shouldRenderMenuInput = ['babyfood'].includes(name);
    const shouldRenderHeightInput = ['growth'].includes(name);
    const shouldRenderWeightInput = ['growth'].includes(name);
    const shouldRenderHeadInput = ['growth'].includes(name);

    return (
      <Activity.Content>
        {shouldRenderActivityTimer && (
          <ActivityTimer
            activity={activity}
            multi={name === 'breast' || name === 'pump'}
          />
        )}
        {shouldRenderDateTimePicker && (
          <CustomDateTimePicker
            value={time_start}
            onChange={this.handleDateTimeChange}
          />
        )}
        {shouldRenderAmountInput && (
          <NumberInput
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
            labelAlign="row"
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
            labelAlign="row"
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
            labelAlign="row"
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
      </Activity.Content>
    );
  }

  render() {
    const { translate, onBack, onCancel, onSave } = this.props;
    const { title } = this.props.activity;

    return (
      <Activity>
        <Activity.Header>
          {/* <Activity.Header.Wrapper> */}
            <Activity.Header.Title>{title}</Activity.Header.Title>
            <Activity.Header.Button onClick={onBack}>
              <Icon name="arrow_down" />
            </Activity.Header.Button>
          {/* </Activity.Header.Wrapper> */}
        </Activity.Header>

        {this.renderContent()}

        <Activity.ButtonGroup>
          <Activity.Button onClick={onCancel} cancel>
            {translate('cancel')}
          </Activity.Button>
          <Activity.Button onClick={onSave}>
            {translate('save')}
          </Activity.Button>
        </Activity.ButtonGroup>
      </Activity>
    )
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default withTranslate(connect(mapStateToProps, actions)(ActivityContainer));