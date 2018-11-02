import React, { Component } from 'react';
import { withTranslate } from 'react-redux-multilingual';

/** Material UI */
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

/** Components */
import CustomSelector from '../../components/CustomSelector/CustomSelector';
import CustomDatePicker from '../../components/CustomDatePicker/CustomDatePicker';

const Transition = props => <Slide direction="up" {...props} />;

const GENDER_OPTIONS = [ 'boy', 'girl' ];

class NewBabyDialog extends Component {
  state = {
    name: '',
    gender: 'boy',
    birthday: new Date(),

    /** error messages */
    nameError: '',
    genderError: '',
    birthdayError: '',
  }

  /**
   * Validate input fields
   * @return boolean
   */
  validateField = name => {
    const { translate } = this.props;

    const value = this.state[name];
    const errorMessage = name + 'Error';

    if (value) {
      this.setState({ [errorMessage]: '' });
      return true;
    } else {
      this.setState({ [errorMessage]: translate(errorMessage) });
      document.getElementById(name).focus();
      return false;
    }
  }

  handleCancel = () => this.props.onClose(false);

  handleSave = () => {
    const { name, gender, birthday } = this.state;
    const data = { name, gender, birthday };

    if (
      this.validateField('name') &&
      this.validateField('gender') &&
      this.validateField('birthday')
    ) {
      this.props.onClose(data);
    }
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState(
      { [name]: value },
      () => this.validateField(name)
    );
  }

  handleDateChange = date => this.setState({ birthday: date });

  render() {
    const { translate, open } = this.props;
    const { name, gender, birthday, nameError, genderError, birthdayError } = this.state;

    return (
      <Dialog
        open={open}
        onClose={this.handleCancel}
        TransitionComponent={Transition}
        keepMounted
      >
        <div className="new-baby-dialog">
          <div className="new-baby-dialog__title">
            <h3>{translate('newBabyDialogTitle')}</h3>
          </div>
          <div className="new-baby-dialog__form">
            <label htmlFor="name">
              {translate('babyNameLabel')}
            </label>
            <FormControl
              variant="outlined"
              error={nameError ? true : false}
            >
              <input
                className={`new-baby-dialog__form__input ${nameError ? 'error' : ''}`}
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={this.handleInputChange}
              />
              {nameError && <FormHelperText>{nameError}</FormHelperText>}
            </FormControl>
            
            <label htmlFor="gender">
              {translate('babyGenderLabel')}
            </label>
            <FormControl
              variant="outlined"
              error={genderError ? true : false}
            >
              <CustomSelector
                name="gender"
                options={GENDER_OPTIONS}
                value={gender}
                onChange={this.handleInputChange}
                size="small"
              />
              {genderError && <FormHelperText>{genderError}</FormHelperText>}
            </FormControl>
            
            <label htmlFor="birthday">
              {translate('babyBirthdayLabel')}
            </label>
            <FormControl
              variant="outlined"
              error={birthdayError ? true : false}
            >
              <CustomDatePicker
                value={birthday}
                onChange={this.handleDateChange}
                format={translate('dateFormat')}
              />
              {birthdayError && <FormHelperText>{birthdayError}</FormHelperText>}
            </FormControl>
          </div>
          <div className="new-baby-dialog__buttons">
            <button
              className="new-baby-dialog__buttons__cancel"
              onClick={this.handleCancel}
            >
              {translate('cancel')}
            </button>
            <button
              className="new-baby-dialog__buttons__confirm"
              onClick={this.handleSave}
            >
              {translate('save')}
            </button>
          </div>
        </div>
      </Dialog>
    )
  }
}

export default withTranslate(NewBabyDialog);