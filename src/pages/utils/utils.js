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

export class Ripple extends Component {
  constructor(props) {
    super(props);
  }

  debounce(func, delay) {
    var inDebounce;
    inDebounce = undefined;
    return function() {
      var args, context;
      context = this;
      args = arguments;
      clearTimeout(inDebounce);
      return inDebounce = setTimeout(function() {
        return func.apply(context, args);
      }, delay);
    };
  }

  showRipple(e) {
    var pos, ripple, rippler, size, style, x, y;
    ripple = this;
    rippler = document.createElement('span');
    size = ripple.offsetWidth;
    pos = ripple.getBoundingClientRect();
    x = e.pageX - pos.left - (size / 2);
    y = e.pageY - pos.top - (size / 2);
    style = 'top:' + y + 'px; left: ' + x + 'px; height: ' + size + 'px; width: ' + size + 'px;';
    ripple.rippleContainer.appendChild(rippler);
    return rippler.setAttribute('style', style);
  }

  cleanUp() {
    while (this.rippleContainer.firstChild) {
      this.rippleContainer.removeChild(this.rippleContainer.firstChild);
    }
  }

  componentDidMount() {
    const ripple = this.refs.targetElement;
    const rippleContainer = document.createElement('div');
    rippleContainer.className = 'ripple--container';
    ripple.addEventListener('mousedown', this.showRipple);
    ripple.addEventListener('mouseup', this.debounce(this.cleanUp, 2000));
    ripple.rippleContainer = rippleContainer;
    ripple.appendChild(rippleContainer);
  }

  render() {
    const {classes = "", onClickHandler = null} = this.props;
    return (
      <div ref="targetElement" className={classes} onClick={onClickHandler} ripple="ripple">
        {this.props.children ? this.props.children: null}
      </div>
    );
  }
}
