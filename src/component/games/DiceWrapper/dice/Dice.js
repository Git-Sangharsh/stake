import React, { useState, useEffect } from "react";
import "./Dice.css";
import diceAudio from "../../../audio/diceAudio.mp3";

const Dice = () => {
  const [value, setValue] = useState(50);

  useEffect(() => {
    // Update the CSS custom property for dynamic coloring
    document.documentElement.style.setProperty(
      "--thumb-pos",
      `${value / 100}`
    );
  }, [value]);

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);

    // Play dice audio
    const audio = new Audio(diceAudio);
    audio.play();
  };

  return (
    <div className="dice">
      <div className="parent-dice-range">
        <input
          className="dice-range"
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default Dice;
