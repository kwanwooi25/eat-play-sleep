/** Dependancies */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';
import moment from 'moment';

/** Material UI */
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';

/** Components */
import RouteContainer from '../components/RouteContainer';
import ActivityButtons from '../components/ActivityButtons';
import NoBaby from '../components/NoBaby';
import Activity from './Activity';
import CustomDialog from '../components/CustomDialog';

/** Actions */
import * as actions from '../actions';

/** Utils */
import validate from '../utils/validateActivityBeforeSave';

const Transition = props => <Slide direction="up" {...props} />;

class Home extends Component {
  state = {
    isActivityDialogOpen: false,
    isConfirmModalOpen: false,
    activity: null
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
      paused: false,
      amount: 0,
      height: 0,
      weight: 0,
      head: 0,
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
      showSnackbar,
      activities: { activitiesInProgress },
      auth: { currentUser },
      translate,
    } = this.props;

    const activityToSave = activitiesInProgress.find(activity => activity.name === name);
    const updated = activitiesInProgress.filter(activity => activity.name !== name);

    const { isValid, error } = validate(activityToSave);

    if (isValid) {
      const successMessage = translate('successActivitySave', { title });
      const errorMessage = translate('failActivitySave', { title });
      updateActivitiesInProgress(updated);
      saveActivity(currentUser, activityToSave, successMessage, errorMessage);
      this.closeActivityDialog();
    } else {
      showSnackbar(translate(error), 'error');
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

  render() {
    let {
      isActivityDialogOpen,
      isConfirmModalOpen,
      activity
    } = this.state;
    const {
      auth: { currentUser: { settings } },
      babies,
      activities,
      translate
    } = this.props;

    return (
      <RouteContainer route="home" baby={babies.currentBaby}>
        {babies.currentBaby ? (
          <ActivityButtons
            displayActivities={settings.displayActivities}
            activities={activities}
            onActivityButtonClick={this.handleActivityButtonClick}
          />
        ) : (
          <NoBaby />
        )}

        <Dialog
          open={isActivityDialogOpen}
          onClose={this.handleActivityInProgress}
          TransitionComponent={Transition}
          fullScreen
          keepMounted
        >
          {activity ? (
            <Activity
              activity={activity}
              onBack={this.handleActivityInProgress}
              onCancel={this.showConfirmModal}
              onSave={this.handleActivitySave}
            />
          ) : false}
        </Dialog>

        <CustomDialog
          open={isConfirmModalOpen}
          onClose={this.handleConfirmModalClose}
          title={translate('confirmActivityCancelTitle')}
          message={translate('confirmActivityCancelMessage')}
          variant="confirm"
        />
      </RouteContainer>
    )
  }
}

const mapStateToProps = ({ auth, babies, activities }) => {
  return { auth, babies, activities }
}

export default withTranslate(connect(mapStateToProps, actions)(Home));