import React, { useState } from "react";
import "./Crash.css";
import { LineChart } from "@mui/x-charts";

const Crash = () => {
  const [randomNumber, setRandomNumber] = useState(null);
  const [displayedNumber, setDisplayedNumber] = useState(1);
  const [chartData, setChartData] = useState([]);

  const ranges = [
    { range: [1.0, 1.99], probability: 20.0 },
    { range: [2.0, 99.99], probability: 80.0 },
    // { range: [100.0, 150.0], probability: 2.0 },
  ];

  const generateRandomNumber = () => {
    setChartData([]);

    const rand = Math.random() * 100;
    let sum = 0;
    for (const range of ranges) {
      sum += range.probability;
      if (rand < sum) {
        const newRandomNumber =
          Math.random() * (range.range[1] - range.range[0]) + range.range[0];
        setRandomNumber(newRandomNumber);
        animateRandomNumber(newRandomNumber);
        break;
      }
    }
  };

  const animateRandomNumber = (endNumber) => {
    const animationDuration = 2000; // in milliseconds
    const animationInterval = setInterval(() => {
      setDisplayedNumber((displayedNumber) => {
        const newValue = displayedNumber + 1;
        if (newValue > endNumber) {
          clearInterval(animationInterval);
          return endNumber;
        }
        updateChartData(newValue, endNumber);
        return newValue;
      });
    }, animationDuration / (endNumber - 0)); // Adjust speed based on endNumber
  };

  const updateChartData = (newValue, endNumber) => {
    const newData = [];
    const increment = endNumber / 60; // Number of steps
    for (let i = 0; i <= newValue; i++) {
      // Generate quadratic curve data
      newData.push(Math.pow(i * increment, 2) * 0.01);
    }
    setChartData(newData);
  };

  return (
    <div className="crash">
      <h1 className="hello">Hello World</h1>
      <LineChart
        width={1000}
        height={500}
        series={[
          {
            data: chartData,
            area: true,
            showMark: false
          }
        ]}
        className="area-chart  "
        sx={{
          ".MuiLineElement-root": {
            stroke: "#FFFFFF",
            strokeWidth: 10
          },
          ".MuiAreaElement-root": {
            fill: "#FF9D00"
          }
        }}
      />
      <button onClick={generateRandomNumber}>Generate Random Number</button>
      {displayedNumber !== null && (
        <p>Random Number: {displayedNumber}</p>
      )}
    </div>
  );
};

export default Crash;
