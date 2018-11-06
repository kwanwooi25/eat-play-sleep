/** Dependancies */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';
import moment from 'moment';

/** Material UI */
import Icon from '@material-ui/core/Icon';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import Snackbar from '@material-ui/core/Snackbar';

/** Components */
import ActivityButton from '../../components/ActivityButton/ActivityButton';
import Activity from '../Activity/Activity';
import NewBabyDialog from '../../components/NewBabyDialog/NewBabyDialog';
import CustomDialog from '../../components/CustomDialog/CustomDialog';

/** Actions */
import * as actions from '../../actions';

/** Helper functions */
import validate from '../../helpers/validateActivityBeforeSave';

const Transition = props => <Slide direction="left" {...props} />;

const ACTIVITY_BUTTONS = [
  'breast',
  'bottle',
  'pump',
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
    isSnackbarOpen: false,
    snackbarMessage: '',
    snackbarType: '',
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
      activities : { activitiesInProgress },
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

    const existingActivity = activitiesInProgress.find(({ name }) => name === activity.name);
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
      updateActivitiesInProgress,
      activities: { activitiesInProgress }
    } = this.props;

    const updated = activitiesInProgress.filter(activity => activity.name !== name);
    updateActivitiesInProgress(updated);
    this.closeActivityDialog();
  }

  handleActivitySave = () => {
    const { name, title } = this.state.activity;
    const {
      updateActivitiesInProgress,
      saveActivity,
      activities: { activitiesInProgress },
      auth: { currentUser },
      translate,
    } = this.props;

    const activityToSave = activitiesInProgress.find(activity => activity.name === name);
    const updated = activitiesInProgress.filter(activity => activity.name !== name);

    const { isValid, error } = validate(activityToSave);

    if (isValid) {
      this.showSnackbar(translate('successActivitySave', { title }), 'success');
      updateActivitiesInProgress(updated);
      saveActivity(currentUser, activityToSave);
      this.closeActivityDialog();
    } else {
      this.showSnackbar(translate(error), 'error');
    }

    
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

  showSnackbar = (message, type) => {
    this.setState({
      isSnackbarOpen: true,
      snackbarMessage: message,
      snackbarType: type,
    });
  }

  handleSnackbarClose = () => {
    this.setState({
      isSnackbarOpen: false,
      snackbarMessage: '',
      snackbarType: '',
    });
  }

  renderActivityButtons = (activities, activitiesInProgress, lastActivities) => {
    return activities.map(name => {
      const activityInProgress = activitiesInProgress
        .filter(activity => activity.name === name);

      return (
        <ActivityButton
          key={name}
          name={name}
          lastActivity={lastActivities && lastActivities[name]}
          activityInProgress={activityInProgress && activityInProgress[0]}
          onClick={this.handleActivityButtonClick}
        />
      )
    })
  }

  render() {
    let {
      isNewBabyDialogOpen,
      isActivityDialogOpen,
      isConfirmModalOpen,
      isSnackbarOpen,
      snackbarMessage,
      snackbarType,
      activity
    } = this.state;
    const { babies, activities, translate } = this.props;
    const { lastActivities, activitiesInProgress } = activities;

    return (
      <div className="home">
        {babies.currentBaby ? (
          <div className="activity-buttons">
            {this.renderActivityButtons(ACTIVITY_BUTTONS, activitiesInProgress, lastActivities)}
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
              error={snackbarType === 'error' && snackbarMessage}
              closeSnackbar={this.handleSnackbarClose}
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

        <Snackbar
          className="snackbar success"
          open={isSnackbarOpen && snackbarType === 'success'}
          autoHideDuration={2000}
          onClose={this.handleSnackbarClose}
          TransitionComponent={Transition}
          message={<span>{snackbarMessage}</span>}
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