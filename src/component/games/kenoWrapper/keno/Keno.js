import React, { useEffect, useState } from "react";
import "./Keno.css";
import kenoClickEffect from "../../../audio/kenoClick2.mp3";
import kenoAppearEffect from "../../../audio/appearEffect.mp3";
// import kenoGem from "../../../assets/kenoGem.svg";
import { motion } from "framer-motion";

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
            setSelectionLimitReached(true);
          }

          if (generatedCount < 11) {
            generateNumberWithDelay(index + 1);
          }
        }, 100);
      }
    };

    generateNumberWithDelay(0);
  };

  const handleClearTable = () => {
    setSelectedBoxes([]);
    setGeneratedNumbers([]);
    setSelectionLimitReached(false);
  };

  // const handleSingleClearTabel = (box) => {
  //   setSelectedBoxes((prevSelectedBoxes) => {
  //     if (prevSelectedBoxes.includes(box)) {
  //       return prevSelectedBoxes.filter((selectedBox) => selectedBox !== box);
  //     } else {
  //       if (selectedBoxes.length < 11) {
  //         const audio = new Audio(kenoClickEffect);
  //         audio.volume = 0.5;
  //         audio.play();
  //         return [...prevSelectedBoxes, box];
  //       } else {
  //         console.log("Max boxes is reached");
  //         return prevSelectedBoxes;
  //       }
  //     }
  //   });
  //   // Remove classes from the clicked box
  //   const clickedBox = document.getElementById(`box-${box}`);
  //   if (clickedBox) {
  //     clickedBox.classList.remove("selected-keno-box");
  //     clickedBox.classList.remove("appear-keno-box");
  //   }
  // };

  console.log("Generated Numbers are: ", generatedNumbers);

  const handleAssume = (box) => {
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
    // Add the clicked box to the generated numbers
    setGeneratedNumbers((prevGeneratedNumbers) => [
      ...prevGeneratedNumbers,
      box,
    ]);
  };

  return (
    <div className="keno">
      <div className="keno-grid">
        <div
          className={
            selectionLimitReached ? "select-limit-reached-grid-bg" : "none"
          }
        ></div>
        {boxes.map((box) => (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [2, 1] }}
            transition={{ duration: 0.15 }}
            key={box}
            className={`keno-box ${
              selectedBoxes.includes(box) ? "selected-keno-box" : ""
            } ${
              generatedNumbers.includes(box) && !selectedBoxes.includes(box)
                ? "appear-keno-box"
                : ""
            }`}
          >
            {selectedBoxes.includes(box) && generatedNumbers.includes(box) ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [2, 1] }}
                transition={{ duration: 0.15 }}
                className="keno-gem-img-div"
                onClick={() => handleAssume(box)}
              >
                <div className="keno-bg-dark"></div>
                {/* <motion.img
      initial={{ scale: 0 }}
      animate={{ scale: [2, 1] }}
      transition={{ duration: 0.15 }}
      className="keno-gem-img"
      src={kenoGem}
      alt=""
    /> */}
                <div className="keno-gem-number">{box}</div>
              </motion.div>
            ) : (
              <div
                className={`keno-box-number ${
                  generatedNumbers.includes(box) && !selectedBoxes.includes(box)
                    ? "initial-box"
                    : ""
                }`}
                onClick={() => handleSelectedKenoBoxes(box)}
              >
                {box}
              </div>
            )}
          </motion.div>
        ))}
      </div>
      <button onClick={handleGeneratedNumbers}>Create Number</button>
      <button onClick={handleClearTable}>Clear Table</button>
    </div>
  );
};

export default Keno;
