import React, { Component } from 'react';
import { withTranslate } from 'react-redux-multilingual';

/** Material UI Components */
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';

/** Components */
import CustomSelector from '../../components/CustomSelector/CustomSelector';
import CustomRadioGroup from '../../components/CustomRadioGroup/CustomRadioGroup';
import DialogButtonGroup from '../DialogButtonGroup/DialogButtonGroup';

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

const Transition = props => <Slide direction="left" {...props} />;

class AppSettingsDialog extends Component {
  constructor(props) {
    super(props);

    const displayActivities = props.displayActivities || ACTIVITY_OPTIONS;
    const displayLanguage = props.displayLanguage || 'en';

    this.state = {
      displayActivities,
      displayLanguage,
    }
  }
  componentWillReceiveProps(props) {
    const displayActivities = props.displayActivities || ACTIVITY_OPTIONS;
    const displayLanguage = props.displayLanguage || 'en';

    this.setState({
      displayActivities,
      displayLanguage,
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

  handleLanguageChange = e => this.setState({ displayLanguage: e.target.value });

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
        <div className="app-settings-dialog">
          <div className="app-settings-dialog__title">
            <h3>{translate(settingsLabel)}</h3>
          </div>
  
          {settingsLabel === 'displayActivities' && (
            <div className="display-activities-selector">
              <CustomSelector
                options={ACTIVITY_OPTIONS}
                value={displayActivities}
                onChange={this.handleDisplayActivitiesChange}
                multiChoice={true}
              />
            </div>
          )}

          {settingsLabel === 'displayLanguage' && (
            <div className="display-language-selector">
              <CustomRadioGroup
                name="language"
                options={languageRadioOptions}
                value={displayLanguage}
                onChange={this.handleLanguageChange}
              />
            </div>
          )}
  
          <DialogButtonGroup
            variant="confirm"
            cancelLabel={translate('cancel')}
            confirmLabel={translate('confirm')}
            onCancel={this.handleCancel}
            onConfirm={this.handleConfirm}
          />
        </div>
      </Dialog>
    )
  }
}

export default withTranslate(AppSettingsDialog);