import React from 'react';

const wrapper = {
  'position': 'relative'
};
const icon =  {
  'color': '#fff',
  'backgroundColor': '#0757d0',
  'borderRadius': '100%',
  'width': '60px',
  'height': '60px',
  'textAlign': 'center',
  'margin': '45vh auto',
  'zIndex': '7',
  'position': 'relative',
};
const val = {
  'padding': '24px'
};

const rippler =  {
  'position': 'absolute',
  'border': '0.01px solid #0757d0',
  'top': '50%',
  'left': '50%',
  'width': '0px',
  'height': '0px',
  'backgroundColor': '#0757d0',
  'borderRadius': '50%',
  'animation': 'rippleLoader 1.5s ease infinite',
  'transform': 'translate(-50%, -50%)'
}

function PageLoader() {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = `@keyframes rippleLoader{
    100% {
      opacity: 0;
      width: 400px;
      height: 400px;
    }
  }`;
  document.head.appendChild(styleElement);
  return (
    <div>
      <div style={{...wrapper}}>
        <div style={{...icon}}>
          <div style={{...val}}>
              <svg x="0px" y="0px" width="13px" height="13px" viewBox="0 0 401.998 401.998" style={{"enableBackground" :"new 0 0 401.998 401.998", "xml:space": "preserve"}}>
                <g>
                  <g>
                  <path d="M326.62,91.076c-1.711-1.713-3.901-2.568-6.563-2.568h-48.82c-3.238-15.793-9.329-29.502-18.274-41.112h66.52   c2.669,0,4.853-0.856,6.57-2.565c1.704-1.712,2.56-3.903,2.56-6.567V9.136c0-2.666-0.855-4.853-2.56-6.567   C324.334,0.859,322.15,0,319.481,0H81.941c-2.666,0-4.853,0.859-6.567,2.568c-1.709,1.714-2.568,3.901-2.568,6.567v37.972   c0,2.474,0.904,4.615,2.712,6.423s3.949,2.712,6.423,2.712h41.399c40.159,0,65.665,10.751,76.513,32.261H81.941   c-2.666,0-4.856,0.855-6.567,2.568c-1.709,1.715-2.568,3.901-2.568,6.567v29.124c0,2.664,0.855,4.854,2.568,6.563   c1.714,1.715,3.905,2.568,6.567,2.568h121.915c-4.188,15.612-13.944,27.506-29.268,35.691   c-15.325,8.186-35.544,12.279-60.67,12.279H81.941c-2.474,0-4.615,0.905-6.423,2.712c-1.809,1.809-2.712,3.951-2.712,6.423v36.263   c0,2.478,0.855,4.571,2.568,6.282c36.543,38.828,83.939,93.165,142.182,163.025c1.715,2.286,4.093,3.426,7.139,3.426h55.672   c4.001,0,6.763-1.708,8.281-5.141c1.903-3.426,1.53-6.662-1.143-9.708c-55.572-68.143-99.258-119.153-131.045-153.032   c32.358-3.806,58.625-14.277,78.802-31.404c20.174-17.129,32.449-39.403,36.83-66.811h47.965c2.662,0,4.853-0.854,6.563-2.568   c1.715-1.709,2.573-3.899,2.573-6.563V97.646C329.193,94.977,328.335,92.79,326.62,91.076z" data-original="#000000" data-old_color="#F7F4F4" fill="#fff"/>
                  </g>
                </g>
              </svg>
          </div>
        </div>
        <span style={{...rippler}}></span>
      </div>
    </div>
  );
}

export default PageLoader;
