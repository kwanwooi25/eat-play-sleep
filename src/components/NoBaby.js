import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';

/** Components */
import Icon from './Icon';
import NewBabyDialog from './NewBabyDialog';

/** Styled Components */
import NoBabyDisplay from '../styled_components/NoBaby';

/** Actions */
import * as actions from '../actions';

class NoBaby extends Component {
  state = {
    isNewBabyDialogOpen: false
  }

  handleAddBabyButton = () => {
    this.setState({ isNewBabyDialogOpen: true });
  }

  handleNewBabyDialogClose = data => {
    const { auth, addBaby } = this.props;
    this.setState({ isNewBabyDialogOpen: false });

    if (data) {
      const baby = {
        name: data.name,
        gender: data.gender,
        birthday: data.birthday,
        guardians: [{ id: auth.currentUser.id, relationship: data.relationship }]
      }
      
      addBaby(auth.currentUser, baby);
    }
  }

  render() {
    const { translate } = this.props;
    const { isNewBabyDialogOpen } = this.state;

    return (
        <NoBabyDisplay>
          <NoBabyDisplay.Button onClick={this.handleAddBabyButton}>
            <Icon name="add_baby" />
          </NoBabyDisplay.Button>
          <NoBabyDisplay.Message>
            {translate('noBabyMessage_line1')}
          </NoBabyDisplay.Message>
          <NoBabyDisplay.Message>
            {translate('noBabyMessage_line2')}
          </NoBabyDisplay.Message>

          <NewBabyDialog
            open={isNewBabyDialogOpen}
            onClose={this.handleNewBabyDialogClose}
          />
        </NoBabyDisplay>

    )
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
}

export default withTranslate(connect(mapStateToProps, actions)(NoBaby));