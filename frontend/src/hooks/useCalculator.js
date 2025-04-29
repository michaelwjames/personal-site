import { useState, useEffect, useCallback } from 'react';

export default function useCalculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleClick = useCallback((value) => {
    setInput((prev) => prev + value);
  }, []);

  const handleClear = useCallback(() => {
    setInput('');
    setResult('');
  }, []);

  const handleEquals = useCallback(() => {
    try {
      // eslint-disable-next-line no-eval
      const evalResult = eval(input);
      setResult(evalResult);
    } catch {
      setResult('Error');
    }
  }, [input]);

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
  }, [handleClick, handleClear, handleEquals]);

  return {
    input,
    result,
    handleClick,
    handleClear,
    handleEquals,
  };
}
