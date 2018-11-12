import React from 'react';
import ActivityButton from '../ActivityButton/ActivityButton';

const ACTIVITY_BUTTONS = [
  'breast',
  'bottle',
  'pump',
  'babyfood',
  'diaper',
  'sleep',
  'growth'
];

const ActivityButtons = ({
  activities,
  onActivityButtonClick,
}) => {
  const { lastActivities, activitiesInProgress } = activities;

  return (
    <div className="activity-buttons">
      {ACTIVITY_BUTTONS.map(name => {
        const activityInProgress = activitiesInProgress
          .filter(activity => activity.name === name);

        return (
          <ActivityButton
            key={name}
            name={name}
            lastActivity={lastActivities && lastActivities[name]}
            activityInProgress={activityInProgress && activityInProgress[0]}
            onClick={onActivityButtonClick}
          />
        )
      })}
    </div>
  )
}

export default ActivityButtons;