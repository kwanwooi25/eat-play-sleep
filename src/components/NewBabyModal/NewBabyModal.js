import React, { Component } from 'react';
import { withTranslate } from 'react-redux-multilingual';

/** Material UI */
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

/** Material UI Picker */
import DatePicker from 'material-ui-pickers/DatePicker';

class NewBabyModal extends Component {
  state = {
    name: '',
    gender: '',
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
    const { translate, open, onClose } = this.props;
    const { name, gender, birthday, nameError, genderError, birthdayError } = this.state;

    return (
      <Modal
        open={open}
        onClose={onClose}
        className="new-baby-modal__bg"
      >
        <Paper className="new-baby-modal">
          <h2 className="new-baby-modal__title">{translate('newBabyModalTitle')}</h2>

          <label htmlFor="name">
            {translate('babyNameLabel')}
          </label>
          <FormControl
            fullWidth
            variant="outlined"
            margin="normal"
            error={nameError ? true : false}
          >
            <OutlinedInput
              autoFocus
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
          <FormControl
            fullWidth
            variant="outlined"
            margin="normal"
            error={genderError ? true : false}
          >
            <Select
              value={gender}
              onChange={this.handleInputChange}
              input={
                <OutlinedInput
                  labelWidth={0}
                  name="gender"
                  id="gender"
                />
              }
            >
              <MenuItem value={'boy'}>Boy</MenuItem>
              <MenuItem value={'girl'}>Girl</MenuItem>
            </Select>
            {genderError && <FormHelperText>{genderError}</FormHelperText>}
          </FormControl>
          <label htmlFor="birthday">
            {translate('babyBirthdayLabel')}
          </label>
          <FormControl
            fullWidth
            variant="outlined"
            margin="normal"
            error={birthdayError ? true : false}
          >
            <DatePicker
              variant="outlined"
              value={birthday}
              onChange={this.handleDateChange}
              format={translate('dateFormat')}
            />
            {birthdayError && <FormHelperText>{birthdayError}</FormHelperText>}
          </FormControl>
          <div className="new-baby-modal__buttons">
            <Button
              variant="contained"
              color="default"
              onClick={onClose}
              fullWidth
            >
              {translate('cancel')}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleSave}
              fullWidth
            >
              {translate('save')}
            </Button>
          </div>
        </Paper>
      </Modal>
    )
  }
}

export default withTranslate(NewBabyModal);