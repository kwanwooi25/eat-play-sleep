import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';

/** Components */
import BabyForm from '../BabyForm/BabyForm';
import CustomDialog from '../CustomDialog/CustomDialog';

/** Material UI Components */
import Icon from '@material-ui/core/Icon';

/** Actions */
import * as actions from '../../actions';

class BabyProfile extends Component {
  state = {
    editMode: false,
    isConfirmDialogOpen: false,
  }

  openConfirmDialog = () => this.setState({ isConfirmDialogOpen: true });

  handleConfirmDialogClose = result => {
    const { user, baby, deleteBaby } = this.props;
    this.setState({ isConfirmDialogOpen: false });
    if (result) deleteBaby(user, baby);
  }

  enterEditMode = () => this.setState({ editMode: true });

  handleCancel = () => this.setState({ editMode: false });

  handleSave = data => {
    const { baby, user, editBaby } = this.props;
    const { name, gender, birthday } = data;
    const guardians = baby.guardians.map(({ id, relationship }) => {
      if (id === user.id) return { id, relationship: data.relationship };
      return { id, relationship };
    });

    const updatedBaby = { id: baby.id, name, gender, birthday, guardians };
    editBaby(user, updatedBaby);
    this.setState({ editMode: false });
  }

  render() {
    const { editMode, isConfirmDialogOpen } = this.state;
    const { translate, user, baby } = this.props;

    const { name, gender, birthday } = baby;
    const { relationship } = baby.guardians.find(({ id }) => id === user.id);

    return (
      <div className="baby-profile">
        {editMode ? (
          <BabyForm
            name={name}
            gender={gender}
            birthday={birthday}
            relationship={relationship}
            labelAlign="row"
            onCancel={this.handleCancel}
            onSave={this.handleSave}
          />
        ) : (
          <div className="baby-profile__info">
            <label>{translate('babyNameLabel')}</label>
            <span>{name}</span>
            <label>{translate('babyGenderLabel')}</label>
            <span>{translate(gender)}</span>
            <label>{translate('babyBirthdayLabel')}</label>
            <span>{moment(birthday).format(translate('dateFormatLong'))}</span>
            <label>{translate('relationshipLabel')}</label>
            <span>{translate(relationship)}</span>
          </div>
        )}

        {editMode === false && (
          <div className="baby-profile__controls">
            <button
              className="baby-profile__controls__button"
              onClick={this.enterEditMode}
            >
              <Icon color="inherit">edit</Icon>
            </button>
            <button
              className="baby-profile__controls__button"
              onClick={this.openConfirmDialog}
            >
              <Icon color="inherit">delete</Icon>
            </button>
          </div>
        )}

        <CustomDialog
          open={isConfirmDialogOpen}
          onClose={this.handleConfirmDialogClose}
          title={translate('deleteBabyTitle')}
          message={translate('deleteBabyMessage')}
          variant="confirm"
        />
      </div>
    )
  }
}

const mapStateToProps = () => {
  return {};
}

export default withTranslate(connect(mapStateToProps, actions)(BabyProfile));