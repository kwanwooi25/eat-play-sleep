import React from 'react';
import moment from 'moment';
import { withTranslate } from 'react-redux-multilingual';

/** Material UI Components */
import Icon from '@material-ui/core/Icon';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

/** Components */
import SVGIcon from '../SVGIcon/SVGIcon';

/** Helper functions */
import parseSeconds from '../../helpers/parseSeconds';

class Log extends React.Component {
  state = { anchorEl: null }

  openMenu = e => this.setState({ anchorEl: e.currentTarget });

  handleMenuClose = menuClicked => {
    this.setState({ anchorEl: null });
    this.props.onMenuClick(this.props.activity.id, menuClicked);
  }

  render() {
    const { anchorEl } = this.state;
    const { activity, translate } = this.props;
    const {
      name,
      time_start,
      duration_total,
      amount,
      amount_unit,
      type,
    } = activity;

    const shouldRenderDuration = ['breast', 'sleep'].includes(activity.name);
    const shouldRenderAmount = ['pump', 'bottle', 'babyfood'].includes(activity.name);
    const shouldRenderType = ['babyfood', 'diaper'].includes(activity.name);
  
    const totalTime = parseSeconds(duration_total);
    let hour = '';
    let minute = '';
    let second = '';
    if (totalTime.h) hour = `${translate('hour', { h: totalTime.h })}`;
    if (totalTime.m) minute = `${translate('minute', { m: totalTime.m })}`;
    if (totalTime.s) second = `${translate('second', { s: totalTime.s })}`;
    const timeString = `${hour} ${minute} ${second}`.trim();

    return (
      <div className="log">
        <div className={`log__icon ${name}`}>
          <SVGIcon className="log__title__icon" name={name} />
        </div>
        <div className="log__content">
          <span className="log__content__title">
            {translate(name)}
          </span>
          <div className="log__content__info">
            {shouldRenderDuration ? timeString : ''}
            {shouldRenderAmount ? `${amount} ${amount_unit}` : ''}
            {shouldRenderType ? translate(type) : '' }
          </div>
          <span className="log__content__time">
            {moment(time_start).format(translate('dateTimeFormat'))}
          </span>
        </div>
        <div className="log__buttons">
          <button className="log__buttons__edit" onClick={this.openMenu}>
            <Icon>more_vert</Icon>
          </button>
        </div>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => { this.handleMenuClose(false) }}
        >
          <MenuItem onClick={() => { this.handleMenuClose('edit') }}>
            <Icon className="log__menu__icon">edit</Icon>
          </MenuItem>
          <MenuItem onClick={() => { this.handleMenuClose('delete') }}>
            <Icon className="log__menu__icon">delete</Icon>
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default withTranslate(Log);