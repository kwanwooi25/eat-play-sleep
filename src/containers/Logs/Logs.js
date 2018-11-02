import React, { Component } from 'react';
import { connect } from 'react-redux';

/** Components */
import Log from '../../components/Log/Log';

/** Actions */
import * as actions from '../../actions';

class Logs extends Component {
  render() {
    const { activities: { all } } = this.props;

    return (
      <div className="logs">
        {all.map(activity => <Log key={activity.id} activity={activity} />)}
      </div>
    )
  }
}

const mapStateToProps = ({ activities }) => {
  return { activities };
}

export default connect(mapStateToProps, actions)(Logs);