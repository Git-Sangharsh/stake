import React, { useEffect, useState } from "react";
import "./Keno.css";
import kenoClickEffect from "../../../audio/kenoClick2.mp3";
import kenoAppearEffect from "../../../audio/appearEffect.mp3";
import kenoGem from "../../../assets/kenoGem.svg";

const Keno = () => {
  const [selectedBoxes, setSelectedBoxes] = useState([]);
  const [selectionLimitReached, setSelectionLimitReached] = useState(false);
  const [generatedNumbers, setGeneratedNumbers] = useState([]);

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
          console.log("Max boxes is reached");
          return prevSelectedBoxes;
        }
      }
    });
  };

  const handleGeneratedNumbers = () => {
    const randomNumbers = [];
    let generatedCount = 0;

    const audio = new Audio(kenoAppearEffect);

    const generateNumberWithDelay = (index) => {
      if (generatedCount < 11) {
        setTimeout(() => {
          const randomNumber = Math.floor(Math.random() * 40) + 1;

          if (!randomNumbers.includes(randomNumber)) {
            randomNumbers.push(randomNumber);
            setGeneratedNumbers([...randomNumbers]);
            generatedCount++;
            audio.play();
          }

          if (generatedCount < 11) {
            generateNumberWithDelay(index + 1);
          }
        }, 100);
      }
    };

    generateNumberWithDelay(0);
  };

  console.log("Generated Numbers are: ", generatedNumbers);

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
            } ${
              generatedNumbers.includes(box) && !selectedBoxes.includes(box)
                ? "appear-keno-box"
                : ""
            }`}
          >
            {selectedBoxes.includes(box) && !generatedNumbers.includes(box) ? (
              <div
                className="keno-box-number"
                onClick={() => handleSelectedKenoBoxes(box)}
              >
                {box}
              </div>
            ) : selectedBoxes.includes(box) &&
              generatedNumbers.includes(box) ? (
              <div className="keno-gem-img-div">
                <img className="keno-gem-img" src={kenoGem} alt="" />
                <div className="keno-gem-number">{box}</div>
                
              </div>
            ) : (
              <div
                className={`keno-box-number ${
                  generatedNumbers.includes(box) && !selectedBoxes.includes(box)
                    ? "appear-box-number"
                    : ""
                }`}
                onClick={() => handleSelectedKenoBoxes(box)}
              >
                {box}
              </div>
            )}
          </div>
        ))}
      </div>
      <button onClick={handleGeneratedNumbers}>Create Number</button>
    </div>
  );
};

export default Keno;
