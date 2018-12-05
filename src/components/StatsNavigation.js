import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { withTranslate } from 'react-redux-multilingual';

/** Components */
import Icon from './Icon';

/** Styled Components */
import StatsNavigation from '../styled_components/StatsNavigation';

const TOP_NAV_ITEMS = ['summary', 'feed', 'sleep', 'diaper', 'growth'];

const StatsNavContainer = ({
  translate,
  auth: { currentUser : { settings : { displayActivities } } },
}) => {
  const pathname = window.location.pathname.slice(1).split('/')[1];
  let navItems = TOP_NAV_ITEMS;
  if (displayActivities) {
    navItems = TOP_NAV_ITEMS.filter(name => {
      if (name === 'summary') return true;
      if (name === 'feed') {
        return (
          displayActivities.includes('breast') ||
          displayActivities.includes('bottle') ||
          displayActivities.includes('babyfood')
        );
      }
      return displayActivities.includes(name);
    });
  }

  return (
    <StatsNavigation>
      {navItems.map(name => {
        return (
          <StatsNavigation.NavItem
            as={NavLink}
            to={`/stats/${name}`}
            key={name}
            active={(pathname === name).toString()}
          >
            <Icon name={name} />
            <StatsNavigation.NavItem.Label>
              {translate(`${name}Label`)}
            </StatsNavigation.NavItem.Label>
          </StatsNavigation.NavItem>
        )
      })}
    </StatsNavigation>
  )
}

const mapStateToProps = ({ auth }) => ({ auth });

export default withTranslate(connect(mapStateToProps)(StatsNavContainer));