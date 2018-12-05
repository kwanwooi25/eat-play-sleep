import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { withTranslate } from 'react-redux-multilingual';

/** Styled Components */
import Main from '../styled_components/Main';
import Snackbar from '../styled_components/shared/Snackbar';

/** Components */
import StatsNavigation from './StatsNavigation';

/** Material UI */
import Icon from '@material-ui/core/Icon';

/** Contstants */
const BOTTOM_NAV_ITEMS = [
  { label: 'home', icon: 'home' },
  { label: 'logs', icon: 'list' },
  { label: 'stats', icon: 'insert_chart' },
  { label: 'settings', icon: 'settings' },
];

const RouteContainer = ({
  translate,
  snackbar,
  route,
  baby,
  children
}) => {
  let babyName = '';
  let babyAge = '';

  if (baby) {
    const today = moment();
    const birthday = moment(baby.birthday);
    babyName = baby.name;
    babyAge = today.diff(birthday, 'days');
  }

  return (
    <Main route={route}>
      <Main.Header>
        <Main.Header.Wrapper>
          {babyName && <Main.Header.Title>{babyName}</Main.Header.Title>}
          {babyAge && (
            <Main.Header.Content>
              {translate('babyAge', { age: babyAge})}
            </Main.Header.Content>
          )}
        </Main.Header.Wrapper>
      </Main.Header>

      {route === 'stats' && <StatsNavigation />}

      <Main.Content>
        <Main.Content.Wrapper>{children}</Main.Content.Wrapper>
      </Main.Content>

      <Main.BottomNav>
        <Main.BottomNav.Wrapper>
          {BOTTOM_NAV_ITEMS.map(({ label, icon }) => {
            const isActive = route === label;
            const shouldDisableNavLink = ['logs', 'stats'].includes(label) && !baby;

            return (
              <Main.BottomNav.Link
                key={label}
                as={NavLink}
                to={`/${label}`}
                active={isActive.toString()}
                disabled={shouldDisableNavLink}
              >
                <Icon color="inherit">{icon}</Icon>
                <Main.BottomNav.Link.Label>
                  {translate(`${label}Label`)}
                </Main.BottomNav.Link.Label>
              </Main.BottomNav.Link>
            )
          })}
        </Main.BottomNav.Wrapper>
      </Main.BottomNav>
      
      <Snackbar open={snackbar.open} variant={snackbar.variant}>
        <Snackbar.Content>{snackbar.message}</Snackbar.Content>
      </Snackbar>
    </Main>
  )
}

const mapStateToProps = ({ snackbar }) => ({ snackbar });

export default withTranslate(connect(mapStateToProps)(RouteContainer));