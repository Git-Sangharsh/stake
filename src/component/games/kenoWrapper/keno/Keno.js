import React, { useState } from "react";
import "./Keno.css";
import kenoClickEffect from "../../../audio/kenoClick2.mp3";

const Keno = () => {
  const [selcetedBoxes, setSelctedBoxes] = useState([]);

  const boxes = Array.from({ length: 40 }, (_, index) => index + 1);

  const handleSelectedKenoBoxes = (box) => {
    console.log("Clicked box id:", box);
    setSelctedBoxes((prevSelectedBoxes) => {
      if (prevSelectedBoxes.includes(box)) {
        return prevSelectedBoxes.filter((selectedBox) => selectedBox !== box);
      } else {
        if (selcetedBoxes.length < 11) {
          const audio = new Audio(kenoClickEffect);
          audio.volume = 0.5;

          audio.play();

          return [...prevSelectedBoxes, box];
        } else {
          console.log("Max boxes is reacched");
          return prevSelectedBoxes;
        }
      }
    });
  };

  console.log(selcetedBoxes);

  return (
    <div className="keno">
      <div className="keno-grid">
        {boxes.map((box) => (
          <div
            key={box}
            className={`keno-box ${
              selcetedBoxes.includes(box) ? "selected-keno-box" : ""
            }`}
          >
            <div
              className="keno-box-number"
              onClick={() => handleSelectedKenoBoxes(box)}
            >
              {box}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Keno;
