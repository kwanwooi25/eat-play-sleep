/** Dependancies */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';

/** Material UI Components */
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

/** Actions */
import * as actions from '../../actions';

class Home extends Component {

  renderUserInfo = user => {
    if (!user) return undefined;

    const { id, email, babies } = user;
    const renderBabies = babies => {
      if (!babies) return undefined;
      
      return babies.map(({ id, name, gender, birthday }) => {
        return (
          <li key={id}>
            <span>{name}</span>
            <span>{gender}</span>
            <span>{birthday}</span>
          </li>
        )
      })
    }

    return (
      <div className="user-info">
        <p>user_id: {id}</p>
        <p>user_email: {email}</p>
        {renderBabies(babies)}
      </div>
    )
  }

  render() {
    const { translate, auth } = this.props;

    return (
      <div className="home">
        <AppBar position="static">
          <Toolbar>
            <h6 className="app-title">Home</h6>
            <Button
              color="inherit"
              onClick={this.props.logoutUser}
            >
              {translate('logout')}
            </Button>
          </Toolbar>
        </AppBar>
        {this.renderUserInfo(auth.currentUser)}
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth }
}

export default withTranslate(
  connect(
    mapStateToProps,
    actions
  )(Home)
);