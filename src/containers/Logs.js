import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';

/** Components */
import RouteContainer from '../components/RouteContainer';
import CustomSelector from '../components/CustomSelector';
import Log from '../components/Log';
import EditActivityDialog from '../components/EditActivityDialog';
import CustomDialog from '../components/CustomDialog';
import NoData from '../components/NoData';

/** Actions */
import * as actions from '../actions';

/** Utils */
import validate from '../utils/validateActivityBeforeSave';

/** Styled Components */
import Logs from '../styled_components/Logs';

/** Constants */
const DISPLAY_TOGGLE_OPTIONS = [
  'breast',
  'bottle',
  'pump',
  'babyfood',
  'diaper',
  'sleep',
  'growth',
];

class LogsContainer extends Component {
  state = {
    show: DISPLAY_TOGGLE_OPTIONS,
    isEditActivityDialogOpen: false,
    isConfirmModalOpen: false,
    isSnackbarOpen: false,
    snackbarType: '',
    snackbarMessage: ''
  }

  handleLogClick = id => {
    const logContainers = document.getElementsByClassName('log');
    const logContainer = document.getElementById(id);

    if (logContainer.classList.contains('expand')) {
      logContainer.classList.remove('expand');
    } else {
      for (let element of logContainers) element.classList.remove('expand');
      logContainer.classList.add('expand');
    }
  }

  handleMenuClick = (activityID, menuClicked) => {
    const { auth: { currentUser }, getActivityById } = this.props;
    
    getActivityById(currentUser, activityID);

    if (menuClicked === 'edit') this.openEditActivityDialog();
    else if (menuClicked === 'delete') this.openConfirmDialog();
  }

  handleDisplayOptionClick = e => {
    const { value } = e.target;
    const {
      auth: { currentUser },
      babies: { currentBaby },
      getActivities
    } = this.props;
    let { show } = this.state;

    if (show.includes(value)) show = show.filter(i => i !== value);
    else show.push(value);
    
    getActivities(currentUser, currentBaby.id, { name: show });
    this.setState({ show });
  }

  openEditActivityDialog = () => {
    this.setState({ isEditActivityDialogOpen: true });
  }

  handleEditActivityDialogChange = activity => {
    this.props.updateCurrentActivity(activity);
  }

  handleEditActivityDialogClose = (result, data) => {
    const {
      translate,
      auth: { currentUser },
      updateActivity,
      resetCurrentActivity,
      showSnackbar,
    } = this.props;

    if (result) {
      const { isValid, error } = validate(data);
      
      if (isValid) {
        const title = translate(data.name);
        const successMessage = translate('successActivityUpdate', { title });
        const errorMessage = translate('failActivityUpdate', { title });
        updateActivity(currentUser, data, successMessage, errorMessage);
        resetCurrentActivity();
        this.setState({ isEditActivityDialogOpen: false });
      } else {
        showSnackbar(translate(error), 'error');
      }
    } else {
      resetCurrentActivity();
      this.setState({ isEditActivityDialogOpen: false });
    }
  }

  openConfirmDialog = () => this.setState({ isConfirmModalOpen: true });

  handleConfirmModalClose = result => {
    const {
      translate,
      auth: { currentUser },
      activities: { currentActivity },
      removeActivity,
      resetCurrentActivity,
    } = this.props;

    if (result) {
      const title = translate(currentActivity.name);
      const successMessage = translate('successActivityRemove', { title });
      const errorMessage = translate('failActivityRemove', { title });
      removeActivity(currentUser, currentActivity, successMessage, errorMessage);
    }

    resetCurrentActivity();
    this.setState({ isConfirmModalOpen: false });
  }

  renderLog = (data, shouldDisplay) => {
    const {
      translate,
      auth: { currentUser: { settings: { displayUnits } } },
    } = this.props;
    const mappedByDates = {};

    if (shouldDisplay) {
      data = data.filter(({ name }) => shouldDisplay.includes(name));
    }

    data.forEach(activity => {
      const date = moment(activity.time_start).format('YYYYMMDD');
      if (mappedByDates[date]) {
        mappedByDates[date].push(activity);
      } else {
        mappedByDates[date] = [activity];
      }
    });

    return Object.keys(mappedByDates).sort((a, b) => b - a).map(date => {
      const activities = mappedByDates[date];
      const isToday = moment(date).format('YYYYMMDD') === moment().format('YYYYMMDD');
      const dateString = isToday ?
        translate('today') :
        moment(date).format(translate('dateFormatLong'));
        
      return (
        <Logs.LogGroup key={date}>
          <Logs.LogGroup.Title>{dateString}</Logs.LogGroup.Title>
          <Logs.LogGroup.List>
            {activities.map(activity => (
              <Log
                key={activity.id}
                activity={activity}
                displayUnits={displayUnits}
                onMenuClick={this.handleMenuClick}
                onLogClick={this.handleLogClick}
              />
            ))}
          </Logs.LogGroup.List>
        </Logs.LogGroup>
      )
    });
  }

  render() {
    const {
      show,
      isEditActivityDialogOpen,
      isConfirmModalOpen,
    } = this.state;
    const {
      translate,
      auth: { currentUser : { settings: { displayActivities, displayUnits } } },
      babies: { currentBaby },
      activities
    } = this.props;
    const { all, currentActivity } = activities;

    let toggleOptions = DISPLAY_TOGGLE_OPTIONS;
    if (displayActivities) {
      toggleOptions = DISPLAY_TOGGLE_OPTIONS.filter(name => displayActivities.includes(name));
    }

    return (
      <RouteContainer route="logs" baby={currentBaby}>
        <Logs>
          <Logs.DisplayOptionsContainer>
            <CustomSelector
              options={toggleOptions}
              value={show}
              onChange={this.handleDisplayOptionClick}
              multiChoice
              horiScroll
            />
          </Logs.DisplayOptionsContainer>
      
          {all.length === 0
            ? <NoData icon="list" message={translate('noLogs')} />
            : this.renderLog(all, displayActivities)}

          <EditActivityDialog
            open={isEditActivityDialogOpen}
            onClose={this.handleEditActivityDialogClose}
            onChange={this.handleEditActivityDialogChange}
            activity={currentActivity}
            displayUnits={displayUnits}
          />

          <CustomDialog
            open={isConfirmModalOpen}
            onClose={this.handleConfirmModalClose}
            title={translate('confirmActivityDeleteTitle')}
            message={translate('confirmActivityDeleteMessage')}
            variant="confirm"
          />
        </Logs>
      </RouteContainer>
    )
  }
}

const mapStateToProps = ({ auth, babies, activities }) => {
  return { auth, babies, activities };
}

export default withTranslate(connect(mapStateToProps, actions)(LogsContainer));