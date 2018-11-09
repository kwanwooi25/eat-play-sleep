import React from 'react';
import { withTranslate } from 'react-redux-multilingual';

/** Components */
import SVGIcon from '../../components/SVGIcon/SVGIcon';

/** Helper functions */
import parseSeconds from '../../helpers/parseSeconds';
import { comma } from '../../helpers/comma';

const ActivitySummary = ({
  translate,
  isToday,
  dateString,
  summary,
  onButtonClick,
}) => {
  const renderSummary = summary => {
    return Object.keys(summary).map(name => {
      const { count, amount, amount_unit, duration, pee, poo } = summary[name];

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
      const amountString = `${comma(amount)} ${amount_unit}`;

      // generate pee-poo string
      const peeString = `${translate('pee')}: ${translate('count', { count: pee })}`;
      const pooString = `${translate('poo')}: ${translate('count', { count: poo })}`;

      return (
        <div key={name} className={`activity-summary__info__item ${name}`}>
          <div className="activity-summary__info__item__icon">
            <SVGIcon name={name} />
          </div>
          <div className="activity-summary__info__item__details">
            <div className="activity-summary__info__item__details__name">
              {translate(name)}
            </div>
            <div className="activity-summary__info__item__details__count">
              {translate('count', { count })}
            </div>
            {Boolean(duration) && (
              <div className="activity-summary__info__item__details__duration">
                {durationString}
              </div>
            )}
            {Boolean(amount) && (
              <div className="activity-summary__info__item__details__amount">
                {amountString}
              </div>
            )}
            {(Boolean(pee) || Boolean(poo)) && (
              <div className="activity-summary__info__item__details__peepoo">
                <p>{peeString}</p>
                <p>{pooString}</p>
              </div>
            )}
          </div>
        </div>
      )
    });
  }

  return (
    <div className="activity-summary">
      <div className="activity-summary__date-display">
        <button
          className="activity-summary__date-display__button"
          onClick={() => onButtonClick('prev')}
        >
          <SVGIcon name="arrow_left" />
        </button>
        <span className="activity-summary__date-display__date">
          {dateString}
        </span>
        <button
          className="activity-summary__date-display__button"
          onClick={() => onButtonClick('next')}
          disabled={isToday}
        >
          <SVGIcon name="arrow_right" />
        </button>
      </div>
      <div className="activity-summary__info">
        {renderSummary(summary)}
      </div>
    </div>
  )
}

export default withTranslate(ActivitySummary);