/** Dependancies */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';

/** Material UI Components */
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

/** Actions */
import * as actions from '../../actions';

class Login extends Component {

  handleLoginAsUser = () => {
    console.log('handleLoginAsUser');
  }

  handleSignUpWithEmail = () => {
    console.log('handleSignUpWithEmail');
  }

  handleLoginWithGoogle = () => {
    console.log('handleLoginWithGoogle');
  }
  
  handleLoginWithFacebook = () => {
    console.log('handleLoginWithFacebook');
  }
  
  handleLoginWithKakao = () => {
    console.log('handleLoginWithKakao');
  }
  
  handleLoginAsGuest = () => {
    this.props.loginAsGuest();
  }

  render() {
    console.log(this.props);
    const { translate } = this.props;

    return (
      <div className="login">
        <div className="login__app-name">
          먹놀잠
        </div>
        <div className="login__form">
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            className="login__form__input"
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            variant="outlined"
            className="login__form__input"
          />
          <div className="buttons">
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleLoginAsUser}
            >
              {translate('login')}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.handleSignUpWithEmail}
            >
              {translate('signup')}
            </Button>
            <Button
              variant="text"
              color="primary"
              className="login__form-fullWidth"
              onClick={this.handleLoginAsGuest}
            >
              {translate('continueAsGuest')}
            </Button>
            <Divider className="login__form-fullWidth"/>
            <Button
              variant="contained"
              className="login__form-fullWidth google-login"
              onClick={this.handleLoginWithGoogle}
            >
              {translate('loginWithGoogle')}
            </Button>
            <Button
              variant="contained"
              className="login__form-fullWidth facebook-login"
              onClick={this.handleLoginWithFacebook}
            >
              {translate('loginWithFacebook')}
            </Button>
            <Button
              variant="contained"
              className="login__form-fullWidth kakao-login"
              onClick={this.handleLoginWithKakao}
            >
              {translate('loginWithKakao')}
            </Button>
          </div>
        </div>
      </div>
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