import React, { Component } from 'react';
import moment from 'moment';
import { withTranslate } from 'react-redux-multilingual';

/** Styled Components */
import Log from '../styled_components/Log';

/** Material UI Components */
import MuiIcon from '@material-ui/core/Icon';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

/** Components */
import Icon from './Icon';

/** Utils */
import parseSeconds from '../utils/parseSeconds';
import { mlToOz, inToCm, lbToKg } from '../utils/unitChange';

const LogDetails = ({ label, value }) => {
  return (
    <Log.Details.Row>
      <Log.Details.Label>{label}</Log.Details.Label>
      <Log.Details.Value>{value}</Log.Details.Value>
    </Log.Details.Row>
  )
}

class LogContainer extends Component {
  state = {
    anchorEl: null,
    expandDetails: false,
  }

  openMenu = e => this.setState({ anchorEl: e.currentTarget });

  handleMenuClose = menuClicked => {
    this.setState({ anchorEl: null });
    this.props.onMenuClick(this.props.activity.id, menuClicked);
  }

  generateTimeString = seconds => {
    const { translate } = this.props;
    const timeObj = parseSeconds(seconds);
    let hour = '';
    let minute = '';
    let second = '';
    if (timeObj.h) hour = `${translate('hour', { h: timeObj.h })}`;
    if (timeObj.m) minute = `${translate('minute', { m: timeObj.m })}`;
    if (timeObj.s) second = `${translate('second', { s: timeObj.s })}`;
    return `${hour} ${minute} ${second}`.trim();
  }

  render() {
    const { anchorEl } = this.state;
    const { activity, translate, displayUnits, onLogClick } = this.props;
    const {
      id,
      name,
      type,
      time_start,
      duration_left,
      duration_right,
      duration_total,
      amount,
      height,
      weight,
      head,
      memo
    } = activity;

    const shouldRenderDuration = ['breast', 'sleep'].includes(name);
    const shouldRenderAmount = ['pump', 'bottle', 'babyfood'].includes(name);
    const shouldRenderType = ['babyfood', 'diaper'].includes(name);

    const shouldRenderTypeDetails = ['bottle', 'babyfood', 'diaper'].includes(name);
    const shouldRenderDurationDetails = ['breast', 'pump', 'bottle', 'sleep'].includes(name);
    const shouldRenderSideDurationDetails = ['breast', 'pump'].includes(name);
    const shouldRenderGrowthDetails = ['growth'].includes(name);
  
    const totalTimeString = this.generateTimeString(duration_total);
    let leftTimeString;
    let rightTimeString;
    if (shouldRenderSideDurationDetails) {
      leftTimeString = this.generateTimeString(duration_left);
      rightTimeString = this.generateTimeString(duration_right);
    }

    let amountString = '';
    if (shouldRenderAmount) {
      if (displayUnits.volume === 'oz') amountString = `${mlToOz(amount).toFixed(2)} oz`;
      else amountString = `${amount.toFixed(1)} ml`;
    }

    const growthStrings = {};
    if (shouldRenderGrowthDetails) {
      if (displayUnits.length === 'in') {
        growthStrings.height = `${inToCm(height).toFixed(2)} in`;
        growthStrings.head = `${inToCm(head).toFixed(2)} in`;
      } else {
        growthStrings.height = `${height.toFixed(1)} cm`;
        growthStrings.head = `${head.toFixed(1)} cm`;
      }

      if (displayUnits.weight === 'lb') growthStrings.weight = `${lbToKg(weight).toFixed(2)} lb`;
      else growthStrings.weight = `${weight.toFixed(1)} kg`;
    }

    let typeString = '';
    if (shouldRenderTypeDetails) {
      if (name === 'babyfood') typeString = type;
      else typeString = translate(type);
    }

    return (
      <Log id={id} className="log">
        <Log.IconContainer name={name}>
          <Icon name={name} />
        </Log.IconContainer>

        <Log.Content onClick={() => onLogClick(id)}>
          <Log.Content.Title>{translate(name)}</Log.Content.Title>
          <Log.Content.Info>
            {shouldRenderDuration ? totalTimeString : ''}
            {shouldRenderAmount ? amountString : ''}
            {shouldRenderType ? translate(type) : '' }
          </Log.Content.Info>
          <Log.Content.Time>
            {moment(time_start).format(translate('timeFormat'))}
          </Log.Content.Time>
        </Log.Content>

        <Log.ButtonGroup>
          <Log.Button onClick={this.openMenu}>
            <MuiIcon color="inherit">more_vert</MuiIcon>
          </Log.Button>
        </Log.ButtonGroup>

        <Log.Details onClick={() => onLogClick(id)}>
          {shouldRenderTypeDetails && <LogDetails value={typeString}/>}
          {shouldRenderDurationDetails && (
            <LogDetails
              label={`${translate('durationLabel')}`}
              value={totalTimeString}
            />
          )}
          {shouldRenderSideDurationDetails && (
            ['left', 'right'].map(side => {
              if (!activity[`duration_${side}`]) return undefined;
              
              return (
                <LogDetails
                  key={side}
                  label={`${translate(side)}`}
                  value={side === 'left' ? leftTimeString : rightTimeString}
                />
              )
            })
          )}
          {shouldRenderAmount && (
            <LogDetails
              label={translate('amount')}
              value={amountString}
            />
          )}
          {shouldRenderGrowthDetails && (
            Object.keys(growthStrings).map(key => {
              if (!activity[key]) return undefined;

              return (
                <LogDetails
                  key={key}
                  label={translate(key)}
                  value={growthStrings[key]}
                />
              )
            })
          )}
          {memo && (<LogDetails label={translate('memo')} value={memo} />)}
        </Log.Details>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => { this.handleMenuClose(false) }}
        >
          <MenuItem onClick={() => { this.handleMenuClose('edit') }}>
            <MuiIcon className="log__menu__icon">edit</MuiIcon>
          </MenuItem>
          <MenuItem onClick={() => { this.handleMenuClose('delete') }}>
            <MuiIcon className="log__menu__icon">delete</MuiIcon>
          </MenuItem>
        </Menu>

      </Log>
    );
  }
}

export default withTranslate(LogContainer);