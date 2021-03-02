import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [count, setCount] = useState(0);
  const [error, setError] = useState(false);
  return (
    <div data-test='component-app'>
      <h1 data-test='counter-display'>
        The counter&nbsp;
        <span data-test='count'>{count}</span>
      </h1>

      <div data-test='error-message' className={error ? 'show' : 'hidden'}>
        the counter can't go below zero
      </div>

      <button
        data-test='increment-button'
        onClick={() => {
          if (error) setError(false);

          setCount(count + 1);
        }}
      >
        Increment counter
      </button>
      <button
        data-test='decrement-button'
        onClick={() => {
          if (count > 0) {
            setCount(count - 1);
          } else {
            setError(true);
          }
        }}
      >
        Decrement counter
      </button>
    </div>
  );
};

export default App;
