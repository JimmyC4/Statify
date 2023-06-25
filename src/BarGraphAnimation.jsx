import React, { useEffect, useState } from 'react';

const BarGraphAnimation = ({ barWidth, barHeight, waveSpeed, numBars, peakHeight }) => {
  const [barHeights, setBarHeights] = useState([]);
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationProgress((prevProgress) => (prevProgress + waveSpeed) % 360);
    }, 20);

    return () => {
      clearInterval(interval);
    };
  }, [waveSpeed]);

  useEffect(() => {
    const newHeights = Array.from({ length: numBars }, (_, index) => {
      const angle = (index / numBars) * Math.PI * 2;
      const height =
        Math.sin((angle + animationProgress) * (Math.PI / (barWidth / 2))) *
          (barHeight / 2 - peakHeight) +
        (barHeight / 2) +
        peakHeight * Math.sin((angle + animationProgress) * (Math.PI / (barWidth / 4))) +
        peakHeight / 2 * Math.sin((angle + animationProgress) * (Math.PI / (barWidth / 6)));
      return Math.floor(height);
    });
    setBarHeights(newHeights);
  }, [animationProgress, barWidth, barHeight, numBars, peakHeight]);

  return (
    <svg width={(barWidth + 10) * numBars} height={barHeight + 50}>
      {barHeights.map((height, index) => (
        <rect
          key={index}
          x={index * (barWidth + 10) + 20}
          y={barHeight + 25 - height}
          width={barWidth}
          height={height}
          fill="#81F9A3"
        />
      ))}
    </svg>
  );
};

export default BarGraphAnimation;
