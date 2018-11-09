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
  const renderFeed = Boolean(breast && bottle && babyfood);
  const renderSleep = Boolean(sleep);
  const renderDiaper = Boolean(diaper);
  const renderGrowth = Boolean(growth);

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
        {activityName === 'feed' && renderFeed && (
          <FeedChart breast={breast} bottle={bottle} babyfood={babyfood} />
        )}
        {activityName === 'sleep' && renderSleep && (
          <DurationChart source={sleep} />
        )}
        {activityName === 'diaper' && renderDiaper && (
          <DiaperChart source={diaper} />
        )}
        {activityName === 'growth' && renderGrowth && (
          <GrowthChart source={growth} baby={baby} />
        )}
      </div>
    </div>
  )
}

export default Trend;