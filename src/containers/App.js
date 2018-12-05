/** Dependancies */
import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

/** Components */
import Login from './Login';
import Home from './Home';
import Logs from './Logs';
import Settings from './Settings';
import ActivitySummary from './ActivitySummary';
import ActivityTrend from './ActivityTrend';

/** Actions */
import * as actions from '../actions';

/** Styled Components */
import { ThemeProvider } from 'styled-components';
import themeBase from '../utils/theme';
import GlobalStyle from '../styled_components/shared/GlobalStyle';

/**
 * Public Routes
 * - can only be accessed when logged out
 */
const PUBLIC_ROUTES = [
  { path: '/', component: () => <Login /> },
];
const PublicRoute = ({ isLoggedIn, ...rest }) =>
  isLoggedIn === false ? <Route {...rest} /> : <Redirect to="/home" />;

/**
 * Private Routes
 * - can only be accessed when logged in
 */
const PRIVATE_ROUTES = [
  { path: '/home', component: () => <Home /> },
  { path: '/logs', component: () => <Logs /> },
  { path: '/stats', component: () => <Redirect to='/stats/summary' /> },
  { path: '/stats/summary', component: () => <ActivitySummary /> },
  { path: '/stats/feed', component: () => <ActivityTrend activityName="feed" /> },
  { path: '/stats/sleep', component: () => <ActivityTrend activityName="sleep" /> },
  { path: '/stats/diaper', component: () => <ActivityTrend activityName="diaper" /> },
  { path: '/stats/growth', component: () => <ActivityTrend activityName="growth" /> },
  { path: '/settings', component: () => <Settings /> },
];

const PrivateRoute = ({ isLoggedIn, ...rest }) =>
  isLoggedIn === false ? <Redirect to="/" /> : <Route {...rest} />;

class App extends Component {
  componentWillMount() {
    this.props.getCurrentUser();
  }

  renderPublicRoutes = (routes, isLoggedIn) => {
    return routes.map(({ path, component }) => (
      <PublicRoute
        exact
        key={path}
        path={path}
        isLoggedIn={isLoggedIn}
        component={component}
      />
    ));
  }

  renderPrivateRoutes = (routes, isLoggedIn) => {
    return routes.map(({ path, component }) => (
      <PrivateRoute
        exact
        key={path}
        path={path}
        isLoggedIn={isLoggedIn}
        component={component}
      />
    ));
  }

  render() {
    const { currentUser } = this.props.auth;
    const isLoggedIn = Boolean(currentUser);
    const primary = (currentUser && currentUser.settings.themeColor) || 'indigo';
    const theme = Object.assign({}, themeBase, { primary });

    return (
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyle />
          <BrowserRouter>
            <Switch>
              {this.renderPublicRoutes(PUBLIC_ROUTES, isLoggedIn)}
              {this.renderPrivateRoutes(PRIVATE_ROUTES, isLoggedIn)}
            </Switch>
          </BrowserRouter>
        </>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, actions)(App);
