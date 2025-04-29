import React from 'react';

const CalculatorKeypad = ({ onClick, onClear, onEquals }) => {
  const buttonClass = 'calc-btn';
  const operatorClass = 'calc-operator';
  const equalsClass = 'calc-equals';
  const clearClass = 'calc-clear';
  const digitClass = 'calc-digit';

  return (
    <div className="calc-grid">
      {/* Row 1 */}
      <button className={`${buttonClass} ${digitClass}`} onClick={() => onClick('7')}>7</button>
      <button className={`${buttonClass} ${digitClass}`} onClick={() => onClick('8')}>8</button>
      <button className={`${buttonClass} ${digitClass}`} onClick={() => onClick('9')}>9</button>
      <button className={`${buttonClass} ${operatorClass}`} onClick={() => onClick('/')}>÷</button>
      {/* Row 2 */}
      <button className={`${buttonClass} ${digitClass}`} onClick={() => onClick('4')}>4</button>
      <button className={`${buttonClass} ${digitClass}`} onClick={() => onClick('5')}>5</button>
      <button className={`${buttonClass} ${digitClass}`} onClick={() => onClick('6')}>6</button>
      <button className={`${buttonClass} ${operatorClass}`} onClick={() => onClick('*')}>×</button>
      {/* Row 3 */}
      <button className={`${buttonClass} ${digitClass}`} onClick={() => onClick('1')}>1</button>
      <button className={`${buttonClass} ${digitClass}`} onClick={() => onClick('2')}>2</button>
      <button className={`${buttonClass} ${digitClass}`} onClick={() => onClick('3')}>3</button>
      <button className={`${buttonClass} ${operatorClass}`} onClick={() => onClick('-')}>−</button>
      {/* Row 4 */}
      <button className={`${buttonClass} ${digitClass}`} onClick={() => onClick('0')}>0</button>
      <button className={`${buttonClass} ${digitClass}`} onClick={() => onClick('.')}>.</button>
      <button className={`${buttonClass} ${clearClass}`} onClick={onClear}>C</button>
      <button className={`${buttonClass} ${operatorClass}`} onClick={() => onClick('+')}>+</button>
      {/* Row 5: Equals spans all 4 columns */}
      <button className={`${buttonClass} ${equalsClass}`} style={{ gridColumn: 'span 4' }} onClick={onEquals}>=</button>
    </div>
  );
};

export default CalculatorKeypad;
