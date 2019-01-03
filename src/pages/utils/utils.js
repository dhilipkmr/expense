import React from 'react';
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