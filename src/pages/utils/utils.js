import React, {Component} from 'react';
import {MONTHSNAMESHORT} from '../constants/constants';

export function renderOptions(type) {
  const options = [];
  if (type === 'day') {
    options.push(<option>Day</option>);
    for(let i = 1; i < 32 ; i++) {
      options.push(<option key={'day_' + i} value={i}>{i}</option>);
    }
  } else if (type === 'month') {
    options.push(<option>Month</option>);
    for(let i = 0; i < 12 ; i++) {
      options.push(<option key={'month_' + i} value={i}>{MONTHSNAMESHORT[i]}</option>);
    }
  } else if (type === 'year') {
    options.push(<option>Year</option>);
    for(let i = 2020; i > 2000 ; i--) {
      options.push(<option key={'year_' + i}  value={i}>{i}</option>);
    }
  } else if (type === 'week') {
    options.push(<option>Week</option>);
    for(let i = 1; i < 6 ; i++) {
      options.push(<option key={'week_' + i} value={i}>{i}</option>);
    }
  }
  return options;
}

export function formatDate(d) {
  let date;
  if (typeof(d) !== 'object') {
    date = new Date(d);
  } else {
    date = d;
  }
  let result = '';
  result += date.getDate() + ' ' +  MONTHSNAMESHORT[date.getMonth()] + ' ' + date.getFullYear();
  return result;
}

export function amountOnGraph(val) {
  if (val === '') {
    return '';
  } else {
    const value = parseFloat(val, 10);
    if (val > 1000) {
      return Math.round(parseFloat(val/1000, 10) * 10) / 10 + 'K';
    } else {
      return val;
    }
  }
}

export function setLoader(val) {
  if (typeof(window) !== 'undefined') {
    window.loader = val;
  }
}

export class Ripple extends Component {
  constructor(props) {
    super(props);
  }

  callCleanUp(cleanup, delay) {
      var bounce;
      return function() {
        const target = arguments[0].currentTarget;
        clearTimeout(bounce);
        bounce = setTimeout(function() {
          cleanup(target);
        }, delay);
      }
  }

  showRipple(e) {
    const rippleContainer = e.currentTarget;
    const size = rippleContainer.offsetWidth;
    const pos = rippleContainer.getBoundingClientRect();
    const x = e.pageX - pos.x - (size / 2);
    const y = e.pageY - pos.y - (size / 2);
    const style = 'top:' + y + 'px; left: ' + x + 'px; height: ' + size + 'px; width: ' + size + 'px;';
    const rippler = document.createElement('span');
    rippleContainer.appendChild(rippler);
    return rippler.setAttribute('style', style);
  }

  cleanUp(elt) {
    while (elt.firstChild) {
      elt.removeChild(elt.firstChild);
    }
  }

  render() {
    const {children= null, classes = "", onClickHandler = null} = this.props;
    return (
      <div ref="targetElement" className={classes} onClick={onClickHandler} ripple="ripple">
        {children}
        <div className="ripple--container" onMouseDown={this.showRipple} onMouseUp={this.callCleanUp(this.cleanUp, 2000)}></div>
      </div>
    );
  }
}
