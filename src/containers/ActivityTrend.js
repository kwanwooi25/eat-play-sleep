import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';

/** Components */
import RouteContainer from '../components/RouteContainer';
import CustomSelect from '../components/CustomSelect';
import FeedChart from '../components/FeedChart';
import SleepChart from '../components/SleepChart';
import DiaperChart from '../components/DiaperChart';
import GrowthChart from '../components/GrowthChart';
import NoData from '../components/NoData';

/** Styled Components */
import ActivityTrend from '../styled_components/ActivityTrend';

/** Actions */
import * as actions from '../actions';

/** Utils */
import parseSeconds from '../utils/parseSeconds';
import { mlToOz } from '../utils/unitChange';

const RANGE_SELECT_ITEMS = ['one_week', 'two_weeks', 'one_month'];

class ActivityTrendContainer extends Component {
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

  transformDurationToString = seconds => {
    const { translate } = this.props;
    const { h, m, s } = parseSeconds(seconds);

    let durationString = '';
    if (h) durationString += translate('hour', { h });
    if (m) durationString += ' ' + translate('minute', { m });
    if (s) durationString += ' ' + translate('second', { s: s.toFixed(0) });
    
    return durationString.trim();
  }

  renderSummary(trend, activityName, displayActivities, displayUnits) {
    const { translate } = this.props;
    const { feed, sleep, diaper } = trend;

    const shouldRenderBreast = displayActivities.includes('breast');
    const shouldRenderBottle = displayActivities.includes('bottle');
    const shouldRenderBabyfood = displayActivities.includes('babyfood');
    
    let summaryContents = [];

    if (activityName === 'feed' && feed) {
      const { breast, bottle, babyfood } = feed;
      const daysCount = feed.keys.length;

      let totalCount = 0;
      if (shouldRenderBreast) totalCount += breast.totalCount;
      if (shouldRenderBottle) totalCount += bottle.totalCount;
      if (shouldRenderBabyfood) totalCount += babyfood.totalCount;

      const averageFeedingsPerDay = totalCount / daysCount;
      const averageDurationPerBreastFeeding = 
        this.transformDurationToString(breast.totalDuration / breast.totalCount);
      const averageAmountPerBottleFeeding = bottle.totalAmount / bottle.totalCount || 0;
      const averageAmountPerBabyfoodFeeding = babyfood.totalAmount / babyfood.totalCount || 0;

      let averageAmountPerBottleFeedingString = '';
      let averageAmountPerBabyfoodFeedingString = '';
      if (displayUnits.volume === 'oz') {
        averageAmountPerBottleFeedingString =
          `${mlToOz(averageAmountPerBottleFeeding).toFixed(2)} oz`;
        averageAmountPerBabyfoodFeedingString =
          `${mlToOz(averageAmountPerBabyfoodFeeding).toFixed(2)} oz`;
      } else {
        averageAmountPerBottleFeedingString =
          `${averageAmountPerBottleFeeding.toFixed(1)} ml`;
        averageAmountPerBabyfoodFeedingString =
          `${averageAmountPerBabyfoodFeeding.toFixed(1)} ml`;
      }

      summaryContents.push({
        title: translate('averageFeedingsPerDay'),
        content: translate('count', { count: averageFeedingsPerDay.toFixed(1) }),
      });

      if (shouldRenderBreast) {
        summaryContents.push({
          title: translate('averageDurationPerBreastFeeding'),
          content: averageDurationPerBreastFeeding,
        });
      }

      if (shouldRenderBottle) {
        summaryContents.push({
          title: translate('averageAmountPerBottleFeeding'),
          content: averageAmountPerBottleFeedingString,
        });
      }

      if (shouldRenderBabyfood) {
        summaryContents.push({
          title: translate('averageAmountPerBabyfoodFeeding'),
          content: averageAmountPerBabyfoodFeedingString,
        })
      }

    } else if (activityName === 'sleep' && sleep) {
      const daysCount = sleep.keys.length;
      const averageTimesPerDay = sleep.totalCount / daysCount;
      const averageDurationPerDay = 
        this.transformDurationToString(sleep.totalDuration / daysCount);

      summaryContents = [
        {
          title: translate('averageTimesPerDay'),
          content: translate('count', { count: averageTimesPerDay.toFixed(1) }),
        },
        {
          title: translate('averageDurationPerDay'),
          content: averageDurationPerDay,
        },
      ];
    } else if (activityName === 'diaper' && diaper) {
      const daysCount = diaper.keys.length;
      const averageDiapersPerDay = diaper.totalCount / daysCount;
      const averagePeePerDay = diaper.totalPee / daysCount;
      const averagePooPerDay = diaper.totalPoo / daysCount;

      summaryContents = [
        {
          title: translate('averageDiapersPerDay'),
          content: translate('count', { count: averageDiapersPerDay.toFixed(1) }),
        },
        {
          title: translate('averagePeePerDay'),
          content: translate('count', { count: averagePeePerDay.toFixed(1) }),
        },
        {
          title: translate('averagePooPerDay'),
          content: translate('count', { count: averagePooPerDay.toFixed(1) }),
        },
      ]
    }

    return summaryContents.map(({ title, content }) => (
      <ActivityTrend.Box.Row key={title} className="tab-summary__item">
        <span>{title}</span>
        <span>{content}</span>
      </ActivityTrend.Box.Row>
    ));
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

    let rangeSelectOptions = RANGE_SELECT_ITEMS.map(name => ({ value: name, label: translate(name) }));
    
    return (
      <RouteContainer route="stats" baby={currentBaby}>
        <ActivityTrend>
          {activityName !== 'growth' && (
            <CustomSelect
              value={translate(range)}
              options={rangeSelectOptions}
              onChange={this.handleRangeSelectChange}
            />
          )}

          {Boolean(activityName !== 'growth' && shouldRender) && (
            <ActivityTrend.Box>
              {this.renderSummary(trend, activityName, displayActivities, displayUnits)}
            </ActivityTrend.Box>
          )}
          
          {shouldRender ? (
            <ActivityTrend.Box>
              {activityName === 'feed' && (
                <FeedChart
                  source={feed}
                  displayActivities={displayActivities}
                  displayUnits={displayUnits}
                />
              )}
              {activityName === 'sleep' && <SleepChart source={sleep} />}
              {activityName === 'diaper' && <DiaperChart source={diaper} />}
              {activityName === 'growth' && (
                <GrowthChart
                  source={growth}
                  baby={currentBaby}
                  displayUnits={displayUnits}
                />
              )}
            </ActivityTrend.Box>
          ) : (
            <NoData icon="insert_chart" message={translate('noDataForChart')} />
          )}
        </ActivityTrend>
      </RouteContainer>
    )
  }
}

const mapStateToProps = ({ auth, babies, activities }) => {
  return { auth, babies, activities };
}

export default withTranslate(connect(mapStateToProps, actions)(ActivityTrendContainer));