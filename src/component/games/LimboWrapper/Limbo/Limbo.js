import React, { useState, useEffect } from "react";
import "./Limbo.css";
import { useSelector, useDispatch } from "react-redux";

const Limbo = () => {
  const betActive = useSelector((state) => state.betActive);
  const dispatch = useDispatch();

  const [randomNum, setRandomNum] = useState(null);
  const [displayedNum, setDisplayedNum] = useState(1.0);
  const [targetMultiplier, setTargetMultiplier] = useState("2.00");
  const [betWin, setBetWin] = useState(false);

  const generateRandomNumber = () => {
    setDisplayedNum(1.0);

    let rangeSelector = Math.random();

    // Define ranges and their corresponding probabilities
    const ranges = [
      { range: [1.0, 1.99], probability: 90.0 },
      { range: [2.0, 100], probability: 10.0 },
    ];

    let selectedRange;
    for (const range of ranges) {
      if (rangeSelector < range.probability / 100) {
        selectedRange = range;
        break;
      }
      rangeSelector -= range.probability / 100;
    }

    let newRandomNum;
    if (selectedRange.range[0] === 1.0 && selectedRange.range[1] === 1.99) {
      newRandomNum = Math.floor(Math.random() * 100) / 100 + 1;
    } else {
      newRandomNum =
        Math.random() * (selectedRange.range[1] - selectedRange.range[0]) +
        selectedRange.range[0];
    }

    newRandomNum = parseFloat(newRandomNum.toFixed(2));

    setRandomNum(newRandomNum);
    // dispatch({ type: "SET_BET_ACTIVE", payload: false }); // Set betActive to false
  };

  useEffect(() => {
    if (betActive) {
      generateRandomNumber();
    }
  }, [betActive, displayedNum, randomNum]);

  useEffect(() => {
    if (randomNum !== null) {
      const animationDuration = 500; // 1.5 seconds in milliseconds
      const framesPerSecond = 60; // Assuming 60 frames per second
      const numberOfFrames = animationDuration / (1000 / framesPerSecond);

      const incrementInterval = setInterval(() => {
        setDisplayedNum((prevNum) => {
          const step = (randomNum - prevNum) / numberOfFrames;
          const newNum = prevNum + step;
          if (Math.abs(newNum - randomNum) < Math.abs(step)) {
            clearInterval(incrementInterval);
            return randomNum;
          } else {
            return newNum;
          }
        });
      }, animationDuration / numberOfFrames);

      return () => clearInterval(incrementInterval);
    }
  }, [randomNum]);

  useEffect(() => {
    const tolerance = 0.0001; // Define a small tolerance

    if (Math.abs(displayedNum - randomNum) < tolerance) {
      dispatch({ type: "SET_BET_ACTIVE", payload: false });
    }
  }, [displayedNum, randomNum, dispatch]);

  const handleTargetMultiplierChange = (e) => {
    setTargetMultiplier(e.target.value);
  };

  useEffect(() => {
    if (displayedNum !== null && randomNum !== null) {
      if (displayedNum - randomNum > 0.0001) {
        setBetWin(true);
      } else {
        setBetWin(false);
      }

      if (displayedNum > parseFloat(targetMultiplier)) {
        setBetWin(true);
      } else {
        setBetWin(false);
      }
    }
  }, [displayedNum, randomNum, targetMultiplier]);

  return (
    <div className="limbo">
      <div className="parent-target-multiplier-numb">
        <h1
          className={
            betWin
              ? "limbo-number-header limbo-number-green"
              : "limbo-number-header"
          }
        >
          {displayedNum.toFixed(2)}x
        </h1>
      </div>

      <div className="parent-target-multiplier">
        <div className="target-multiplier">
          <h4 className="target-multiplier-header">Target Multiplier</h4>
          <input
            type="number"
            className="target-multiplier-input"
            step="0.01"
            min="2.00"
            max="100"
            onChange={handleTargetMultiplierChange}
            value={targetMultiplier}
          />
        </div>
      </div>
    </div>
  );
};

export default Limbo;
