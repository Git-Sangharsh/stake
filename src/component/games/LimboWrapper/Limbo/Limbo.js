import React, { useEffect, useState } from "react";
import "./Limbo.css";
import { useSelector, useDispatch } from "react-redux";

const Limbo = () => {
  const betActive = useSelector((state) => state.betActive);
  const betAmount = useSelector((state) => state.betAmount);
  const walletBalance = useSelector((state) => state.walletBalance);
  console.log("walletBalance", walletBalance);
  const dispatch = useDispatch();

  const [displayedNum, setDisplayedNum] = useState(1.0);
  const [targetMultiplier, setTargetMultiplier] = useState(2);
  const [betWin, setBetWin] = useState(false);

  const ranges = [
    { range: [1.0, 1.99], probability: 10.0 },
    { range: [2.0, 100], probability: 90.0 },
  ];

  const handleTargetMultiplierChange = (e) => {
    setTargetMultiplier(e.target.value);
  };

  useEffect(() => {
    if (betActive) {
      generateRandomNumber();
    }
  }, [betActive, dispatch]);

  const generateRandomNumber = () => {
    const randomNumber = Math.random() * 100;
    console.log("Generated Random Number:", randomNumber);

    let cumulativeProbability = 0;
    for (const range of ranges) {
      cumulativeProbability += range.probability;
      if (randomNumber < cumulativeProbability) {
        animateRandomNumber(getRandomInRange(range.range[0], range.range[1]));
        break;
      }
    }
  };
  const getRandomInRange = (min, max) => {
    return Math.random() * (max - min) + min;
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
      setDisplayedNum(startNumber.toFixed(2));
      // console.log("startNumber is ", startNumber);
      // console.log("endNumber is ", endNumber);
      if (step >= steps || startNumber >= endNumber) {
        clearInterval(animationInterval);
        dispatch({ type: "SET_BET_ACTIVE", payload: false });
        // Check if the targetMultiplier is less than startNumber
        if (parseFloat(targetMultiplier) < parseFloat(startNumber)) {
          // console.log("betAmount is ", betAmount);
          // console.log("target is ", targetMultiplier);
          // console.log("Final Profit is ", betAmount * targetMultiplier );
          dispatch({ type: "SET_PROFIT_FROM_LIMBO", payload: betAmount * targetMultiplier});
          setBetWin(true);
        } else {
          setBetWin(false);
        }
      }
    }, increment);
  };

  console.log("betActive is ", betActive);
  // console.log("betWin is ", betWin);

  return (
    <div className="limbo">
      <div className="parent-target-multiplier-numb">
        <h1 className={betWin ? "limbo-number-green" : "limbo-number-header  "}>
          {displayedNum}x
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
