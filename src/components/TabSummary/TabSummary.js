import React, { Component } from 'react';
import { withTranslate } from 'react-redux-multilingual';

/** Helper functions */
import parseSeconds from '../../helpers/parseSeconds';

class TabSummary extends Component {
  transformDurationToString = seconds => {
    const { translate } = this.props;
    const { h, m, s } = parseSeconds(seconds);

    let durationString = '';
    if (h) durationString += translate('hour', { h });
    if (m) durationString += ' ' + translate('minute', { m });
    if (s) durationString += ' ' + translate('second', { s: s.toFixed(0) });
    
    return durationString.trim();
  }
  generateSummaryContents = activityName => {
    const { translate, trend } = this.props;
    const { breast, bottle, babyfood } = trend;
    let summaryContents = [];

    if (activityName === 'feed') {
      const daysCount = breast.keys.length;
      const totalCount = breast.totalCount + bottle.totalCount + babyfood.totalCount;
      const averageFeedingsPerDay = totalCount / daysCount;
      const averageDurationPerBreastFeeding = 
        this.transformDurationToString(breast.totalDuration / breast.totalCount);
      const averageAmountPerBottleFeeding = bottle.totalAmount / bottle.totalCount;
      const averageAmountPerBabyfoodFeeding = babyfood.totalAmount / babyfood.totalCount;

      summaryContents = [
        {
          title: translate('averageFeedingsPerDay'),
          content: translate('count', { count: averageFeedingsPerDay.toFixed(1) }),
        },
        {
          title: translate('averageDurationPerBreastFeeding'),
          content: averageDurationPerBreastFeeding,
        },
        {
          title: translate('averageAmountPerBottleFeeding'),
          content: `${averageAmountPerBottleFeeding.toFixed(1)} ml`,
        },
        {
          title: translate('averageAmountPerBabyfoodFeeding'),
          content: `${averageAmountPerBabyfoodFeeding.toFixed(1)} ml`,
        },
      ];

    } else if (activityName === 'sleep') {
      const daysCount = trend[activityName].keys.length;
      const averageTimesPerDay = trend[activityName].totalCount / daysCount;
      const averageDurationPerDay = 
        this.transformDurationToString(trend[activityName].totalDuration / daysCount);

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
    } else if (activityName === 'diaper') {
      const daysCount = trend[activityName].keys.length;
      const averageDiapersPerDay = trend[activityName].totalCount / daysCount;
      const averagePeePerDay = trend[activityName].totalPee / daysCount;
      const averagePooPerDay = trend[activityName].totalPoo / daysCount;

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

    return summaryContents;
  }

  renderContents = summary => {
    return summary.map(({ title, content }) => (
      <div key={title} className="tab-summary__item">
        <span className="tab-summary__item__title">
          {title}
        </span>
        <span className="tab-summary__item__content">
          {content}
        </span>
      </div>
    ));
  }

  render() {
    const summaryContents =
      this.generateSummaryContents(this.props.activityName);

    return (
      <div className="tab-summary">
        {this.renderContents(summaryContents)}
      </div>
    )
  }
}

export default withTranslate(TabSummary);