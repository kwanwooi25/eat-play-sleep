import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';

/** Material UI Components */
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';

/** Components */
import Log from '../../components/Log/Log';
import EditActivityDialog from '../../components/EditActivityDialog/EditActivityDialog';
import CustomDialog from '../../components/CustomDialog/CustomDialog';
import CustomSelector from '../../components/CustomSelector/CustomSelector';

/** Actions */
import * as actions from '../../actions';

const DISPLAY_TOGGLE_OPTIONS = [
  'breast',
  'bottle',
  'pump',
  'babyfood',
  'diaper',
  'sleep',
  'growth',
];

const Transition = props => <Slide direction="left" {...props} />;

class Logs extends Component {
  state = {
    show: DISPLAY_TOGGLE_OPTIONS,
    isEditActivityDialogOpen: false,
    isConfirmModalOpen: false,
    isSnackbarOpen: false,
    snackbarType: '',
    snackbarMessage: ''
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

  handleEditActivityDialogClose = (result, data) => {
    const {
      translate,
      auth: { currentUser },
      updateActivity,
      resetCurrentActivity,
    } = this.props;

    if (result) {
      updateActivity(currentUser, data);
      const title = translate(data.name);
      this.showSnackbar(translate('successActivityUpdate', { title }), 'success');
    }

    resetCurrentActivity();
    this.setState({ isEditActivityDialogOpen: false });
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
      removeActivity(currentUser, currentActivity);
      const title = translate(currentActivity.name);
      this.showSnackbar(translate('successActivityRemove', { title }), 'success');
    }

    resetCurrentActivity();
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

  renderLog = data => {
    const { translate } = this.props;
    const mappedByDates = {};

    data.forEach(activity => {
      const date = moment(activity.time_start).format('YYYYMMDD');
      if (mappedByDates[date]) {
        mappedByDates[date].push(activity);
      } else {
        mappedByDates[date] = [activity];
      }
    });

    return Object.keys(mappedByDates).sort((a, b) => b - a).map(key => {
      const activities = mappedByDates[key];
      const date = moment(key).format(translate('dateFormatLong'));
      return (
        <div className="logs__group" key={key}>
          <div className="logs__group__title">{date}</div>
          <div className="logs__group__list">
            {activities.map(activity => (
              <Log
                key={activity.id}
                activity={activity}
                onMenuClick={this.handleMenuClick}
              />
            ))}
          </div>
        </div>
      )
    });
  }

  render() {
    const {
      show,
      isEditActivityDialogOpen,
      isConfirmModalOpen,
      isSnackbarOpen,
      snackbarType,
      snackbarMessage
    } = this.state;
    const { translate, activities } = this.props;
    const { all, currentActivity } = activities;

    return (
      <div className="logs">
        <div className="logs__display-options">
          <CustomSelector
            options={DISPLAY_TOGGLE_OPTIONS}
            value={show}
            onChange={this.handleDisplayOptionClick}
            multiChoice={true}
          />
        </div>
        {all.length === 0 ? (
          <div className="no-logs">
            {translate('noLogs')}
          </div>
        ) : this.renderLog(all)}

        <EditActivityDialog
          open={isEditActivityDialogOpen}
          onClose={this.handleEditActivityDialogClose}
          activity={currentActivity}
        />

        <CustomDialog
          open={isConfirmModalOpen}
          onClose={this.handleConfirmModalClose}
          title={translate('confirmActivityDeleteTitle')}
          message={translate('confirmActivityDeleteMessage')}
          variant="confirm"
        />

        <Snackbar
          className={`snackbar ${snackbarType}`}
          open={isSnackbarOpen}
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
  return { auth, babies, activities };
}

export default withTranslate(connect(mapStateToProps, actions)(Logs));