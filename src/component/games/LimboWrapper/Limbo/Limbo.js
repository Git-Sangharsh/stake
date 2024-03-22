import React, { useEffect, useState } from "react";
import "./Limbo.css";
import { useSelector, useDispatch } from "react-redux";

const Limbo = () => {
  const betActive = useSelector((state) => state.betActive);
  const betAmount = useSelector((state) => state.betAmount);
  const walletBalance = useSelector((state) => state.walletBalance);
  const dispatch = useDispatch();

  const [displayedNum, setDisplayedNum] = useState(1.0);
  const [targetMultiplier, setTargetMultiplier] = useState(2);
  const [betWin, setBetWin] = useState(false);
  const [endNumbers, setEndNumbers] = useState([]);

  const ranges = [
    { range: [1.0, 1.99], probability: 90.0 },
    { range: [2.0, 100], probability: 10.0 },
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
      if (step >= steps || startNumber >= endNumber) {
        clearInterval(animationInterval);
        dispatch({ type: "SET_BET_ACTIVE", payload: false });
        if (parseFloat(targetMultiplier) < parseFloat(startNumber)) {
          dispatch({
            type: "SET_PROFIT_FROM_LIMBO",
            payload: betAmount * targetMultiplier,
          });
          setBetWin(true);
        } else {
          setBetWin(false);
        }
        updateEndNumbers(endNumber);
      }
    }, increment);
  };

  const updateEndNumbers = (endNumber) => {
    setEndNumbers((prevEndNumbers) => {
      if (prevEndNumbers.length === 4) {
        prevEndNumbers.shift();
      }
      return [...prevEndNumbers, Number(endNumber.toFixed(2))];
    });
  };

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

      <h3 className="prev-result-map">
        {endNumbers.map((number, index) => (
          <h3 key={index} className="prev-result-limbo">
            {number}
          </h3>
        ))}
      </h3>
      {console.log("endNumbers:", endNumbers)}
    </div>
  );
};

export default Limbo;
