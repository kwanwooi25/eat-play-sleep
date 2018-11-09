import React from 'react';

/** Components */
import TabSummary from '../../components/TabSummary/TabSummary';
import MenuSelector from '../../components/MenuSelector/MenuSelector';
import FeedChart from '../../components/FeedChart/FeedChart';
import DurationChart from '../../components/DurationChart/DurationChart';
import DiaperChart from '../../components/DiaperChart/DiaperChart';
import GrowthChart from '../../components/GrowthChart/GrowthChart';

const Trend = ({
  activityName,
  trend,
  baby,
  menuSelected,
  menuItems,
  onMenuChange,
}) => {
  const { breast, bottle, babyfood, sleep, diaper, growth } = trend;

  return (
    <div className="trend">
      {activityName !== 'growth' && (
        <div className="trend__controls">
          <TabSummary
            activityName={activityName}
            trend={trend}
          />
          <MenuSelector
            buttonClassName="trend__controls__button"
            menuSelected={menuSelected}
            menuItems={menuItems}
            onChange={onMenuChange}
          />
        </div>
      )}

      <div className="trend__chart">
        {activityName === 'feed' && (
          <FeedChart breast={breast} bottle={bottle} babyfood={babyfood} />
        )}
        {activityName === 'sleep' && (
          <DurationChart source={sleep} />
        )}
        {activityName === 'diaper' && (
          <DiaperChart source={diaper} />
        )}
        {activityName === 'growth' && (
          <GrowthChart source={growth} baby={baby} />
        )}
      </div>
    </div>
  )
}

export default Trend;