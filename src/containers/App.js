/** Dependancies */
import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

/** Actions */
import * as actions from '../actions';

/** Components */
import MainContainer from './MainContainer/MainContainer';
import Login from './Login/Login';
import Home from './Home/Home';
import Logs from './Logs/Logs';
import ActivitySummary from './ActivitySummary/ActivitySummary';
import ActivityTrend from './ActivityTrend/ActivityTrend';

/** Stylesheet */
import './App.scss';

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
  {
    path: '/home',
    component: () => (
      <MainContainer route='home'>
        <Home />
      </MainContainer>
    )
  },
  {
    path: '/logs',
    component: () => (
      <MainContainer route='logs'>
        <Logs />
      </MainContainer>
    )
  },
  {
    path: '/charts',
    component: () => <Redirect to='/charts/summary' />
  },
  {
    path: '/charts/summary',
    component: () => (
      <MainContainer route='charts'>
        <ActivitySummary />
      </MainContainer>
    )
  },
  {
    path: '/charts/feed',
    component: () => (
      <MainContainer route='charts'>
        <ActivityTrend activityName="feed" />
      </MainContainer>
    )
  },
  {
    path: '/charts/sleep',
    component: () => (
      <MainContainer route='charts'>
        <ActivityTrend activityName="sleep" />
      </MainContainer>
    )
  },
  {
    path: '/charts/diaper',
    component: () => (
      <MainContainer route='charts'>
        <ActivityTrend activityName="diaper" />
      </MainContainer>
    )
  },
  {
    path: '/charts/growth',
    component: () => (
      <MainContainer route='charts'>
        <ActivityTrend activityName="growth" />
      </MainContainer>
    )
  },
];

const PrivateRoute = ({ isLoggedIn, ...rest }) =>
  isLoggedIn === false ? <Redirect to="/" /> : <Route {...rest} />;


class App extends Component {
  componentDidMount() {
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
    const { isLoggedInAsGuest, isLoggedInAsUser, currentUser } = this.props.auth;
    const isLoggedIn = (isLoggedInAsGuest || isLoggedInAsUser) && currentUser;
    return (
      <BrowserRouter>
        <Switch>
          {this.renderPublicRoutes(PUBLIC_ROUTES, isLoggedIn)}
          {this.renderPrivateRoutes(PRIVATE_ROUTES, isLoggedIn)}
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = ({ auth, Intl: { locale } }) => {
  return { auth, locale };
}

export default connect(mapStateToProps, actions)(App);
