/** Dependancies */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';

/** Components */
import Icon from '../components/Icon';
import CustomDialog from '../components/CustomDialog';

/** Actions */
import * as actions from '../actions';

/** Styled Components */
import LoginForm from '../styled_components/Login';

/** Contants */
const API_HOST = process.env.REACT_APP_API_HOST;
const OAUTH_PROVIDERS = [ 'google', 'facebook', 'kakao', 'naver' ];

class Login extends Component {
  state = {
    isConfirmModalOpen: false
  }

  componentWillMount() {
    if (window.location.search) {
      const token = window.location.search.split('=')[1];
      this.props.loginUser(token);
    }
    window.history.pushState(null, '', window.location.href.split('?')[0]);
  }

  handleGuestLogin = () => {
    this.setState({ isConfirmModalOpen: true });
  }

  handleModalClose = result => {
    this.setState({ isConfirmModalOpen: false });
    if (result === true) this.props.loginAsGuest();
  }

  renderOauthButtons = providers => {
    return providers.map(name => {
      return (
        <LoginForm.OauthLink
          key={name}
          href={`${API_HOST}/auth/${name}`}
        >
          <Icon name={name} />
        </LoginForm.OauthLink>
      )
    })
  }

  render() {
    const { translate } = this.props;
    const { isConfirmModalOpen } = this.state;

    return (
      <LoginForm.Container>
        <LoginForm>
          <LoginForm.Title>{translate('login')}</LoginForm.Title>
          <LoginForm.ButtonGroup>
            {this.renderOauthButtons(OAUTH_PROVIDERS)}
          </LoginForm.ButtonGroup>
          <LoginForm.Divider>OR</LoginForm.Divider>
          <LoginForm.ButtonGroup>
            <LoginForm.Button onClick={this.handleGuestLogin}>
              {translate('continueAsGuest')}
            </LoginForm.Button>
          </LoginForm.ButtonGroup>
        </LoginForm>
        
        <CustomDialog
          open={isConfirmModalOpen}
          onClose={this.handleModalClose}
          title={translate('guestLogin')}
          message={translate('guestLoginAlert')}
          variant="confirm"
        />
      </LoginForm.Container>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth }
}

export default withTranslate(
  connect(
    mapStateToProps,
    actions
  )(Login)
);