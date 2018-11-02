import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';
import moment from 'moment';

/** Swipeable Views */
import SwipeableViews from 'react-swipeable-views';

/** Material UI */
import Icon from '@material-ui/core/Icon';

/** Components */
import Home from '../Home/Home';

/** actions */
import * as actions from '../../actions';

const BOTTOM_NAV_ITEMS = [
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

    if (currentBaby) getActivities(currentUser, currentBaby.id);
  }

  renderBottomNavItems = items => {
    const { translate } = this.props;
    const { value } = this.state;

    return items.map(({ label, icon }, index) => {
      const activeClassName = value === index ? 'active' : '';

      return (
        <button
          key={label}
          className={`bottom-nav__button ${activeClassName}`}
          onClick={() => { this.handleBottomNavChange(index) }}
        >
          <Icon>{icon}</Icon>
          <span className="bottom-nav__button__label">
            {translate(`${label}Label`)}
          </span>
        </button>
      )
    })
  }

  handleBottomNavChange = index => this.setState({ value: index });

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
          <button
            className="main-header__button"
            onClick={logoutUser}
          >
            {translate('logout')}
          </button>
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
        <div className="bottom-nav">
          {this.renderBottomNavItems(BOTTOM_NAV_ITEMS)}
        </div>
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