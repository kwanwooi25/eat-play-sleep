import React from 'react';

/** Styled Components */
import NoData from '../styled_components/NoData';

/** Material UI */
import MuiIcon from '@material-ui/core/Icon';

const NoDataContainer = ({ icon, message }) => {
  return (
    <NoData>
      <MuiIcon color="inherit" style={{ fontSize: '3rem' }}>{icon}</MuiIcon>
      <span>{message}</span>
    </NoData>
  )
}

export default NoDataContainer;