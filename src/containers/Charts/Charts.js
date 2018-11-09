import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';

/** Material UI Components */
import SwipeableViews from 'react-swipeable-views';

/** Components */
import SVGIcon from '../../components/SVGIcon/SVGIcon';
import ActivitySummary from '../../components/ActivitySummary/ActivitySummary';
import Trend from '../../components/Trend/Trend';

/** Actions */
import * as actions from '../../actions';

const TABS = ['summary', 'feed', 'sleep', 'diaper', 'growth'];
const RANGE_SELECT_ITEMS = ['one_week', 'two_weeks', 'one_month'];

class Charts extends Component {
  state = {
    index: 0,
    date: moment(),
    range: 'one_week', // 'one_week', 'two_weeks', 'one_month'
  }

  componentDidMount() {
    this.getSummary(this.state.date);
    this.getActivityTrendByName('breast');
    this.getActivityTrendByName('bottle');
    this.getActivityTrendByName('babyfood');
    this.getActivityTrendByName('sleep');
    this.getActivityTrendByName('diaper');
    this.getActivityTrendByName('growth');
  }

  getSummary = (date = moment()) => {
    const {
      auth: { currentUser },
      babies: { currentBaby },
      getActivitySummaryByDate
    } = this.props;

    getActivitySummaryByDate(currentUser, currentBaby.id, date);
  }

  getActivityTrendByName = (name, range = 'one_week') => {
    const {
      auth: { currentUser },
      babies: { currentBaby },
      getActivityTrendByName
    } = this.props;
    
    let from = moment().startOf('date');
    if (range === 'one_week') from = from.subtract(6, 'days');
    else if (range === 'two_weeks') from = from.subtract(13, 'days');
    else if (range === 'one_month') from = from.subtract(1, 'months');

    const to = moment().endOf('date');

    getActivityTrendByName(currentUser, currentBaby.id, { name, from, to });
  }

  handleChangeIndex = index => this.setState({ index });

  handleChangeTab = index => this.setState({ index });

  handleDateButtonClick = change => {
    let { date } = this.state;

    if (change === 'prev') date = moment(date).subtract(1, 'days');
    else if (change === 'next') date = moment(date).add(1, 'days');

    this.setState({ date }, () => this.getSummary(this.state.date));
  }

  handleRangeSelectChange = value => {
    const { index, range } = this.state;

    this.setState({ range: value || range }, () => {
      if (TABS[index] === 'feed') {
        this.getActivityTrendByName('breast', this.state.range);
        this.getActivityTrendByName('bottle', this.state.range);
        this.getActivityTrendByName('babyfood', this.state.range);
      } else {
        this.getActivityTrendByName(TABS[index], this.state.range);
      }
    });
  }

  renderTabs = tabs => {
    const { translate } = this.props;

    return tabs.map((tab, index) => {
      const isActive = this.state.index === index;
      const className = isActive ? 'charts__tabs__tab--active' : 'charts__tabs__tab';
      return (
        <button
          key={tab}
          className={className}
          onClick={() => this.handleChangeTab(index)}
        >
          <SVGIcon name={tab} className="charts__tabs__tab__icon" />
          <span className="charts__tabs__tab__label">
            {translate(`${tab}Label`)}
          </span>
        </button>
      )
    })
  }

  render() {
    const {
      translate,
      babies: { currentBaby },
      activities: { summaryByDate, trend },
    } = this.props;
    const { index, date, range } = this.state;

    const isToday = moment(date).format('YYYYMMDD') === moment().format('YYYYMMDD');
    
    const dateString = isToday ?
      translate('today') :
      moment(date).format(translate('dateFormatLong'));

    return (
      <div className="charts">
        <div className="charts__tabs">
          {this.renderTabs(TABS)}
        </div>
        <SwipeableViews
          className="charts__content"
          index={index}
          onChangeIndex={this.handleChangeIndex}
        >
          {TABS.map((tab, index) => {
            if (index === 0) {
              return (
                <ActivitySummary
                  key={tab}
                  isToday={isToday}
                  dateString={dateString}
                  summary={summaryByDate}
                  onButtonClick={this.handleDateButtonClick}
                />
              )
            }

            return (
              <Trend
                key={tab}
                baby={currentBaby}
                activityName={TABS[index]}
                trend={trend}
                menuSelected={range}
                menuItems={RANGE_SELECT_ITEMS}
                onMenuChange={this.handleRangeSelectChange}
              />
            );
          })}
        </SwipeableViews>
      </div>
    )
  }
}

const mapStateToProps = ({ auth, babies, activities }) => {
  return { auth, babies, activities }
}

export default withTranslate(connect(mapStateToProps, actions)(Charts));