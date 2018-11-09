import React from 'react';

/** Components */
import TabSummary from '../../components/TabSummary/TabSummary';
import MenuSelector from '../../components/MenuSelector/MenuSelector';
import FeedChart from '../../components/FeedChart/FeedChart';

const Trend = ({
  activityName,
  trend,
  menuSelected,
  menuItems,
  onMenuChange,
}) => {
  const { breast, bottle, babyfood, } = trend;

  return (
    <div className="trend">
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
      <div className="trend__chart">
        {activityName === 'feed' && (
          <FeedChart breast={breast} bottle={bottle} babyfood={babyfood} />
        )}
      </div>
    </div>
  )
}

export default Trend;