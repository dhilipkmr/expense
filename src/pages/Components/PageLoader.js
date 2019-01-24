import React from 'react';

const wrapper = {
  'position': 'relative'
};
const icon =  {
  'color': '#fff',
  'background-color': '#0757d0',
  'border-radius': '100%',
  'width': '35px',
  'height': '35px',
  'text-align': 'center',
  'margin': '50vh auto',
  'z-index': '7',
  'position': 'relative',
};
const val = {
  'padding': '7px'
};

const rippler =  {
  'position': 'absolute',
  'border': '0.01px solid #0757d0',
  'top': '50%',
  'left': '50%',
  'width': '1px',
  'height': '1px',
  'background-color': '#0757d0',
  'border-radius': '50%',
  'animation': 'rippleLoader 3s ease infinite'
}

function PageLoader() {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = `@keyframes rippleLoader{
    100% {
      transform: scale(700);
      opacity: 0;
    }
  }`;
  document.head.appendChild(styleElement);
  return (
    <div>
      <div style={{...wrapper}}>
        <div style={{...icon}}>
          <div style={{...val}}>E</div>
        </div>
        <span style={{...rippler}}></span>
      </div>
    </div>
  );
}

export default PageLoader;
