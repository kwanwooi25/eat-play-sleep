import React, { Component } from 'react';
import { withTranslate } from 'react-redux-multilingual';

/** Material UI */
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import OutlinedInput from '@material-ui/core/OutlinedInput';

/** Material UI Picker */
import DatePicker from 'material-ui-pickers/DatePicker';

/** Components */
import CustomSelector from '../../components/CustomSelector/CustomSelector';

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
    const FormField = ({
      error,
      inputComponent
    }) => {
      return (
        <FormControl
          fullWidth
          variant="outlined"
          error={error ? true : false}
        >
          {inputComponent}
          {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
      );
    }

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
              fullWidth
              variant="outlined"
              error={nameError ? true : false}
            >
              <OutlinedInput
                labelWidth={0}
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
            <FormField
              error={genderError}
              inputComponent={
                <CustomSelector
                  name="gender"
                  options={GENDER_OPTIONS}
                  value={gender}
                  onChange={this.handleInputChange}
                  size="small"
                />
              }
            />
            
            <label htmlFor="birthday">
              {translate('babyBirthdayLabel')}
            </label>
            <FormField
              error={birthdayError}
              inputComponent={
                <DatePicker
                  variant="outlined"
                  value={birthday}
                  onChange={this.handleDateChange}
                  format={translate('dateFormat')}
                />
              }
            />
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