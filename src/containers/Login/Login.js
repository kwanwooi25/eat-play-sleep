/** Dependancies */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';

/** Material UI Components */
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

/** Actions */
import * as actions from '../../actions';

const API_HOST = process.env.REACT_APP_API_HOST || 'http://localhost:5000';
const LOGIN_INPUTS = [
  {
    name: 'email',
    type: 'text',
    placeholder: 'Email',
    renderForLogin: true,
    renderForRegister: true,
    autoFocus: true
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'Password',
    renderForLogin: true,
    renderForRegister: true
  },
  {
    name: 'passwordConf',
    type: 'password',
    placeholder: 'PasswordConf',
    renderForLogin: false,
    renderForRegister: true
  },
];

const OAUTH_BUTTONS = [
  { provider: 'google', label: 'loginWithGoogle' },
  { provider: 'facebook', label: 'loginWithFacebook' },
  { provider: 'kakao', label: 'loginWithKakao' },
  { provider: 'naver', label: 'loginWithNaver' },
];

const INITIAL_STATE = {
  mode: 'login',
  email: '',
  password: '',
  
  /** state for 'register' mode */
  passwordConf: '',
  emailError: '',
  passwordError: '',
  passwordConfError: '',
}

class Login extends Component {
  state = Object.assign({}, INITIAL_STATE);

  toggleMode = () => {
    const { mode } = this.state;
    this.setState(
      Object.assign({}, INITIAL_STATE, {
        mode: mode === 'login' ? 'register' : 'login'
      })
    );
  }

  /**
   * Validate input fields
   * @return boolean
   */
  validateField = name => {
    /** RegEx */
    /* eslint-disable */
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const passwordRegEx = /(?=.*\d)(?=.*[a-z]).{8,}/

    const { password } = this.state;
    const { translate } = this.props;

    const value = this.state[name];
    const errorMessage = name + 'Error';
    let isValid = true;

    switch (name) {
      case 'email':
        isValid = isValid && emailRegEx.test(value);
        break;
      case 'password':
        isValid = isValid && passwordRegEx.test(value);
        break;
      case 'passwordConf':
        isValid = isValid && value === password;
        break;
      default:
        break;
    }

    if (isValid) {
      this.setState({ [errorMessage]: '' });
      return true;
    } else {
      this.setState({ [errorMessage]: translate(errorMessage) });
      document.getElementById(name).focus();
      return false;
    }
  }

  handleInputChange = e => {
    const { mode } = this.state;
    const { name, value } = e.target;
    this.setState(
      { [name]: value },
      // validate inputs on 'register' mode
      () => { if (mode === 'register') this.validateField(name) }
    );
  }

  handleLoginWithEmail = () => {
    const { email, password } = this.state;
    const { loginWithEmail } = this.props;

    loginWithEmail(email, password);
  }

  handleSignUpWithEmail = () => {
    const { email, password } = this.state;
    const { signupWithEmail } = this.props;

    let isValid = true;
    LOGIN_INPUTS.forEach(({ name }) => {
      isValid = isValid && this.validateField(name);
    });

    if (isValid) signupWithEmail(email, password);
  }

  renderInputs = inputs => {
    return inputs.map(({
      name,
      type,
      placeholder,
      renderForLogin,
      renderForRegister,
      autoFocus
    }) => {
      const { mode } = this.state;
      const value = this.state[name];
      const errorMessage = this.state[`${name}Error`];
      const shouldRender =
        (mode === 'login' && renderForLogin) ||
        (mode === 'register' && renderForRegister);

      if (shouldRender) {
        return (
          <FormControl
            fullWidth
            key={name}
            variant="outlined"
            className="login__form__input"
            error={errorMessage ? true : false}
          >
            <OutlinedInput
              autoFocus={autoFocus}
              labelWidth={0}
              type={type}
              id={name}
              name={name}
              placeholder={placeholder}
              value={value}
              onChange={this.handleInputChange}
            />
            {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
          </FormControl>
        );
      }

      return undefined;
    })
  }

  renderLoginButtons = () => {
    const { translate, loginAsGuest } = this.props;
    const { mode } = this.state;
    
    return (
      <div className="login-buttons">
        <Button
          variant="contained"
          color="primary"
          onClick={mode === 'login' ? this.handleLoginWithEmail : this.toggleMode}
        >
          {translate(mode === 'login' ? 'login' : 'cancel')}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={mode === 'login' ? this.toggleMode : this.handleSignUpWithEmail}
        >
          {translate('signup')}
        </Button>
        {mode === 'login' && (
          <Button
            variant="text"
            color="primary"
            className="login__form-fullWidth"
            onClick={loginAsGuest}
          >
            {translate('continueAsGuest')}
          </Button>
        )}
      </div>
    );
  }

  renderOauthButtons = buttons => {
    const { translate } = this.props;

    return (
      <div className="oauth-buttons">
        <Divider className="login__form-fullWidth"/>
        {buttons.map(({ provider, label }) => {
          return (
            <Button
              key={provider}
              href={`${API_HOST}/auth/${provider}`}
              variant="contained"
              className={`login__form-fullWidth ${provider}-login`}
            >
              {translate(label)}
            </Button>
          )
        })}
      </div>
    )
  }

  render() {
    const { mode } = this.state;

    return (
      <div className="login">
        <div className="login__app-name">
          먹놀잠
        </div>
        <div className="login__form">
          {this.renderInputs(LOGIN_INPUTS)}
          {this.renderLoginButtons()}
          {mode === 'login' && this.renderOauthButtons(OAUTH_BUTTONS)}
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