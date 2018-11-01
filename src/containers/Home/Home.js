/** Dependancies */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';
import moment from 'moment';

/** Material UI */
import Icon from '@material-ui/core/Icon';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';

/** Components */
import Activity from '../Activity/Activity';
import NewBabyDialog from '../../components/NewBabyDialog/NewBabyDialog';
import CustomDialog from '../../components/CustomDialog/CustomDialog';
import SVGIcon from '../../components/SVGIcon/SVGIcon';

/** Actions */
import * as actions from '../../actions';

const Transition = props => <Slide direction="left" {...props} />;

const ACTIVITY_BUTTONS = [
  'breast_left',
  'breast_right',
  'pump_left',
  'pump_right',
  'bottle',
  'babyfood',
  'diaper',
  'sleep',
  'growth'
];

class Home extends Component {
  state = {
    isNewBabyDialogOpen: false,
    isActivityDialogOpen: false,
    isConfirmModalOpen: false,
    activity: null
  }

  handleAddBabyButton = () => {
    this.setState({ isNewBabyDialogOpen: true });
  }

  handleNewBabyDialogClose = baby => {
    const { auth, addBaby } = this.props;
    this.setState({ isNewBabyDialogOpen: false });

    if (baby) {
      baby.guardians = [ auth.currentUser.id ];
      addBaby(auth.currentUser, baby);
    }
  }

  handleActivityButtonClick = name => {
    const activityName = name.split('_')[0];
    const currentSide = name.split('_')[1];

    const {
      translate,
      babies : { currentBaby },
      activities : { currentActivities },
      startActivity,
      resumeActivity
    } = this.props;

    let activity = {
      title: translate(activityName),
      currentSide: currentSide,
      babyID: currentBaby.id,
      name: activityName,
      type: '',
      time_start: moment(),
      time_end: null,
      paused: false,
      amount: 0,
      amount_unit: 'ml',
      height: 0,
      height_unit: 'cm',
      weight: 0,
      weight_unit: 'kg',
      head: 0,
      head_unit: 'cm',
      memo: ''
    };

    const existingActivity = currentActivities.find(({ name }) => name === activity.name);
    if (existingActivity) {
      activity = existingActivity;

      if (activity.currentSide !== currentSide) {
        activity.currentSide = currentSide;
        resumeActivity(activity);
      }
    } else {
      startActivity(activity);
    }

    this.setState({
      isActivityDialogOpen: true,
      activity: activity
    });
  }

  handleActivityCancel = () => {
    const { name } = this.state.activity;
    const {
      updateCurrentActivities,
      activities: { currentActivities }
    } = this.props;

    const updated = currentActivities.filter(activity => activity.name !== name);
    updateCurrentActivities(updated);
    this.closeActivityDialog();
  }

  handleActivitySave = () => {
    const { name } = this.state.activity;
    const {
      updateCurrentActivities,
      saveActivity,
      activities: { currentActivities },
      auth: { currentUser }
    } = this.props;

    const activityToSave = currentActivities.find(activity => activity.name === name);
    const updated = currentActivities.filter(activity => activity.name !== name);
    updateCurrentActivities(updated);
    saveActivity(currentUser, activityToSave);
    this.closeActivityDialog();
  }

  handleActivityInProgress = () => {
    const { name } = this.state.activity;
    const shouldBeInProgress = ['breast', 'pump', 'bottle', 'sleep'].includes(name);
    
    if (shouldBeInProgress === false) this.handleActivityCancel();

    this.closeActivityDialog();
  }

  closeActivityDialog = () => {
    this.setState({
      isActivityDialogOpen: false,
      activity: null
    });
  }

  showConfirmModal = () => this.setState({ isConfirmModalOpen: true });

  handleConfirmModalClose = result => {
    if (result === true) this.handleActivityCancel();
    this.setState({ isConfirmModalOpen: false });
  }

  renderActivityButtons = (activities, currentActivities) => {
    return activities.map(name => {
      const activityName = name.split('_')[0];
      const currentSide = name.split('_')[1];
      const isActive = currentActivities
        .filter(activity => {
          return (activity.name === activityName) && (activity.currentSide === currentSide)
        }).length > 0;

      return (
        <button
          key={name}
          className={`activity-buttons__button ${isActive ? 'active' : ''}`}
          onClick={() => { this.handleActivityButtonClick(name) }}
        >
          <SVGIcon name={name} isActive={isActive} />
        </button>
      )
    })
  }

  render() {
    let {
      isNewBabyDialogOpen,
      isActivityDialogOpen,
      isConfirmModalOpen,
      activity
    } = this.state;
    const { babies, activities, translate } = this.props;

    console.log(activities.all);

    return (
      <div className="home">
        {babies.currentBaby ? (
          <div className="activity-buttons">
            {this.renderActivityButtons(ACTIVITY_BUTTONS, activities.currentActivities)}
          </div>
        ) : (
          <div className="no-baby">
            <button
              className="no-baby__button"
              onClick={this.handleAddBabyButton}
            >
              <Icon fontSize="large">add</Icon>
            </button>
            <p>{translate('noBabyMessage_line1')}</p>
            <p>{translate('noBabyMessage_line2')}</p>
          </div>
        )}

        <NewBabyDialog
          open={isNewBabyDialogOpen}
          onClose={this.handleNewBabyDialogClose}
        />

        <Dialog
          open={isActivityDialogOpen}
          onClose={this.handleActivityInProgress}
          TransitionComponent={Transition}
          fullScreen
          keepMounted
        >
          {isActivityDialogOpen && (
            <Activity
              activity={activity}
              onBack={this.handleActivityInProgress}
              onCancel={this.showConfirmModal}
              onSave={this.handleActivitySave}
            />
          )}
        </Dialog>

        <CustomDialog
          open={isConfirmModalOpen}
          onClose={this.handleConfirmModalClose}
          title={translate('confirmActivityCancelTitle')}
          message={translate('confirmActivityCancelMessage')}
          variant="confirm"
        />
      </div>
    )
  }
}

const mapStateToProps = ({ auth, babies, activities }) => {
  return { auth, babies, activities }
}

export default withTranslate(
  connect(
    mapStateToProps,
    actions
  )(Home)
);