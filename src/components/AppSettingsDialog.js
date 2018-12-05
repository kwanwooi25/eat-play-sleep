import React, { Component } from 'react';
import { withTranslate } from 'react-redux-multilingual';

/** Material UI Components */
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';

/** Styled Components */
import AppSettings from '../styled_components/AppSettings';

/** Components */
import CustomSelector from './CustomSelector';
import CustomRadioGroup from './CustomRadioGroup';
import ColorSelect from './ColorSelect';

const ACTIVITY_OPTIONS = [
  'breast',
  'bottle',
  'pump',
  'babyfood',
  'diaper',
  'sleep',
  'growth',
];
const LANGUAGE_OPTIONS = [ 'ko', 'en' ];
const UNITS = {
  volume: [{ value: 'ml', label: 'ML' }, { value: 'oz', label: 'OZ' }],
  length: [{ value: 'cm', label: 'CM' }, { value: 'in', label: 'IN' }],
  weight: [{ value: 'kg', label: 'KG' }, { value: 'lb', label: 'LB' }],
};
const COLOR_OPTIONS = [
  'red',
  'pink',
  'purple',
  'deepPurple',
  'indigo',
  'blue',
  'lightBlue',
  'cyan',
  'teal',
  'green',
  'lightGreen',
  'lime',
  'yellow',
  'amber',
  'orange',
  'deepOrange',
  'brown',
  'grey',
  'blueGrey',
];

const Transition = props => <Slide direction="left" {...props} />;

class AppSettingsDialog extends Component {
  state = {
    displayActivities: ACTIVITY_OPTIONS,
    displayLanguage: window.navigator.language.slice(0, 2) === 'ko' ? 'ko' : 'en',
    displayUnits: { volume: 'ml', length: 'cm', weight: 'kg' },
    themeColor: 'indigo',
  }

  componentWillReceiveProps(props) {
    const displayActivities = props.displayActivities || ACTIVITY_OPTIONS;
    const displayLanguage = props.displayLanguage || 'en';
    const displayUnits = props.displayUnits || { volume: 'ml', length: 'cm', weight: 'kg' };
    const themeColor = props.themeColor || 'indigo';

    this.setState({
      displayActivities,
      displayLanguage,
      displayUnits,
      themeColor,
    })
  }

  handleCancel = () => {
    this.props.onClose(false);
  }

  handleConfirm = () => {
    const { settingsLabel } = this.props;
    this.props.onClose(this.state[settingsLabel]);
  }

  handleDisplayActivitiesChange = e => {
    const { value } = e.target;
    let { displayActivities } = this.state;

    if (displayActivities.includes(value)) {
      displayActivities = displayActivities.filter(name => name !== value);
    } else {
      displayActivities.push(value);
    }

    this.setState({ displayActivities });
  }

  handleLanguageChange = e => this.setState({ [e.target.name]: e.target.value });

  handleUnitChange = e => {
    const { name, value } = e.target;
    const { displayUnits } = this.state;
    displayUnits[name] = value;

    this.setState({ displayUnits });
  }

  handleColorChange = themeColor => this.setState({ themeColor });

  render() {
    const {
      translate,
      open,
      onClose,
      settingsLabel
    } = this.props;
    const {
      displayActivities,
      displayLanguage,
      displayUnits,
      themeColor,
    } = this.state;

    const languageRadioOptions = 
      LANGUAGE_OPTIONS.map(language =>
        ({ value: language, label: translate(language) }));

    return (
      <Dialog
        open={open}
        onClose={() => onClose(false)}
        TransitionComponent={Transition}
        keepMounted
      >
        <AppSettings>
          <AppSettings.Title>{translate(settingsLabel)}</AppSettings.Title>

          <AppSettings.Content>
            {settingsLabel === 'displayActivities' && (
              <CustomSelector
                options={ACTIVITY_OPTIONS}
                value={displayActivities}
                onChange={this.handleDisplayActivitiesChange}
                multiChoice={true}
              />
            )}

            {settingsLabel === 'displayLanguage' && (
              <CustomRadioGroup
                name="displayLanguage"
                options={languageRadioOptions}
                value={displayLanguage}
                onChange={this.handleLanguageChange}
              />
            )}

            {settingsLabel === 'displayUnits' && (
              <>
                {Object.keys(UNITS).map(key => {
                  return (
                    <CustomRadioGroup
                      key={key}
                      name={key}
                      label={translate(`${key}Unit`)}
                      labelAlign="row"
                      options={UNITS[key]}
                      value={displayUnits[key]}
                      onChange={this.handleUnitChange}
                    />
                  )
                })}
              </>
            )}

            {settingsLabel === 'themeColor' && (
              <ColorSelect
                selected={themeColor}
                colors={COLOR_OPTIONS}
                onChange={this.handleColorChange}
              />
            )}
          </AppSettings.Content>

          <AppSettings.ButtonGroup>
            <AppSettings.Button onClick={this.handleCancel} cancel>
              {translate('cancel')}
            </AppSettings.Button>
            <AppSettings.Button onClick={this.handleConfirm}>
              {translate('confirm')}
            </AppSettings.Button>
          </AppSettings.ButtonGroup>
        </AppSettings>
      </Dialog>
    )
  }
}

export default withTranslate(AppSettingsDialog);