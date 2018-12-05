import React from 'react';
import MuiIcon from '@material-ui/core/Icon'
import ColorSelect from '../styled_components/ColorSelect';

const ColorSelectContainer = ({ colors, onChange, selected }) => {
  return (
    <ColorSelect>
      {colors.map(color => (
        <ColorSelect.Item
          key={color}
          color={color}
          onClick={() => onChange(color)}
          selected={selected === color}
        >
          <MuiIcon color="inherit" fontSize="large">check</MuiIcon>
        </ColorSelect.Item>
      ))}
    </ColorSelect>
  )
}

export default ColorSelectContainer;