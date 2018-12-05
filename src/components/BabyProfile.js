import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';

/** Components */
import BabyForm from './BabyForm';
import CustomDialog from './CustomDialog';
import Icon from './Icon';

/** Material UI Components */
import MuiIcon from '@material-ui/core/Icon';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

/** Styled Components */
import BabyProfile from '../styled_components/BabyProfile';

/** Actions */
import * as actions from '../actions';

class BabyProfileContainer extends Component {
  state = {
    mode: 'view',
    isConfirmDialogOpen: false,
    babySelectAnchorEl: null,
  }

  openConfirmDialog = () => this.setState({ isConfirmDialogOpen: true });

  handleConfirmDialogClose = result => {
    const { user, baby, deleteBaby } = this.props;
    this.setState({ isConfirmDialogOpen: false });
    if (result) deleteBaby(user, baby);
  }

  enterEditMode = () => this.setState({ mode: 'edit' });

  enterNewMode = () => this.setState({ mode: 'new' });

  handleCancel = () => this.setState({ mode: 'view' });

  handleSaveEdit = data => {
    const { baby, user, editBaby } = this.props;
    const { name, gender, birthday } = data;
    const guardians = baby.guardians.map(({ id, relationship }) => {
      if (id === user.id) return { id, relationship: data.relationship };
      return { id, relationship };
    });

    const updatedBaby = { id: baby.id, name, gender, birthday, guardians };
    editBaby(user, updatedBaby);
    this.setState({ mode: 'view' });
  }

  handleSaveNew = data => {
    const { user, addBaby } = this.props;
    const { name, gender, birthday, relationship } = data;
    const baby = {
      name,
      gender,
      birthday,
      guardians: [{ id: user.id, relationship }]
    };

    addBaby(user, baby);
    this.setState({ mode: 'view' });
  }

  openBabySelect = e => this.setState({ babySelectAnchorEl: e.target });

  handleBabyChange = value => {
    const { user, updateUser } = this.props;
    user.settings.currentBabyId = value;
    if (value) updateUser(user);
    this.setState({ babySelectAnchorEl: null });
  }

  renderBabies = babies => {
    return babies.map(({ id, name }) => {
      return (
        <MenuItem key={id} onClick={() => this.handleBabyChange(id)}>
          {name}
        </MenuItem>
      )
    })
  }

  render() {
    const { mode, isConfirmDialogOpen, babySelectAnchorEl } = this.state;
    const { translate, user, baby, all } = this.props;

    const { name, gender, birthday } = baby;
    const { relationship } = baby.guardians.find(({ id }) => id === user.id);
    const headerTitle =
      mode === 'edit' ? 
        translate('editBabyTitle') :
        mode === 'new' ?
          translate('addBabyTitle') :
          translate('babyProfileTitle');

    return (
      <BabyProfile>
        <BabyProfile.Header>
          <BabyProfile.Header.Title>
            {headerTitle}
          </BabyProfile.Header.Title>
          
          {mode === 'view' && (
            <BabyProfile.Header.Controls>
              {all.length >= 2 && (
                <div>
                  <BabyProfile.Header.Button onClick={this.openBabySelect}>
                    <Icon name="swap_baby" />
                  </BabyProfile.Header.Button>
                  <Menu
                    anchorEl={babySelectAnchorEl}
                    open={Boolean(babySelectAnchorEl)}
                    onClose={() => this.handleBabyChange(false)}
                  >
                    {this.renderBabies(all)}
                  </Menu>
                </div>
              )}

              <BabyProfile.Header.Button onClick={this.enterNewMode}>
                <Icon name="add_baby" />
              </BabyProfile.Header.Button>
              <BabyProfile.Header.Button onClick={this.enterEditMode}>
                <MuiIcon color="inherit">edit</MuiIcon>
              </BabyProfile.Header.Button>
              <BabyProfile.Header.Button onClick={this.openConfirmDialog}>
                <MuiIcon color="inherit">delete</MuiIcon>
              </BabyProfile.Header.Button>
            </BabyProfile.Header.Controls>
          )}
        </BabyProfile.Header>

        {(mode === 'edit' || mode === 'new') ? (
          <BabyForm
            name={mode === 'edit' && name}
            gender={mode === 'edit' && gender}
            birthday={mode === 'edit' && birthday}
            relationship={mode === 'edit' && relationship}
            labelAlign="row"
            onCancel={this.handleCancel}
            onSave={mode === 'edit' ? this.handleSaveEdit : this.handleSaveNew}
          />
        ) : (
          <BabyProfile.Info>
            <label>{translate('babyNameLabel')}</label>
            <span>{name}</span>
            <label>{translate('babyGenderLabel')}</label>
            <span>{translate(gender)}</span>
            <label>{translate('babyBirthdayLabel')}</label>
            <span>{moment(birthday).format(translate('dateFormatLong'))}</span>
            <label>{translate('relationshipLabel')}</label>
            <span>{translate(relationship)}</span>
          </BabyProfile.Info>
        )}

        <CustomDialog
          open={isConfirmDialogOpen}
          onClose={this.handleConfirmDialogClose}
          title={translate('deleteBabyTitle')}
          message={translate('deleteBabyMessage')}
          variant="confirm"
        />
      </BabyProfile>
    )
  }
}

export default withTranslate(connect(null, actions)(BabyProfileContainer));