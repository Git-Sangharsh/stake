import React, { useState } from "react";
import "./Crash.css";
import { LineChart } from "@mui/x-charts";

const Crash = () => {
  const uData = [0, 10, 20, 21, 80];
  const [randomNumber, setRandomNumber] = useState(null);
  const [displayedNumber, setDisplayedNumber] = useState(null);


const ranges = [
    { range: [1.0, 1.99], probability: 90.0 },
    { range: [2.0, 99.99], probability: 8.0 },
    { range: [100.0, 150.0], probability: 2.0 },
  ];

  const generateRandomNumber = () => {
    // Generate a random number based on probability ranges
    const rand = Math.random() * 100;
    let sum = 0;
    for (const range of ranges) {
      sum += range.probability;
      if (rand < sum) {
        setRandomNumber(
          Math.random() * (range.range[1] - range.range[0]) + range.range[0]
        );
        break;
      }
    }
  };

  const animateRandomNumber = (endNumber) => {
    let startNumber = 1.0;
    const increment = 0.01;
    const animationDuration = 500; // in milliseconds
    const steps = Math.ceil(animationDuration / increment);

    let step = 0;
    const animationInterval = setInterval(() => {
      step++;
      startNumber += increment;
      setDisplayedNumber(startNumber.toFixed(2));
      if (step >= steps || startNumber >= endNumber) {
        clearInterval(animationInterval);
        setDisplayedNumber(endNumber.toFixed(2));
      }
    }, increment);
  };

  return (
    <div className="crash">
      <h1 className="hello">Hello World</h1>
      <LineChart
        width={1000}
        height={300}
        series={[
          { data: uData, label: "uv", area: true, showMark: false }
        ]}
        className="area-chart"
        sx={{
          ".MuiLineElement-root": {
            stroke: "#FFFFFF",
            strokeWidth: 10,
          },
          ".MuiAreaElement-root": {
            fill: "#FF9D00", // Color for the area
          },
        }}
      />
      <button onClick={() => {
        generateRandomNumber();
        if(randomNumber !== null) animateRandomNumber(randomNumber);
      }}>Generate Random Number</button>
      {displayedNumber !== null && (
        <p>Random Number: {displayedNumber}</p>
      )}
    </div>
  );
};


export default Crash;
