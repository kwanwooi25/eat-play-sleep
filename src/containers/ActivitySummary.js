import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';

/** Styled Components */
import ActivitySummary from '../styled_components/ActivitySummary';

/** Components */
import RouteContainer from '../components/RouteContainer';
import Icon from '../components/Icon';
import CustomDateTimePicker from '../components/CustomDateTimePicker';

/** Actions */
import * as actions from '../actions';

/** Utils */
import parseSeconds from '../utils/parseSeconds';
import { comma } from '../utils/comma';
import { mlToOz } from '../utils/unitChange';

class ActivitySummaryContainer extends Component {
  state = { date: moment() }

  componentDidMount() {
    this.getSummary(this.state.date);
  }

  getSummary = (date = moment()) => {
    const {
      auth: { currentUser },
      babies: { currentBaby },
      getActivitySummaryByDate
    } = this.props;

    getActivitySummaryByDate(currentUser, currentBaby.id, date);
  }

  handleButtonClick = change => {
    let { date } = this.state;

    if (change === 'prev') date = moment(date).subtract(1, 'days');
    else if (change === 'next') date = moment(date).add(1, 'days');

    this.setState({ date }, () => this.getSummary(this.state.date));
  }

  handleDateChange = date => {
    this.setState({ date }, () => this.getSummary(this.state.date));
  }

  renderSummaryContent = (summary, settings) => {
    const { translate } = this.props;
    const { displayActivities, displayUnits } = settings;
    let keys = Object.keys(summary);
    if (displayActivities) {
      keys = keys.filter(name => displayActivities.includes(name));
    }

    return keys.map(name => {
      const { count, amount, duration, pee, poo } = summary[name];

      // generate duration string
      let durationString = '';
      if (duration) {
        const { h, m, s } = parseSeconds(duration);
        if (h) durationString += translate('hour', { h });
        if (m) durationString += ' ' + translate('minute', { m });
        if (s) durationString += ' ' + translate('second', { s });
        durationString.trim();
      }

      // generate amount string
      let amountString = '';
      if (amount) {
        if (displayUnits.volume === 'oz') {
          amountString = `${mlToOz(amount).toFixed(2)} oz`;
        } else {
          amountString = `${comma(amount.toFixed(0))} ml`
        }
      }

      // generate pee-poo string
      const peeString = `${translate('pee')}: ${translate('count', { count: pee })}`;
      const pooString = `${translate('poo')}: ${translate('count', { count: poo })}`;

      return (
        <ActivitySummary.Content.Item key={name} name={name}>
          <ActivitySummary.Content.Item.IconContainer>
            <Icon name={name} />
          </ActivitySummary.Content.Item.IconContainer>

          <ActivitySummary.Content.Item.Details>
            <label>{translate(name)}</label>
            <span>{translate('count', { count })}</span>
            <span style={{ textAlign: 'right' }}>
              {
                Boolean(duration) ? durationString :
                Boolean(amount) ? amountString :
                (Boolean(pee) || Boolean(poo)) ? (
                  <p>{peeString}</p>,
                  <p>{pooString}</p>
                ) : ''
              }
            </span>
          </ActivitySummary.Content.Item.Details>
        </ActivitySummary.Content.Item>
      )
    });
  }

  render() {
    const {
      translate,
      babies: { currentBaby },
      auth: { currentUser : { settings } },
      activities: { summaryByDate }
    } = this.props;
    const { date } = this.state;

    const isToday = moment(date).format('YYYYMMDD') === moment().format('YYYYMMDD');

    return (
      <RouteContainer route="stats" baby={currentBaby}>
        <ActivitySummary>
          <ActivitySummary.Header>
            <ActivitySummary.Header.Button
              onClick={() => this.handleButtonClick('prev')}
            >
              <Icon name="arrow_left" />
            </ActivitySummary.Header.Button>

            <CustomDateTimePicker
              value={date}
              onChange={this.handleDateChange}
              dateFormat={translate('dateFormatLong')}
              timePicker={false}
              showNowButton={false}
              max={moment()}
              removeBottomMargin
            />

            <ActivitySummary.Header.Button
              onClick={() => this.handleButtonClick('next')}
              disabled={isToday}
            >
              <Icon name="arrow_right" />
            </ActivitySummary.Header.Button>
          </ActivitySummary.Header>

          <ActivitySummary.Content>
            {this.renderSummaryContent(summaryByDate, settings)}
          </ActivitySummary.Content>
        </ActivitySummary>
      </RouteContainer>
    )
  }
}

const mapStateToProps = ({ auth, babies, activities }) => {
  return { auth, babies, activities };
}

export default withTranslate(connect(mapStateToProps, actions)(ActivitySummaryContainer));