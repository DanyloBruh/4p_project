/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import './Counter.scss';

function Counter() {
  return (
    <div className="counter">
      <button type="button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="20"
          viewBox="0 0 21 20"
          fill="none"
        >
          <path
            d="M4 10H16"
            stroke="#adaeaf"
            strokeWidth="2"
            strokeLinecap="square"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <p>1</p>
      <button type="button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
        >
          <path
            d="M3 10.5H18M10.5 3V18"
            stroke="#adaeaf"
            strokeWidth="2"
            strokeLinecap="square"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

export default Counter;
