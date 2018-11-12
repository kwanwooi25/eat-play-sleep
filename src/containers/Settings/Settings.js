import React, { Component } from 'react';
import { connect } from 'react-redux';

/** Components */
import NoBaby from '../../components/NoBaby/NoBaby';
import BabyProfile from '../../components/BabyProfile/BabyProfile';

/** Actions */
import * as actions from '../../actions';

class Settings extends Component {
  render() {
    const {
      auth: { currentUser },
      babies: { currentBaby }
    } = this.props;

    console.log(currentBaby);

    return (
      <div className="settings">
        <div className="settings__baby-profile">
          {currentBaby ? (
            <BabyProfile
              user={currentUser}
              baby={currentBaby}
            />
          ) : (
            <NoBaby />
          )}
        </div>
        <div className="settings__app-settings">
          App Settings
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ auth, babies }) => {
  return { auth, babies };
}

export default connect(mapStateToProps, actions)(Settings);