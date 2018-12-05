import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { withTranslate } from 'react-redux-multilingual';

/** Components */
import Icon from './Icon';

/** Styled Components */
import SubNavigation from '../styled_components/SubNavigation';

const TOP_NAV_ITEMS = ['summary', 'feed', 'sleep', 'diaper', 'growth'];

const StatsNavigation = ({
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
    <SubNavigation>
      <SubNavigation.Wrapper>
        {navItems.map(name => {
          return (
            <SubNavigation.NavItem
              as={NavLink}
              to={`/stats/${name}`}
              key={name}
              active={(pathname === name).toString()}
            >
              <Icon name={name} />
              <SubNavigation.NavItem.Label>
                {translate(`${name}Label`)}
              </SubNavigation.NavItem.Label>
            </SubNavigation.NavItem>
          )
        })}
      </SubNavigation.Wrapper>
    </SubNavigation>
  )
}

const mapStateToProps = ({ auth }) => ({ auth });

export default withTranslate(connect(mapStateToProps)(StatsNavigation));