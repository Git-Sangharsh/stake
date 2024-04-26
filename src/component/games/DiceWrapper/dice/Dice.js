import React, { useState, useEffect } from "react";
import "./Dice.css";
import diceAudio from "../../../audio/diceAudio.mp3";
import hexagon from "../../../assets/hexagon.svg";
import { motion } from "framer-motion";

const Dice = () => {
  const [value, setValue] = useState(50);
  const [diceNumber, setDiceNumber] = useState(600);
  const [showAnimation, setShowAnimation] = useState(false);

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
    console.log("diceNumber is ", fitNumber);
    // setDiceNumber(fitNumber);
    setDiceNumber("100%");
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
    }, 1000);
  };

  // console.log("animation is", showAnimation);

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

  return (
    <div className="dice">
      <div className="child-dice">
        <div className="parent-dice-range-numbers">
          <h6 className="dice-range-numbers">0</h6>
          <h6 className="dice-range-numbers">25</h6>
          <h6 className="dice-range-numbers">50</h6>
          <h6 className="dice-range-numbers">75</h6>
          <h6 className="dice-range-numbers">100</h6>
        </div>
        <div className="parent-dice-range">
          <input
            className="dice-range"
            type="range"
            step={0.01}
            min={0}
            max={100}
            value={value}
            onChange={handleInputChange}
          />
        </div>
        {showAnimation && (
          <div className="assume-img">
            <motion.img
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: 1, x: diceNumber }}
              transition={{ duration: 1 }}
              className="hexagon-img"
              src={hexagon}
              alt=""
            />
          </div>
        )}
      </div>
      <h1>Selected value is {value.toFixed(2)}</h1>
      <div className="parent-hexagon-img">
        <img src={hexagon} alt="" />
        <h1 className="dice-appear-number">{diceNumber}</h1>
      </div>
      <button onClick={genrateDiceFloat}>Click To Roll Dice</button>
    </div>
  );
};

export default Dice;
