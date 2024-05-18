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
  const diceBetWinAmount = useSelector((state) => state.diceBetWinAmount);

  const [value, setValue] = useState(50);
  const [diceNumber, setDiceNumber] = useState("0.00");
  const [showAnimation, setShowAnimation] = useState(false);
  const [dicePixelPosition, setDicePixelPosition] = useState(0); // Define dicePixelPosition state
  const [rollOver, setRollOver] = useState(false);
  const [showDiceClr, setShowDiceClr] = useState("");
  const [profitFromDiceBet, setProfitFromDiceBet] = useState("");

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
    setShowAnimation(true);
    setDicePixelPosition(pixels);
    setTimeout(() => {
      setShowAnimation(false);
    }, 2000);
  };

  // Starting Game With DiceBet diceActiceBet is true
  useEffect(() => {
    if (diceBetActive) {
      genrateDiceFloat();
    }
  }, [diceBetActive]);

  // if diceBetActive is true setting it is to false under 0.5 sec
  useEffect(() => {
    let timeoutId;
    if (diceBetActive) {
      timeoutId = setTimeout(() => {
        dispatch({ type: "SET_DICE_BET_ACTIVE", payload: false });
      }, 500);
    }
    return () => clearTimeout(timeoutId);
  }, [diceBetActive]);

  useEffect(() => {
    if (!rollOver && diceNumber > value) {
      // console.log("congrats u win the bet");
      setShowDiceClr(true);
      if (diceBetActive) {
        const audio = new Audio(diceBetWinEffect);
        audio.volume = 0.5;
        audio.play();
      }
    } else if (!(!rollOver && diceNumber > value)) {
      // console.log("value is Greater than the diceNumeber");
      setShowDiceClr(false);
      if (diceBetActive) {
        const audio = new Audio(diceBetWinEffect);
        audio.volume = 0.5;
        audio.play();
      }
    }

    if (diceBetActive) {
      getRewardMultiplier();
    }
  }, [diceNumber, value, diceBetActive]);

  const handleRollOver = () => {
    setRollOver(!rollOver);
  };

  // console.log(typeof reduxBetAmount)
  // console.log(diceNumber)
  // console.log(value)
  // console.log("animation is", showAnimation);
  // console.log("diceNumber is", diceNumber);
  // console.log("dicePixelPosition is", dicePixelPosition);
  // console.log("selected Dice range value is ", value);
  // console.log("roll Over is ", rollOver);
  // console.log("dice bet Actice is ", diceBetActive);
  // console.log("showDice Clr is ", showDiceClr);

  // useEffect(() => {
  //   if (diceBetActive) {
  //     if (diceNumber < value) {
  //       console.log("life is suckss");
  //     } else if (diceNumber > value && value > 50.5 && value < 60) {
  //       console.log("Hello World!");
  //       console.log(reduxBetAmount * 2);
  //     } else if (diceNumber > value && value > 60.0 && value < 65) {
  //       console.log(reduxBetAmount * 2.47);
  //     } else if (diceNumber > value && value > 65 && value < 70) {
  //       console.log(reduxBetAmount * 2.82);
  //     } else if (diceNumber > value && value > 70 && value < 75) {
  //       console.log(reduxBetAmount * 3.3);
  //     } else if (diceNumber > value && value > 75 && value < 80) {
  //       console.log(reduxBetAmount * 3.96);
  //     } else if (diceNumber > value && value > 80 && value < 85) {
  //       console.log(reduxBetAmount * 4.95);
  //     } else if (diceNumber > value && value > 85 && value < 90) {
  //       console.log(reduxBetAmount * 6.6);
  //     } else if (diceNumber > value && value > 90 && value < 92) {
  //       console.log(reduxBetAmount * 9.9);
  //     } else if (diceNumber > value && value > 92 && value < 94) {
  //       console.log(reduxBetAmount * 12.37);
  //     } else if (diceNumber > value && value > 94 && value < 96) {
  //       console.log(reduxBetAmount * 16.5);
  //     } else if (diceNumber > value && value > 96 && value < 97) {
  //       console.log(reduxBetAmount * 24.75);
  //     } else if (diceNumber > value && value > 97 && value < 98) {
  //       console.log(reduxBetAmount * 33.0);
  //     } else if (diceNumber > value && value > 98) {
  //       console.log(reduxBetAmount * 49.5);
  //     } else {
  //       console.log(reduxBetAmount, diceNumber, value);
  //     }
  //   }
  // }, [diceNumber, value, diceBetActive, reduxBetAmount]);

  const getRewardMultiplier = () => {
    if (diceNumber > value) {
      if (diceNumber >= 50 && diceNumber <= 60) {
        // console.log(reduxBetAmount * 2);
        console.log("First Condition is True", diceNumber, value);
      } else if (diceNumber >= 60 && diceNumber <= 70) {
        console.log("Second Condition is true ", diceNumber, value);
      } else if (diceNumber >= 70 && diceNumber <= 80) {
        console.log("Third Condition is true ", diceNumber, value);
      } else if (diceNumber >= 80 && diceNumber <= 90) {
        console.log("Fourth Condition is true ", diceNumber, value);
      } else if (diceNumber >= 90 && diceNumber <= 100) {
        console.log("Sixth Condition is true ", diceNumber, value);
      }
    } else {
      console.log("bet is lost");
    }
  };

  // console.log("diceNumber: " + diceNumber)

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
      {/* <div className="parent-hexagon-img">
        <img src={hexagon} alt="" />
        <h1 className="dice-appear-number">{diceNumber}</h1>
      </div> */}
    </div>
  );
};

export default Dice;
