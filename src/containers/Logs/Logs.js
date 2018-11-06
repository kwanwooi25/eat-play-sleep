import React, { Component } from 'react';
import { connect } from 'react-redux';

/** Components */
import Log from '../../components/Log/Log';
import EditActivityDialog from '../../components/EditActivityDialog/EditActivityDialog';

/** Actions */
import * as actions from '../../actions';

class Logs extends Component {
  state = {
    isEditActivityDialogOpen: false,
  }

  handleMenuClick = (activityID, menuClicked) => {
    console.log(activityID, menuClicked);
    const { auth: { currentUser }, getActivityById } = this.props;
    
    getActivityById(currentUser, activityID);

    if (menuClicked === 'edit') this.openEditActivityDialog();
    else if (menuClicked === 'delete') console.log('delete');
  }

  openEditActivityDialog = () => {
    this.setState({ isEditActivityDialogOpen: true });
  }

  handleEditActivityDialogClose = () => {
    this.props.resetCurrentActivity();
    this.setState({ isEditActivityDialogOpen: false });
  }

  render() {
    const { isEditActivityDialogOpen } = this.state;
    const { all, currentActivity } = this.props.activities;

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
      </div>
    )
  }
}

const mapStateToProps = ({ auth, activities }) => {
  return { auth, activities };
}

export default connect(mapStateToProps, actions)(Logs);