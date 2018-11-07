import moment from 'moment';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';

/** Material UI */
import Icon from '@material-ui/core/Icon';

/** actions */
import * as actions from '../../actions';

const BOTTOM_NAV_ITEMS = [
  { label: 'home', icon: 'home' },
  { label: 'logs', icon: 'list' },
  { label: 'chart', icon: 'pie_chart' },
  { label: 'settings', icon: 'settings' },
];

class MainContainer extends Component {
  renderBottomNavItems = items => {
    const { translate } = this.props;

    return items.map(({ label, icon }) => {
      const pathname = window.location.pathname.slice(1);
      const isActive = pathname === label;
      const className = isActive ? 'bottom-nav__button--active' : 'bottom-nav__button';

      return (
        <NavLink key={label} to={label}>
          <button className={className}>
            <Icon className="bottom-nav__button__icon" color="inherit">
              {icon}
            </Icon>
            <span className="bottom-nav__button__label">
              {translate(`${label}Label`)}
            </span>
          </button>
        </NavLink>
      )
    })
  }

  render() {
    const {
      babies,
      translate,
      logoutUser,
      children
    } = this.props;

    let babyName = '';
    let babyAge = '';

    if (babies.currentBaby) {
      const today = moment();
      const birthday = moment(babies.currentBaby.birthday);
      babyName = babies.currentBaby.name;
      babyAge = today.diff(birthday, 'days');
    }

    return (
      <main className="main">
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
        
        <div className="page-content">
          {children}
        </div>

        <div className="bottom-nav">
          {this.renderBottomNavItems(BOTTOM_NAV_ITEMS)}
        </div>
      </main>
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