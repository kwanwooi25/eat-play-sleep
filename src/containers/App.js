/** Dependancies */
import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

/** Components */
import Login from './Login/Login';
import Home from './Home/Home';

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
  { path: '/home', component: () => <Home /> },
];
const PrivateRoute = ({ isLoggedIn, ...rest }) =>
  isLoggedIn === false ? <Redirect to="/" /> : <Route {...rest} />;




class App extends Component {

  // /**
  //  * @param {string} locale 'en' or 'ko'
  //  */
  // setLocale = locale => {
  //   console.log(locale);
  //   this.props.dispatch(IntlActions.setLocale(locale));
  // }

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
    console.log(window.navigator.language);
    console.log(this.props);
    const { isLoggedInAsGuest, isLoggedInAsUser, currentUser } = this.props.auth;
    const isLoggedIn = (isLoggedInAsGuest || isLoggedInAsUser) && currentUser;
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            {this.renderPublicRoutes(PUBLIC_ROUTES, isLoggedIn)}
            {this.renderPrivateRoutes(PRIVATE_ROUTES, isLoggedIn)}
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = ({ auth, Intl: { locale } }) => {
  return { auth, locale };
}

export default connect(mapStateToProps)(App);
