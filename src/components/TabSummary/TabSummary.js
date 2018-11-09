import React, { Component } from 'react';
import { withTranslate } from 'react-redux-multilingual';

/** Helper functions */
import parseSeconds from '../../helpers/parseSeconds';

class TabSummary extends Component {
  generateSummaryContents = activityName => {
    const { translate, trend } = this.props;
    const { breast, bottle, babyfood } = trend;
    let summaryContents = [];

    if (activityName === 'feed') {
      const daysCount = breast.keys.length;
      const totalCount = breast.totalCount + bottle.totalCount + babyfood.totalCount;
      const averageFeedingsPerDay = totalCount / daysCount;
      const averageDurationPerBreastFeeding = breast.totalDuration / breast.totalCount;
      const averageAmountPerBottleFeeding = bottle.totalAmount / bottle.totalCount;
      const averageAmountPerBabyfoodFeeding = babyfood.totalAmount / babyfood.totalCount;
  
      const { h, m, s } = parseSeconds(averageDurationPerBreastFeeding);
      let durationString = '';
      if (h) durationString += translate('hour', { h: h.toFixed(0) });
      if (m) durationString += ' ' + translate('minute', { m: m.toFixed(0) });
      if (s) durationString += ' ' + translate('second', { s: s.toFixed(0) });

      summaryContents = [
        {
          title: translate('averageFeedingsPerDay'),
          content: averageFeedingsPerDay.toFixed(1),
        },
        {
          title: translate('averageDurationPerBreastFeeding'),
          content: durationString.trim(),
        },
        {
          title: translate('averageAmountPerBottleFeeding'),
          content: averageAmountPerBottleFeeding.toFixed(1),
        },
        {
          title: translate('averageAmountPerBabyfoodFeeding'),
          content: averageAmountPerBabyfoodFeeding.toFixed(1),
        },
      ];
    } else {

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