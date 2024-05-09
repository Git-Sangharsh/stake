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

  const [value, setValue] = useState(50);
  const [diceNumber, setDiceNumber] = useState("0.00");
  const [showAnimation, setShowAnimation] = useState(false);
  const [dicePixelPosition, setDicePixelPosition] = useState(0); // Define dicePixelPosition state
  const [rollOver, setRollOver] = useState(false);

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
    audio.play();
  };

  const genrateDiceFloat = () => {
    const diceFloat = Math.random();
    const fitNumber = (diceFloat * 100).toFixed(2);
    setDiceNumber(fitNumber);
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
    const handleKeyPress = (e) => {
      if (e.code === "Space") {
        genrateDiceFloat();
      }
      window.addEventListener("keydown", handleKeyPress);

      return () => {
        window.removeEventListener("keydown", handleKeyPress);
      };
    };
  }, []);

  useEffect(() => {
    if (!rollOver && diceNumber > value) {
      console.log("congrats u win the bet");
      if (diceBetActive) {
        const audio = new Audio(diceBetWinEffect);
        audio.volume = 0.5;
        audio.play();
      }
    } else if (rollOver && diceNumber < value) {
      console.log("value is Greater than the diceNumeber");
      if (diceBetActive) {
        const audio = new Audio(diceBetWinEffect);
        audio.volume = 0.5;
        audio.play();
      }
    }
  }, [diceNumber, value]);

  const handleRollOver = () => {
    setRollOver(!rollOver);
  };
  // console.log("animation is", showAnimation);
  // console.log("diceNumber is", diceNumber);
  // // console.log("dicePixelPosition is", dicePixelPosition);
  // console.log("selected Dice range value is ", value);
  // console.log("roll Over is ", rollOver);
  console.log("dice bet Actice is ", diceBetActive);

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
          <div className="assume-img">
            <motion.img
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: 1, x: dicePixelPosition }}
              transition={{ duration: 0.2 }}
              className="hexagon-img"
              src={hexagon}
              alt=""
            />
            <motion.h6
              className="dice-img-number"
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: 1, x: dicePixelPosition }}
              transition={{ duration: 0.2 }}
            >
              {diceNumber}
            </motion.h6>
          </div>
        </div>

        <div className="parent-roll-over">
          <div className="inner-parent-roll-over">
            <h5 className="inner-parent-roll-over-header">
              {" "}
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
