
const WIDTH = 180;
const HEIGHT = 115;

import React, {Component} from 'react';
import {DIVISIONLENGTH, MAXLENGTHPERTAB, MONTHSNAMESHORT, MONTH, WEEK, YEAR, WEEKNAMESHORT} from '../constants/constants';
import {amountOnGraph} from '../utils/utils';

export default class Graph extends Component {
  constructor(props) {
    super(props);
    this.generateSVG = this.generateSVG.bind(this);
  }

  componentDidMount() {
    if (window && window.addEventListener) {
      window.addEventListener('onresize', function() {
        alert('attachEvent - resize');
      });
    }
  }

  renderPoints(xCoordinates, yCoordinates, amountOnCoordinates) {
    const pointsElement = [];
    const tab = this.props.tab;
    let textIndex = 0;
    for(let index = 1; index < xCoordinates.length - 1; index++) {
      let pointText = '';
      if (tab === WEEK) {
        pointText = WEEKNAMESHORT[textIndex++].toUpperCase();
      } else if (tab === YEAR) {
        pointText = MONTHSNAMESHORT[textIndex++].toUpperCase();
      } else if (tab === MONTH ) {
        if (index % 2 !== 0) {
          continue;
        }
        pointText = index;
      }
      pointsElement.push(
        <g key={'group_' + index}>
          <a>
          <text className="fb" x={xCoordinates[index]} fill="#757575" y={yCoordinates[index] - 5} fontSize="5" textAnchor="middle">{amountOnGraph(amountOnCoordinates[index])}</text>
          <circle cx={xCoordinates[index]} cy={yCoordinates[index]} stroke="#0757d0" fill="#0757d0" r="0.5" strokeWidth="1"></circle>
          <text className="fb" x={xCoordinates[index]} fill="#757575" y={HEIGHT + 7} fontSize="5" textAnchor="middle">{pointText}</text>
          </a>
        </g>
      );
    }
    return pointsElement;
  }

  generateSVG() {
    const {plotData, tab} = this.props;
    const xCoordinates = [];
    const yCoordinates = [];
    const amountOnCoordinates = [];
    const length = DIVISIONLENGTH[tab];
    const maxLeng = MAXLENGTHPERTAB[tab];
    const maxAmt = plotData.maxAmount;
    const xCoordinateDivLength = (WIDTH / length);
    let lastDivision = tab === MONTH ? 0 : -1; // Because we show only dates in month division begins with 1 so last shud be 0 

    let str = '';

    /* To start the graph at the Least Point */
    xCoordinates.push(0);
    yCoordinates.push(HEIGHT);
    amountOnCoordinates.push('');
    plotData.perDivisionData.forEach((entry) => {
      while (entry.division > lastDivision) {
        const lastX = xCoordinates[xCoordinates.length - 1];
        xCoordinates.push((lastX + xCoordinateDivLength));
        if (entry.division === lastDivision + 1) {
          const percent = ((entry.amount / maxAmt) * 100);
          yCoordinates.push(HEIGHT - ((HEIGHT / 100) * percent));
          amountOnCoordinates.push(entry.amount);
        } else {
          yCoordinates.push(HEIGHT);
          amountOnCoordinates.push('');
        }
        lastDivision++;
      }
    });
    // to push values for remaining days
    while(maxLeng > lastDivision) {
      const lastX = xCoordinates[xCoordinates.length - 1];
      xCoordinates.push((lastX + xCoordinateDivLength));
      yCoordinates.push(HEIGHT);
      lastDivision++;
      amountOnCoordinates.push('');
    }
    const lastX = xCoordinates[xCoordinates.length - 1];
    xCoordinates.push((lastX + xCoordinateDivLength));
    yCoordinates.push(HEIGHT);
    amountOnCoordinates.push('');
 
    for (let i = 0; i < xCoordinates.length; i++) {
      str += ' ' + xCoordinates[i] + ',' + yCoordinates[i] + ' ';
    }
    if (str) {
      return (
        <div>
          {/* <svg viewBox={'-5 -10 ' + (WIDTH + 35) + ' ' + (HEIGHT + 15)} style={{margin: '10px'}}> */}
          <svg viewBox={(window && window.screen.width > 600 ? '-50 -10 285 210' : ('-15 -15 220 150'))} style={{margin: '10px'}}>
            <polyline points={str} className="graphPlotLine" />
            {this.renderPoints(xCoordinates, yCoordinates, amountOnCoordinates)}
          </svg>
        </div>
      );
    }
    return null;
  }

  render() {
    return(
      <div>
        {this.generateSVG()}
      </div>
    );
  }
}