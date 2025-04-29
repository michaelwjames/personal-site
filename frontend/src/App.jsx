import './App.css';
import CalculatorDisplay from './components/CalculatorDisplay';
import CalculatorKeypad from './components/CalculatorKeypad';
import useCalculator from './hooks/useCalculator';

function App() {
  const {
    input,
    result,
    handleClick,
    handleClear,
    handleEquals
  } = useCalculator();

  return (
    <div className="calc-bg">
      <div className="calc-container">
        {/* Display */}
        <CalculatorDisplay input={input} result={result} />
        {/* Keypad */}
        <CalculatorKeypad
          onClick={handleClick}
          onClear={handleClear}
          onEquals={handleEquals}
        />
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
