import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput('');
    setResult('');
  };

  const handleEquals = () => {
    try {
      // eslint-disable-next-line no-eval
      const evalResult = eval(input);
      setResult(evalResult);
    } catch {
      setResult('Error');
    }
  };

  const buttonClass = 'calc-btn';
  const operatorClass = 'calc-operator';
  const equalsClass = 'calc-equals';
  const clearClass = 'calc-clear';
  const digitClass = 'calc-digit';

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;
      if ((key >= '0' && key <= '9') || key === '.') {
        handleClick(key);
      } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        handleClick(key);
      } else if (key === 'Enter' || key === '=') {
        handleEquals();
      } else if (key.toLowerCase() === 'c' || key === 'Delete' || key === 'Backspace') {
        handleClear();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [input]);

  return (
    <div className="calc-bg">
      <div className="calc-container">
        {/* Display */}
        <div className="calc-display-container">
          <div className="calc-display">{input || '0'}</div>
          <div className="calc-result">{result !== '' ? '= ' + result : ''}</div>
        </div>
        {/* 4x4 grid for buttons */}
        <div className="calc-grid">
          {/* Row 1 */}
          <button className={`${buttonClass} ${digitClass}`} onClick={() => handleClick('7')}>7</button>
          <button className={`${buttonClass} ${digitClass}`} onClick={() => handleClick('8')}>8</button>
          <button className={`${buttonClass} ${digitClass}`} onClick={() => handleClick('9')}>9</button>
          <button className={`${buttonClass} ${operatorClass}`} onClick={() => handleClick('/')}>÷</button>
          {/* Row 2 */}
          <button className={`${buttonClass} ${digitClass}`} onClick={() => handleClick('4')}>4</button>
          <button className={`${buttonClass} ${digitClass}`} onClick={() => handleClick('5')}>5</button>
          <button className={`${buttonClass} ${digitClass}`} onClick={() => handleClick('6')}>6</button>
          <button className={`${buttonClass} ${operatorClass}`} onClick={() => handleClick('*')}>×</button>
          {/* Row 3 */}
          <button className={`${buttonClass} ${digitClass}`} onClick={() => handleClick('1')}>1</button>
          <button className={`${buttonClass} ${digitClass}`} onClick={() => handleClick('2')}>2</button>
          <button className={`${buttonClass} ${digitClass}`} onClick={() => handleClick('3')}>3</button>
          <button className={`${buttonClass} ${operatorClass}`} onClick={() => handleClick('-')}>−</button>
          {/* Row 4 */}
          <button className={`${buttonClass} ${digitClass}`} onClick={() => handleClick('0')}>0</button>
          <button className={`${buttonClass} ${digitClass}`} onClick={() => handleClick('.')}>.</button>
          <button className={`${buttonClass} ${clearClass}`} onClick={handleClear}>C</button>
          <button className={`${buttonClass} ${operatorClass}`} onClick={() => handleClick('+')}>+</button>
          {/* Row 5: Equals spans all 4 columns */}
          <button
            className={`calc-btn calc-equals col-span-4`}
            onClick={handleEquals}
          >
            =
          </button>
        </div>
        {/* Save to Database button */}
        <button
          className="calc-btn calc-save"
          style={{ width: '100%', marginTop: '1rem', height: '2.8rem', fontWeight: 'bold', background: '#ffd600', color: '#18191c', fontSize: '1.1rem', borderRadius: '0.9rem' }}
          onClick={async () => {
            if (!result || result === 'Error') return;
            try {
              const response = await fetch('http://backend.test/api/sums', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ value: result.toString() })
              });
              if (!response.ok) throw new Error('Failed to save');
              alert('Saved to database!');
            } catch {
              alert('Error saving to database.');
            }
          }}
          disabled={!result || result === 'Error'}
        >
          Save to Database
        </button>
      </div>
    </div>
  );
}

export default App;
