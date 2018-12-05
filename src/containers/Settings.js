import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';

/** Components */
import RouteContainer from '../components/RouteContainer';
import Icon from '../components/Icon';
import NoBaby from '../components/NoBaby';
import BabyProfile from '../components/BabyProfile';
import AppSettingsDialog from '../components/AppSettingsDialog';

/** Actions */
import * as actions from '../actions';

/** Styled Components */
import Settings from '../styled_components/Settings';

/** Constants */
const APP_SETTINGS = [
  'displayActivities',
  'displayLanguage',
  'displayUnits',
];

class SettingsContainer extends Component {
  state = {
    isAppSettingsDialogOpen: false,
    settingsLabel: '',
  }

  openAppSettingsDialog = label => {
    this.setState({
      isAppSettingsDialogOpen: true,
      settingsLabel: label
    });
  }

  handleAppSettingsDialogClose = result => {
    const { settingsLabel } = this.state;
    const {
      auth: { currentUser },
      updateUser,
    } = this.props;

    if (result) {
      currentUser.settings[settingsLabel] = result;
      updateUser(currentUser);
    }
    
    this.setState({
      isAppSettingsDialogOpen: false,
      settingsLabel: '',
    });
  }

  render() {
    const {
      translate,
      auth: { currentUser },
      babies: { currentBaby, all },
      logoutUser,
    } = this.props;
    const {
      isAppSettingsDialogOpen,
      settingsLabel,
    } = this.state;

    return (
      <RouteContainer route="settings" baby={currentBaby}>
        <Settings.BabyProfileContainer>
          {currentBaby ? (
            <BabyProfile
              user={currentUser}
              baby={currentBaby}
              all={all}
            />
          ) : (
            <NoBaby />
          )}
        </Settings.BabyProfileContainer>

        <Settings.AppSettings>
          <Settings.SectionTitle>
            {translate('appSettingsTitle')}
          </Settings.SectionTitle>
          <Settings.ButtonContainer>
            {APP_SETTINGS.map(name => (
              <Settings.Button
                key={name}
                onClick={() => this.openAppSettingsDialog(name)}
              >
                <Settings.Button.Label>
                  {translate(name)}
                </Settings.Button.Label>
                <Settings.Button.IconContainer>
                  <Icon name="arrow_right" />
                </Settings.Button.IconContainer>
              </Settings.Button>
            ))}
          </Settings.ButtonContainer>
        </Settings.AppSettings>
        <Settings.LogoutButtonContainer>
          <Settings.LogoutButton onClick={logoutUser}>
            {translate('logout')}
          </Settings.LogoutButton>
        </Settings.LogoutButtonContainer>

        <AppSettingsDialog
          open={isAppSettingsDialogOpen}
          onClose={this.handleAppSettingsDialogClose}
          settingsLabel={settingsLabel}
          displayActivities={currentUser.settings.displayActivities}
          displayLanguage={currentUser.settings.displayLanguage}
          displayUnits={currentUser.settings.displayUnits}
        />
      </RouteContainer>
    )
  }
}

const mapStateToProps = ({ auth, babies }) => {
  return { auth, babies };
}

export default withTranslate(connect(mapStateToProps, actions)(SettingsContainer));