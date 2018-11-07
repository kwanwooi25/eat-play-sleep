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

/** Actions */
import * as actions from '../../actions';

const Transition = props => <Slide direction="left" {...props} />;

class Logs extends Component {
  state = {
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

  render() {
    const {
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
        {all.map(activity => (
          <Log
            key={activity.id}
            activity={activity}
            onMenuClick={this.handleMenuClick}
          />
        ))}

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

const mapStateToProps = ({ auth, activities }) => {
  return { auth, activities };
}

export default withTranslate(connect(mapStateToProps, actions)(Logs));