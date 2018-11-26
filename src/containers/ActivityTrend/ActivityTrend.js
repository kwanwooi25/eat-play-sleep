import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';

/** Components */
import TabSummary from '../../components/TabSummary/TabSummary';
import MenuSelector from '../../components/MenuSelector/MenuSelector';
import FeedChart from '../../components/FeedChart/FeedChart';
import SleepChart from '../../components/SleepChart/SleepChart';
import DiaperChart from '../../components/DiaperChart/DiaperChart';
import GrowthChart from '../../components/GrowthChart/GrowthChart';
import NoData from '../../components/NoData/NoData';

/** Actions */
import * as actions from '../../actions';

const RANGE_SELECT_ITEMS = ['one_week', 'two_weeks', 'one_month'];

class ActivityTrend extends Component {
  state = {
    range: 'one_week', // 'one_week', 'two_weeks', 'one_month'
  }

  componentDidMount() {
    const { activityName } = this.props;
    const { range } = this.state;
    this.getActivityTrendByName(activityName, range);
  }

  getActivityTrendByName = (name, range = 'one_week') => {
    const {
      auth: { currentUser },
      babies: { currentBaby },
      getActivityTrendByName
    } = this.props;
    
    let from = moment().startOf('date');
    if (name === 'growth') from = from.subtract(3, 'months');
    else if (range === 'one_week') from = from.subtract(6, 'days');
    else if (range === 'two_weeks') from = from.subtract(13, 'days');
    else if (range === 'one_month') from = from.subtract(1, 'months');

    let to = moment().endOf('date');
    if (name === 'growth') to = to.add(2, 'months');
    
    let names = [name];
    if (name === 'feed') names = ['breast', 'bottle', 'babyfood'];
    getActivityTrendByName(currentUser, currentBaby.id, { names, from, to });
  }

  handleRangeSelectChange = value => {
    const { range } = this.state;
    const { activityName } = this.props;

    this.setState({ range: value || range }, () => {
      this.getActivityTrendByName(activityName, this.state.range);
    });
  }

  render() {
    const {
      translate,
      activityName,
      auth: { currentUser : { settings: { displayActivities, displayUnits } } },
      babies: { currentBaby },
      activities: { trend },
    } = this.props;
    const { range } = this.state;

    const { feed, sleep, diaper, growth } = trend;

    let shouldRender = true;
    if (activityName === 'feed') {
      shouldRender =
        shouldRender && 
        feed &&
        (
          (feed.breast && feed.breast.totalCount) ||
          (feed.bottle && feed.bottle.totalCount) ||
          (feed.babyfood && feed.babyfood.totalCount)
        );
    } else {
      shouldRender = 
        shouldRender &&
        trend[activityName] &&
        trend[activityName].totalCount;
    }

    if (shouldRender) {
      return (
        <div className="activity-trend">
          {activityName !== 'growth' && (
            <div className="activity-trend__controls">
              <div className="activity-trend__controls__range">
                <span>{translate('forThePast')}</span>
                <MenuSelector
                  buttonClassName="activity-trend__controls__range__button"
                  menuSelected={range}
                  menuItems={RANGE_SELECT_ITEMS}
                  onChange={this.handleRangeSelectChange}
                />
                <span>{translate('while')}</span>
              </div>
              <TabSummary
                activityName={activityName}
                trend={trend}
                displayActivities={displayActivities}
                displayUnits={displayUnits}
              />
            </div>
          )}
  
          <div className="activity-trend__chart">
            {activityName === 'feed' && (
              <FeedChart
                source={feed}
                displayActivities={displayActivities}
                displayUnits={displayUnits}
              />
            )}
            {/* {activityName === 'sleep' && <DurationChart source={sleep} />} */}
            {activityName === 'sleep' && <SleepChart source={sleep} />}
            {activityName === 'diaper' && <DiaperChart source={diaper} />}
            {activityName === 'growth' && (
              <GrowthChart
                source={growth}
                baby={currentBaby}
                displayUnits={displayUnits}
              />
            )}
          </div>
        </div>
      )
    } else {
      return <NoData icon="insert_chart" message={translate('noDataForChart')} />
    }

  }
}

const mapStateToProps = ({ auth, babies, activities }) => {
  return { auth, babies, activities };
}

export default withTranslate(connect(mapStateToProps, actions)(ActivityTrend));