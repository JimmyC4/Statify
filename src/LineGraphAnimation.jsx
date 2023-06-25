import React, { useState, useEffect } from 'react';
import './LineGraphAnimation.css';

const NUM_DOTS = 13;
const DOT_SIZE = 15;

const LineGraphAnimation = ({ minViewHeight = 0, maxViewHeight = window.innerHeight }) => {
  const [dotPositions, setDotPositions] = useState([]);

  useEffect(() => {
    // Function to randomly update dot positions
    const updateDotPositions = () => {
      const newDotPositions = Array.from({ length: NUM_DOTS }, (_, index) => ({
        x: (index + 1) * (window.innerWidth / (NUM_DOTS + 1)),
        y: Math.random() * (maxViewHeight - minViewHeight) + minViewHeight,
      }));

      newDotPositions.sort((a, b) => a.x - b.x); // Sort dots by x coordinate

      // Add a transition delay to each dot for the easing effect
      const dotDelay = 100;
      newDotPositions.forEach((dot, index) => {
        const delay = index * dotDelay;
        dot.transition = `cy 0.5s ease ${delay}ms`;
      });

      setDotPositions(newDotPositions);
    };

    // Initial dot positions
    updateDotPositions();

    // Update dot positions every 1 second
    const interval = setInterval(updateDotPositions, 2500);

    // Cleanup function
    return () => {
      clearInterval(interval);
    };
  }, [minViewHeight, maxViewHeight]);

  return (
    <svg className="dots-animation">
      {dotPositions.map((dot, index) => (
        <circle
          key={index}
          cx={dot.x}
          cy={dot.y}
          r={DOT_SIZE / 2}
          className="dot"
          style={{ transition: dot.transition }}
        />
      ))}
      <g className="lines">
        {dotPositions.map((dot, index) => {
          const nextDot = dotPositions[index + 1];
          if (nextDot) {
            return (
              <line
                key={index}
                x1={dot.x}
                y1={dot.y}
                x2={nextDot.x}
                y2={nextDot.y}
                className="line"
                style={{ strokeLinecap: "round" }} // Set round line ends
              />
            );
          }
          return null;
        })}
      </g>
    </svg>
  );
};

export default LineGraphAnimation;
