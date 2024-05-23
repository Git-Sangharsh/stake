import React, { useState, useEffect } from "react";
import "./Dice.css";
import diceAudio from "../../../audio/diceAudio.mp3";
import hexagon from "../../../assets/hexagon.svg";
import { motion } from "framer-motion";
import diceBetWinEffect from "../../../audio/dicegamewin.mp3";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import { useDispatch, useSelector } from "react-redux";

const Dice = () => {
  const dispatch = useDispatch();

  const diceBetActive = useSelector((state) => state.diceBetActive);
  const reduxBetAmount = useSelector((state) => state.betAmount);
  // const diceEstimatedProfit = useSelector((state) => state.diceEstimatedProfit);
  // const walletBalance = useSelector((state) => state.walletBalance);
  const [value, setValue] = useState(50);
  const [diceNumber, setDiceNumber] = useState("0.00");
  const [dicePixelPosition, setDicePixelPosition] = useState(0); // Define dicePixelPosition state
  const [rollOver, setRollOver] = useState(false);
  const [showDiceClr, setShowDiceClr] = useState("");
  const [betInProgress, setBetInProgress] = useState(false);
  const [estimatedProfit, setEstimatedProfit] = useState(0);

  const handleValueChange = (e) => {
    console.log(e.target.value);
    const newValue = parseFloat(e.target.value);
    setValue(newValue);
  };

  useEffect(() => {
    document.documentElement.style.setProperty("--thumb-pos", `${value / 100}`);
  }, [value]);

  const handleInputChange = (event) => {
    const newValue = parseFloat(event.target.value);
    setValue(newValue);

    const audio = new Audio(diceAudio);
    // dice range adjustment volume;
    audio.volume = 0;
    audio.play();
  };

  const genrateDiceFloat = () => {
    const diceFloat = Math.random();
    const fitNumber = (diceFloat * 100).toFixed(2);
    setDiceNumber(parseFloat(fitNumber));
    // setDiceNumber(0)

    const containerWidth = 1200; // Width of the container
    // const pixels = (fitNumber / 100) * containerWidth;
    const pixels = (fitNumber / 110.2) * containerWidth;

    // Animate the image
    setDicePixelPosition(pixels);
  };

  // Starting Game With DiceBet diceActiceBet is true
  useEffect(() => {
    if (diceBetActive) {
      genrateDiceFloat();
      setBetInProgress(true); // Start bet processing
    }
  }, [diceBetActive]);

  useEffect(() => {
    let timeoutId;
    if (diceBetActive) {
      timeoutId = setTimeout(() => {
        dispatch({ type: "SET_DICE_BET_ACTIVE", payload: false });
      }, 500); // Ensure bet processing finishes within 500ms
    }
    return () => clearTimeout(timeoutId);
  }, [diceBetActive, dispatch]);

  useEffect(() => {
    if (betInProgress) {
      let profit = 0;
      if (diceNumber > value) {
        setShowDiceClr(true);
        const audio = new Audio(diceBetWinEffect);
        audio.volume = 0.5;
        audio.play();

        profit = estimatedProfit;
      } else {
        setShowDiceClr(false);
      }

      if (profit > 0) {
        dispatch({
          type: "SET_PROFIT_FROM_DICE",
          payload: reduxBetAmount * profit,
        });
      } else {
        dispatch({ type: "SET_BET_AMOUNT", payload: 0 });
      }

      setBetInProgress(false); // Bet processing finished
    }
  }, [
    diceNumber,
    value,
    estimatedProfit,
    betInProgress,
    dispatch,
    reduxBetAmount,
  ]);

  const handleRollOver = () => {
    setRollOver(!rollOver);
  };

  // console.log("diceEstimatedProfit ", diceEstimatedProfit);
  // console.log("walletBalance is ", walletBalance);
  // console.log("diceNumber: " + diceNumber)
  // console.log(typeof reduxBetAmount)
  // console.log(diceNumber)
  // console.log(value)
  // console.log("diceNumber is", diceNumber);
  // console.log("dicePixelPosition is", dicePixelPosition);
  // console.log("selected Dice range value is ", value);
  // console.log("roll Over is ", rollOver);
  // console.log("dice bet Actice is ", diceBetActive);
  // console.log("showDice Clr is ", showDiceClr);

  const calculateProfit = (value) => {
    if (value >= 98) return 49.5;
    if (value >= 97) return 33;
    if (value >= 96) return 24.75;
    if (value >= 94) return 16.5;
    if (value >= 92) return 12;
    if (value >= 90) return 9.9;
    if (value >= 85) return 6.6;
    if (value >= 80) return 4.95;
    if (value >= 75) return 3.96;
    if (value >= 70) return 3.3;
    if (value >= 65) return 2.82;
    if (value >= 60) return 2.45;
    if (value >= 55) return 2.23;
    if (value >= 50) return 2;
    if (value >= 45) return 1.8;
    if (value >= 40) return 1.65;
    if (value >= 35) return 1.52;
    if (value >= 30) return 1.41;
    if (value >= 25) return 1.32;
    if (value >= 20) return 1.23;
    if (value >= 15) return 1.16;
    if (value >= 10) return 1.1;
    if (value >= 5) return 1.04;
    return 0;
  };

  useEffect(() => {
    setEstimatedProfit(calculateProfit(parseFloat(value).toFixed(2)));
    dispatch({
      type: "SET_DICE_ESTIMATED_PROFIT",
      payload: calculateProfit(value),
    });
  }, [value, dispatch]);

  // console.log("estimatedProfit is ", estimatedProfit * reduxBetAmount);
  return (
    <div className="dice">
      <div className="child-dice">
        {/* <div className="parent-dice-range-numbers">
          <h6 className="dice-range-numbers">0</h6>
          <h6 className="dice-range-numbers">100</h6>
        </div> */}
        <div className="parent-dice-range">
          <input
            className={rollOver ? "dice-range-green" : "dice-range"}
            type="range"
            step={0.01}
            min={0}
            max={100}
            value={value}
            onChange={handleInputChange}
          />
        </div>
        <div className="parent-assume-img">
          {/* hide this */}
          <div className="assume-img">
            <motion.img
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: dicePixelPosition, x: dicePixelPosition }}
              transition={{ duration: 0.2 }}
              className="hexagon-img"
              src={hexagon}
              alt=""
            />
            {/* <motion.h6
              className="dice-img-number"
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: dicePixelPosition, x: dicePixelPosition }}
              transition={{ duration: 0.2 }}
            >
              {diceNumber}
            </motion.h6> */}
          </div>
        </div>

        <div className="parent-roll-over">
          <div className="inner-parent-roll-over">
            <h5 className="inner-parent-roll-over-header">Result</h5>
            {/* change color here of dice bet */}
            <input
              className={
                showDiceClr
                  ? "inner-parent-roll-over-input show-dice-clr-red"
                  : "inner-parent-roll-over-input show-dice-clr-green"
              }
              type="Number"
              value={diceNumber}
              onChange={handleValueChange}
              disabled
              min={0}
              max={100}
            />
          </div>
          <div className="inner-parent-roll-over">
            <h5 className="inner-parent-roll-over-header">
              {rollOver ? "Roll Under" : "Roll Over"}
            </h5>
            <button
              className="inner-parent-roll-over-input"
              onClick={() => {
                handleRollOver();
              }}
            >
              {rollOver ? "49.50" : "50.50"}
              <RotateRightIcon />
            </button>
          </div>
          <div className="inner-parent-roll-over">
            <h5 className="inner-parent-roll-over-header">Range</h5>
            <input
              className="inner-parent-roll-over-input"
              type="Number"
              value={value}
              onChange={handleValueChange}
              min={0}
              max={100}
            />
          </div>
        </div>
        {/* <button onClick={genrateDiceFloat}>Click To Roll Dice</button> */}
      </div>
    </div>
  );
};

export default Dice;
