import React, { useState, useEffect } from "react";
import "./Limbo.css";
import { useSelector, useDispatch } from "react-redux";

const Limbo = () => {
  const betActive = useSelector((state) => state.betActive);
  const wallet = useSelector((state) => state.viewWallet);
  const dispatch = useDispatch();

  const [randomNum, setRandomNum] = useState(null);
  const [displayedNum, setDisplayedNum] = useState(1.0);

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
    dispatch({ type: "SET_BET_ACTIVE", payload: false }); // Set betActive to false
  };

  useEffect(() => {
    if (betActive) {
      generateRandomNumber();
    }
  }, [betActive]);

  useEffect(() => {
    if (randomNum !== null) {
      const incrementInterval = setInterval(() => {
        setDisplayedNum((prevNum) => {
          const step = 0.01;
          const diff = randomNum - prevNum;
          if (diff <= step) {
            clearInterval(incrementInterval);
            return randomNum;
          } else {
            return prevNum + step;
          }
        });
      }, 10);

      return () => clearInterval(incrementInterval);
    }
  }, [randomNum]);

  return (
    <div className="limbo">
      <div className="parent-target-multiplier-numb">
        <h1 className="limbo-number-header">{displayedNum.toFixed(2)}x</h1>
      </div>

      {/* <button onClick={generateRandomNumber}>Generate Random Number</button> */}
      <div className="parent-target-multiplier">
        <div className="target-multiplier">
          <h4 className="target-multiplier-header">Target Multiplier</h4>
          <input
            type="number"
            className="target-multiplier-input"
            title="Please enter a number with decimals"
            step="0.01"
            min="2.00"
            max="100"
            defaultValue="1.01"
          />
        </div>
      </div>
    </div>
  );
};

export default Limbo;
