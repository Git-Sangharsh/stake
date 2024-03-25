import React, { useEffect, useState } from "react";
import "./Keno.css";
import kenoClickEffect from "../../../audio/kenoClick2.mp3";

const Keno = () => {

  const [selectedBoxes, setSelectedBoxes] = useState([]);
  const [selectionLimitReached, setSelectionLimitReached] = useState(false);

  const boxes = Array.from({ length: 40 }, (_, index) => index + 1);

  useEffect(() => {
    if (selectedBoxes.length >= 11) {
      setSelectionLimitReached(true);
    } else {
      setSelectionLimitReached(false);
    }
  }, [selectedBoxes]);

  const handleSelectedKenoBoxes = (box) => {
    console.log("Clicked box id:", box);
    setSelectedBoxes((prevSelectedBoxes) => {
      if (prevSelectedBoxes.includes(box)) {
        return prevSelectedBoxes.filter((selectedBox) => selectedBox !== box);
      } else {
        if (selectedBoxes.length < 11) {
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

  // console.log(selcetedBoxes);
  console.log(selectionLimitReached);

  return (
    <div className="keno">
      <div className="keno-grid">
        <div
          className={
            selectionLimitReached ? "select-limit-reached-grid-bg" : "none"
          }
        ></div>
        {boxes.map((box) => (
          <div
            key={box}
            className={`keno-box ${
              selectedBoxes.includes(box) ? "selected-keno-box" : ""
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
