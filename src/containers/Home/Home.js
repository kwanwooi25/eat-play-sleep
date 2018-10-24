/** Dependancies */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';

/** Material UI */
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

/** Components */
import NewBabyModal from '../../components/NewBabyModal/NewBabyModal';

/** Actions */
import * as actions from '../../actions';

class Home extends Component {
  state = {
    isNewBabyModalOpen: false
  }

  handleAddBabyButton = () => {
    this.setState({ isNewBabyModalOpen: true });
  }

  handleNewBabyModalClose = baby => {
    const { auth, addBaby } = this.props;
    this.setState({ isNewBabyModalOpen: false });

    baby.guardians = [ auth.currentUser.id ];
    if (baby) addBaby(auth.currentUser, baby);
  }

  render() {
    let { isNewBabyModalOpen } = this.state;
    const { babies, translate } = this.props;

    return (
      <div className="home">
        {!babies.currentBaby && (
          <div className="no-baby">
            <Button
              variant="fab"
              color="secondary"
              aria-label="add baby"
              onClick={this.handleAddBabyButton}
            >
              <Icon fontSize="large">add</Icon>
            </Button>
            <p>{translate('noBabyMessage_line1')}</p>
            <p>{translate('noBabyMessage_line2')}</p>
          </div>
        )}
        
        <NewBabyModal
          open={isNewBabyModalOpen}
          onClose={this.handleNewBabyModalClose}
        />
      </div>
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
  )(Home)
);