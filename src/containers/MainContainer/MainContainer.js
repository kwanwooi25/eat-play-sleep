import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';
import moment from 'moment';

/** Swipeable Views */
import SwipeableViews from 'react-swipeable-views';

/** Material UI */
import Button from '@material-ui/core/Button';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';

/** Components */
import Home from '../Home/Home';

/** actions */
import * as actions from '../../actions';

const ACTIONS = [
  { label: 'home', icon: 'home' },
  { label: 'logs', icon: 'list' },
  { label: 'chart', icon: 'pie_chart' },
  { label: 'settings', icon: 'settings' },
];

class MainContainer extends Component {
  state = { value: 0 }

  componentDidMount() {
    const {
      auth: { currentUser },
      babies: { currentBaby },
      getActivities,
    } = this.props;

    getActivities(currentUser, currentBaby.id);
  }

  renderActions = actions => {
    const { translate } = this.props;

    return actions.map(({ label, icon }, index) => (
      <BottomNavigationAction
        key={label}
        label={translate(`${label}Label`)}
        value={index}
        icon={<Icon>{icon}</Icon>}
      />
    ))
  }

  handleChangeBottomNav = (event, value) => this.setState({ value });

  handleChangeIndex = index => this.setState({ value: index });

  render() {
    const { value } = this.state;
    const { babies, translate, logoutUser } = this.props;

    let babyName = '';
    let babyAge = '';

    if (babies.currentBaby) {
      const today = moment();
      const birthday = moment(babies.currentBaby.birthday);
      babyName = babies.currentBaby.name;
      babyAge = today.diff(birthday, 'days');
    }

    return (
      <div className="main">
        <header className="main-header">
          <div className="baby-info">
            {babyName && <h3 className="baby-name">{babyName}</h3>}
            {babyAge && (
              <span className="baby-age">
                ({translate('babyAge', { age: babyAge })})
              </span>
            )}
          </div>
          <Button
            color="inherit"
            onClick={logoutUser}
          >
            {translate('logout')}
          </Button>
        </header>
        <SwipeableViews
          className="swipeable-views"
          axis="x"
          index={value}
          onChangeIndex={this.handleChangeIndex}
        >
          <Home className="content" dir="ltr" />
          <div className="content" dir="ltr">Logs</div>
          <div className="content" dir="ltr">Chart</div>
          <div className="content" dir="ltr">Settings</div>
        </SwipeableViews>
        <BottomNavigation value={value} onChange={this.handleChangeBottomNav}>
          {this.renderActions(ACTIONS)}
        </BottomNavigation>
      </div>
    )
  }
}

const mapStateToProps = ({ auth, babies }) => {
  return { auth, babies }
}

export default withTranslate(
  connect(
    mapStateToProps,
    actions
  )(MainContainer)
);