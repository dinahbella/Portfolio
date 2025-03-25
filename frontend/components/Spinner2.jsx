import React from "react";

export default function Spinner2() {
  return (
    <>
      {/* Add styles dynamically */}
      <style>
        {`
          .custom-loader {
            --d: 44px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            color: #766DF4;
            box-shadow: 
              calc(1 * var(--d)) calc(0 * var(--d)) 0 0,
              calc(0.707 * var(--d)) calc(0.707 * var(--d)) 0 2px,
              calc(0 * var(--d)) calc(1 * var(--d)) 0 4px,
              calc(-0.707 * var(--d)) calc(0.707 * var(--d)) 0 6px,
              calc(-1 * var(--d)) calc(0 * var(--d)) 0 8px,
              calc(-0.707 * var(--d)) calc(-0.707 * var(--d)) 0 10px,
              calc(0 * var(--d)) calc(-1 * var(--d)) 0 12px;
            animation: spin-animation 2s infinite steps(8);
          }

          @keyframes spin-animation {
            100% {
              transform: rotate(1turn);
            }
          }
        `}
      </style>
      <div className="custom-loader"></div>
    </>
  );
}
