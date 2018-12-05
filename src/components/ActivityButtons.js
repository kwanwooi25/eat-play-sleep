import moment from 'moment';
import React, { Component } from 'react';
import { withTranslate } from 'react-redux-multilingual';

/** Styled Components */
import ActivityButton from '../styled_components/ActivityButton';

/** Components */
import Icon from './Icon';

/** Utils */
import parseMinutes from '../utils/parseMinutes';

const ACTIVITIES = [
  'breast',
  'bottle',
  'pump',
  'babyfood',
  'diaper',
  'sleep',
  'growth'
];

class ActivityButtons extends Component {
  state = { lastActivitiesAt: {} }

  componentDidMount() {
    this.setLastActivitiesAt();
    this.timer = setInterval(this.setLastActivitiesAt, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  setLastActivitiesAt = () => {
    const { translate, activities } = this.props;
    const { lastActivities, activitiesInProgress } = activities;

    let lastActivitiesAt = {};
    
    ACTIVITIES.forEach(name => {
      const lastActivity = lastActivities[name];
      const activityInProgress = activitiesInProgress
        .filter(activity => activity.name === name)[0];

      let lastActivityAt = translate('noRecord');
  
      if (activityInProgress) {
        lastActivityAt = translate('inProgress');
      } else if (lastActivity) {
        const timeDifference = moment().diff(lastActivity.time_start, 'minutes');
        const { d, h, m } = parseMinutes(timeDifference);
        const day = translate('day', { d });
        const hour = translate('hour', { h });
        const minute = translate('minute', { m });
        const ago = translate('ago');
        const justBefore = translate('justBefore');
  
        if (d > 0) lastActivityAt = `${day} ${ago}`;
        else if (h > 0) lastActivityAt = `${hour} ${minute} ${ago}`;
        else if (m > 0) lastActivityAt = `${minute} ${ago}`;
        else lastActivityAt = justBefore;
      }

      lastActivitiesAt[name] = lastActivityAt;
    });

    this.setState({ lastActivitiesAt });
  }

  render() {
    const {
      translate,
      displayActivities,
      activities,
      onActivityButtonClick
    } = this.props;
    const { lastActivitiesAt } = this.state;

    let buttonsToRender = ACTIVITIES;
    if (displayActivities) {
      buttonsToRender = ACTIVITIES.filter(name => displayActivities.includes(name));
    }

    return (
      <ActivityButton.Container buttons={buttonsToRender}>
        {buttonsToRender.map(name => {
          const activityInProgress = activities.activitiesInProgress
            .filter(activity => activity.name === name)[0];
          const isActive = Boolean(activityInProgress);
          const hasSides = name === 'breast' || name === 'pump';
          const currentSide = activityInProgress && activityInProgress.currentSide;

          return (
            <ActivityButton key={name} name={name} hasSides={hasSides}>
              <ActivityButton.Title>{translate(name)}</ActivityButton.Title>
              <ActivityButton.ButtonGroup>
                {hasSides ? (
                  ['left', 'right'].map(side => {
                    const isActive = side === currentSide;
                    const buttonName = `${name}_${side}`;

                    return (
                      <ActivityButton.Button
                        key={buttonName}
                        onClick={() => onActivityButtonClick(buttonName)}
                        active={isActive}
                      >
                        <Icon name={buttonName} isActive={isActive} />
                      </ActivityButton.Button>
                    )
                  })
                ) : (
                  <ActivityButton.Button
                    onClick={() => onActivityButtonClick(name)}
                    active={isActive}
                  >
                    <Icon name={name} isActive={isActive} />
                  </ActivityButton.Button>
                )}
              </ActivityButton.ButtonGroup>
              <ActivityButton.Info>{lastActivitiesAt[name]}</ActivityButton.Info>
            </ActivityButton>
          )
        })}
      </ActivityButton.Container>
    )
  }
}

export default withTranslate(ActivityButtons);