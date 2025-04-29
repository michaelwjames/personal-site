import React from 'react';

const CalculatorDisplay = ({ input, result }) => (
  <div className="calc-display-container">
    <div className="calc-display">{input || '0'}</div>
    <div className="calc-result">{result !== '' ? '= ' + result : ''}</div>
  </div>
);

export default CalculatorDisplay;
