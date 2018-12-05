import React, { Component } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

/** Styled Components */
import FormElement from '../styled_components/shared/FormElement';

class CustomSelect extends Component {
  state = { anchorEl: null };

  openMenu = e => this.setState({ anchorEl: e.target });

  handleClose = value => {
    const { onChange } = this.props;
    this.setState({ anchorEl: null });
    onChange(value);
  }

  render() {
    const {
      label,
      labelAlign = 'column',
      value,
      options,
    } = this.props;
    const { anchorEl } = this.state;

    return (
      <FormElement labelAlign={labelAlign}>
        {label && <FormElement.Label>{label}</FormElement.Label>}
        <FormElement.Select onClick={this.openMenu}>
          {value}
        </FormElement.Select>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => this.handleClose(false)}
        >
          {options.map(({ value, label }) => {
            return (
              <MenuItem
                key={value}
                value={value}
                onClick={() => this.handleClose(value)}
              >
                {label}
              </MenuItem>
            )
          })}
        </Menu>
      </FormElement>
    )
  }
}

export default CustomSelect;