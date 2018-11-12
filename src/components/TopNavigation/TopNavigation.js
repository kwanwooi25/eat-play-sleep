import React from 'react';
import { NavLink } from 'react-router-dom';
import { withTranslate } from 'react-redux-multilingual';

/** Components */
import SVGIcon from '../SVGIcon/SVGIcon';

const TOP_NAV_ITEMS = ['summary', 'feed', 'sleep', 'diaper', 'growth'];

const TopNavigation = ({ translate }) => {

  const pathname = window.location.pathname.slice(1).split('/')[1];

  return (
    <div className="top-nav">
      {TOP_NAV_ITEMS.map(name => {
        const isActive = pathname === name;
        const className = isActive ? 'top-nav__button--active' : 'top-nav__button';
        
        return (
          <NavLink key={name} to={`/stats/${name}`}>
            <button className={className}>
              <SVGIcon name={name} className="top-nav__button__icon" />
              <span className="top-nav__button__label">
                {translate(`${name}Label`)}
              </span>
            </button>
          </NavLink>
        )
      })}
    </div>
  )
}

export default withTranslate(TopNavigation);