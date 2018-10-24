import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';

/** Swipeable Views */
import SwipeableViews from 'react-swipeable-views';

/** Material UI */
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
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

  handleChangeBottomNav = (event, value) => this.setState({ value })

  handleChangeIndex = index => this.setState({ value: index })

  render() {
    const { value } = this.state;
    const { babies, translate, logoutUser } = this.props;

    return (
      <div className="main">
        <AppBar position="static" color="primary">
          <Toolbar>
            <h3 className="appbar-title">{babies.currentBaby && babies.currentBaby.name}</h3>
            <Button
              color="inherit"
              onClick={logoutUser}
            >
              {translate('logout')}
            </Button>
          </Toolbar>
        </AppBar>
        <SwipeableViews
          className="swipeable-views"
          axis="x"
          index={value}
          onChangeIndex={this.handleChangeIndex}
        >
          <div className="content" dir="ltr">
            <Home />
          </div>
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