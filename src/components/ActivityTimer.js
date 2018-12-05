import React, { Component } from 'react';
import { connect } from 'react-redux';

/** Styled Components */
import ActivityTimer from '../styled_components/ActivityTimer';

/** Components */
import Icon from '../components/Icon';

/** Material UI Components */
import MuiIcon from '@material-ui/core/Icon';

/** Utils */
import secondsToHMS from '../utils/secondsToHMS';

/** Actions */
import * as actions from '../actions';

class ActivityTimerContainer extends Component {
  constructor(props) {
    super(props);

    const { name, currentSide, paused, leftTimer, rightTimer, timer } = props.activity;

    this.state = {
      name,
      currentSide,
      paused,
      elapsedLeft: leftTimer && leftTimer.elapsed,
      elapsedRight: rightTimer && rightTimer.elapsed,
      elapsedTotal: timer ? timer.elapsed : leftTimer.elapsed + rightTimer.elapsed,
    }
  }

  componentDidMount() {
    this.displayInterval = setInterval(this.updateState, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.displayInterval);
  }

  updateState = () => {
    const { leftTimer, rightTimer, timer } = this.props.activity;
    const elapsedLeft = leftTimer && leftTimer.elapsed;
    const elapsedRight = rightTimer && rightTimer.elapsed;
    const elapsedTotal = timer ? timer.elapsed : leftTimer.elapsed + rightTimer.elapsed;

    this.setState({ elapsedLeft, elapsedRight, elapsedTotal });
  }

  changeSide = () => {
    const { activity, updateActivityInProgress } = this.props;
    const { currentSide } = this.state;
    let opposite = '';

    if (currentSide === 'left') {
      opposite = 'right';
      activity.leftTimer.stop();
      activity.rightTimer.start();
    } else if (currentSide === 'right') {
      opposite = 'left';
      activity.rightTimer.stop();
      activity.leftTimer.start();
    }

    activity.paused = false;
    activity.currentSide = opposite;
    
    this.setState({ currentSide: opposite, paused: false });
    updateActivityInProgress(activity);
  }

  handlePause = () => {
    const { activity, updateActivityInProgress } = this.props;
    
    if (activity.leftTimer) activity.leftTimer.stop();
    if (activity.rightTimer) activity.rightTimer.stop();
    if (activity.timer) activity.timer.stop();

    activity.paused = true;
    
    this.setState({ paused: true });
    updateActivityInProgress(activity);
  }

  handleResume = () => {
    const { activity, updateActivityInProgress } = this.props;
    const { currentSide } = this.state;

    if (currentSide === 'left') activity.leftTimer.start();
    else if (currentSide === 'right') activity.rightTimer.start();
    else activity.timer.start();

    activity.paused = false;

    this.setState({ paused: false });
    updateActivityInProgress(activity);
  }

  render() {
    const {
      name,
      currentSide,
      paused,
      elapsedLeft,
      elapsedRight,
      elapsedTotal
    } = this.state;
    const { multi = false } = this.props;
    const isLeftActive = currentSide === 'left' && !paused;
    const isRightActive = currentSide === 'right' && !paused;

    return (
      <ActivityTimer multi={multi}>
        <ActivityTimer.Display paused={paused}>
          <span>{secondsToHMS(elapsedTotal)}</span>
        </ActivityTimer.Display>

        <ActivityTimer.Controls>
          {multi && (
            <ActivityTimer.SideDisplay active={isLeftActive}>
              <ActivityTimer.SideDisplay.Icon>
                <Icon name={`${name}_left`} isActive={isLeftActive} />
              </ActivityTimer.SideDisplay.Icon>
              <ActivityTimer.SideDisplay.Time>
                {secondsToHMS(elapsedLeft)}
              </ActivityTimer.SideDisplay.Time>
            </ActivityTimer.SideDisplay>
          )}

          <ActivityTimer.ButtonGroup>
            {multi && (
              <ActivityTimer.Button onClick={this.changeSide}>
                <Icon name={`arrow_${currentSide === 'left' ? 'right' : 'left'}`} />
              </ActivityTimer.Button>
            )}
            <ActivityTimer.Button
              onClick={paused ? this.handleResume : this.handlePause}
            >
              <MuiIcon color="inherit" fontSize="large">
                {paused ? 'play_arrow' : 'pause'}
              </MuiIcon>
            </ActivityTimer.Button>
          </ActivityTimer.ButtonGroup>

          {multi && (
            <ActivityTimer.SideDisplay active={isRightActive}>
              <ActivityTimer.SideDisplay.Icon>
                <Icon name={`${name}_right`} isActive={isRightActive} />
              </ActivityTimer.SideDisplay.Icon>
              <ActivityTimer.SideDisplay.Time>
                {secondsToHMS(elapsedRight)}
              </ActivityTimer.SideDisplay.Time>
            </ActivityTimer.SideDisplay>
          )}
        </ActivityTimer.Controls>
      </ActivityTimer>
    )
  }
}

export default connect(null, actions)(ActivityTimerContainer);