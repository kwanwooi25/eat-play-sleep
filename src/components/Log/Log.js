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
import { mlToOz, inToCm, lbToKg } from '../../helpers/unitChange';

const LogDetails = ({ title, value }) => {
  return (
    <div className="log__details__row">
      <div className="log__details__title">{title}</div>
      <div className="log__details__value">{value}</div>
    </div>
  )
}

class Log extends React.Component {
  state = {
    anchorEl: null,
    expandDetails: false,
  }

  openMenu = e => this.setState({ anchorEl: e.currentTarget });

  handleMenuClose = menuClicked => {
    this.setState({ anchorEl: null });
    this.props.onMenuClick(this.props.activity.id, menuClicked);
  }

  handleLogClick = id => {
    const logContainers = document.getElementsByClassName('log');
    const logContainer = document.getElementById(id);

    if (logContainer.classList.contains('expand')) {
      logContainer.classList.remove('expand');
    } else {
      for (let element of logContainers) element.classList.remove('expand');
      logContainer.classList.add('expand');
    }
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
    const { activity, translate, displayUnits } = this.props;
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
      <div className="log" id={id}>
        <div className={`log__icon ${name}`}>
          <SVGIcon className="log__title__icon" name={name} />
        </div>
        <div className="log__content" onClick={() => this.handleLogClick(id)}>
          <span className="log__content__title">
            {translate(name)}
          </span>
          <div className="log__content__info">
            {shouldRenderDuration ? totalTimeString : ''}
            {shouldRenderAmount ? amountString : ''}
            {shouldRenderType ? translate(type) : '' }
          </div>
          <span className="log__content__time">
            {moment(time_start).format(translate('timeFormat'))}
          </span>
        </div>
        <div className="log__details" onClick={() => this.handleLogClick(id)}>
          {shouldRenderTypeDetails && <LogDetails value={typeString}/>}
          {shouldRenderDurationDetails && (
            <LogDetails
              title={`${translate('durationLabel')}`}
              value={totalTimeString}
            />
          )}
          {shouldRenderSideDurationDetails && (
            ['left', 'right'].map(side => {
              if (!activity[`duration_${side}`]) return undefined;
              
              return (
                <LogDetails
                  key={side}
                  title={`${translate(side)}`}
                  value={side === 'left' ? leftTimeString : rightTimeString}
                />
              )
            })
          )}
          {shouldRenderAmount && (
            <LogDetails
              title={translate('amount')}
              value={amountString}
            />
          )}
          {shouldRenderGrowthDetails && (
            Object.keys(growthStrings).map(key => {
              if (!activity[key]) return undefined;

              return (
                <LogDetails
                  key={key}
                  title={translate(key)}
                  value={growthStrings[key]}
                />
              )
            })
          )}
          {memo && (<LogDetails title={translate('memo')} value={memo} />)}
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