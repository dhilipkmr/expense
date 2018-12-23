
const WIDTH = 150;
const HEIGHT = 100;

import React, {Component} from 'react';
import {DIVISIONLENGTH} from '../constants/constants';

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

  generateSVG() {
    const {plotData, tab} = this.props;
    const xCoordinates = [];
    const yCoordinates = [];
    const length = DIVISIONLENGTH[tab];
    const maxAmt = plotData.maxAmount;
    const xCoordinateDivLength = (WIDTH / (length + 2));
    let lastDivision = 0;
    let str = '';

    /* To start the graph at the Least Point */
    xCoordinates.push(0);
    yCoordinates.push(HEIGHT);
    plotData.perDivisionData.forEach((entry) => {
      while (entry.division > lastDivision) {
        const lastX = xCoordinates[xCoordinates.length - 1];
        xCoordinates.push((lastX + xCoordinateDivLength));
        if (entry.division === lastDivision + 1) {
          const percent = ((entry.amount / maxAmt) * 100);
          yCoordinates.push(HEIGHT - ((HEIGHT / 100) * percent));
        } else {
          yCoordinates.push(HEIGHT);
        }
        lastDivision = lastDivision + 1;
      }
    });
    // to push values for remaining days
    while(length > lastDivision) {
      const lastX = xCoordinates[xCoordinates.length - 1];
      xCoordinates.push((lastX + xCoordinateDivLength));
      yCoordinates.push(HEIGHT);
      lastDivision = lastDivision + 1;
    }
    const lastX = xCoordinates[xCoordinates.length - 1];
    xCoordinates.push((lastX + xCoordinateDivLength));
    yCoordinates.push(HEIGHT);
 
    for (let i = 0; i < xCoordinates.length; i++) {
      str += ' ' + xCoordinates[i] + ',' + yCoordinates[i] + ' ';
    }
    if (str) {
      return (
        <div>
          <svg viewBox={'0 0 ' + WIDTH + ' ' + HEIGHT} style={{margin: '20px'}}>
            <polyline points={str} className="graphPlotLine" />
            {/* <g style={{stroke: '#ccc', strokeDasharray: 0, strokeWidth: 1}}>
              <line x1="0" y1="200" x2="0" y2="0"></line>
            </g> */}
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