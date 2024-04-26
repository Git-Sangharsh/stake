import React, { useState, useEffect } from "react";
import "./Dice.css";
import diceAudio from "../../../audio/diceAudio.mp3";

const Dice = () => {
  const [value, setValue] = useState(50);

  useEffect(() => {
    // Update the CSS custom property for dynamic coloring
    document.documentElement.style.setProperty("--thumb-pos", `${value / 100}`);
  }, [value]);

  const handleInputChange = (event) => {
    const newValue = parseFloat(event.target.value);
    setValue(newValue);

    // Play dice audio
    const audio = new Audio(diceAudio);
    audio.play();
  };

  return (
    <div className="dice">
      <div className="child-dice">
        <div className="dice-numbers-div">
          <h6 className="dice-numbers">0</h6>
          <h6 className="dice-numbers">25</h6>
          <h6 className="dice-numbers">50</h6>
          <h6 className="dice-numbers">75</h6>
          <h6 className="dice-numbers">100</h6>
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
      </div>
      <h1>Selected value is </h1>
      <h1>{value.toFixed(2)}</h1>
    </div>
  );
};

export default Dice;
