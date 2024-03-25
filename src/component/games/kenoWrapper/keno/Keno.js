import React, { useState } from "react";
import "./Keno.css";

const Keno = () => {
  const [selcetedBoxes, setSelctedBoxes] = useState([]);
  const boxes = Array.from({ length: 40 }, (_, index) => index + 1);

  const handleSelectedKenoBoxes = (box) => {
    console.log("Clicked box id:", box);
    setSelctedBoxes((prevSelectedBoxes) => {
      if (prevSelectedBoxes.includes(box)) {
        return prevSelectedBoxes.filter((selectedBox) => selectedBox !== box);
      } else {
        return [...prevSelectedBoxes, box];
      }
    });
  };

  return (
    <div className="keno">
      <div className="keno-grid">
        {boxes.map((box) => (
          <div key={box}
          className={`keno-box ${selcetedBoxes.includes(box) ? 'selected-keno-box' : ''}`}
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
