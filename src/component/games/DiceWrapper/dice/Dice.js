import React, { useState, useEffect } from "react";
import "./Dice.css";
import diceAudio from "../../../audio/diceAudio.mp3";
import hexagon from "../../../assets/hexagon.svg";
import { motion } from "framer-motion";
import diceBetWinEffect from "../../../audio/dicegamewin.mp3";

const Dice = () => {
  const [value, setValue] = useState(50);
  const [diceNumber, setDiceNumber] = useState("0.00");
  const [showAnimation, setShowAnimation] = useState(false);
  const [dicePixelPosition, setDicePixelPosition] = useState(0); // Define dicePixelPosition state

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

    const containerWidth = 600; // Width of the container
    const pixels = (fitNumber / 100) * containerWidth;

    // Animate the image
    setShowAnimation(true);
    setDicePixelPosition(pixels);
    setTimeout(() => {
      setShowAnimation(false);
    }, 2000);
  };

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
    if (diceNumber > value) {
      console.log("congrats u win the bet");
      const audio = new Audio(diceBetWinEffect);
      audio.volume = 0.5;
      audio.play();
    } else {
      console.log("u loss the bet");
    }
  }, [diceNumber, value]);

  console.log("animation is", showAnimation);
  console.log("diceNumber is", diceNumber);
  console.log("dicePixelPosition is", dicePixelPosition);
  console.log("selected Dice range value is ", value);

  return (
    <div className="dice">
      <div className="child-dice">
        {/* <div className="parent-dice-range-numbers">
          <h6 className="dice-range-numbers">0</h6>
          <h6 className="dice-range-numbers">25</h6>
          <h6 className="dice-range-numbers">50</h6>
          <h6 className="dice-range-numbers">75</h6>
          <h6 className="dice-range-numbers">100</h6>
        </div> */}
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
      <div className="parent-hexagon-img">
        <img src={hexagon} alt="" />
        <h1 className="dice-appear-number">{diceNumber}</h1>
      </div>
      <button onClick={genrateDiceFloat}>Click To Roll Dice</button>
    </div>
  );
};

export default Dice;
