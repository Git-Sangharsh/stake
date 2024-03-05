import React, { useState, useEffect } from "react";
import gem from "../../../assets/gem.svg";
import mine from "../../../assets/mine.svg";
import "./Mine.css";
import gemSoundEffect from "../../../audio/gemCollect1.mp3";
import explosionSoundEffect from "../../../audio/crash.mp3";
import mineEffect from "../../../assets/mineEffect.webp";
import { motion } from "framer-motion";

const Mine = () => {
  const rows = 5;
  const columns = 5;

  const allBoxIds = Array.from({ length: rows * columns }, (_, index) => index);

  const [revealedBoxIds, setRevealedBoxIds] = useState([]);
  const [shuffledBoxIds, setShuffledBoxIds] = useState([]);
  const [viewBoxIds, setViewBoxIds] = useState([]);
  // const [mineImage, setMineImage] = useState(null);

  const fisherYatesShuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

useEffect(() => {
  const shuffledIds = fisherYatesShuffle([...allBoxIds]);
  const selectedIds = shuffledIds.slice(0, 5);
  const remainingShuffledIds = shuffledIds.slice(5);

  setShuffledBoxIds(remainingShuffledIds);
  setRevealedBoxIds(selectedIds);
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);


  const handleBoxClick = (boxId) => {
    if (!viewBoxIds.includes(boxId)) {
      setViewBoxIds((prevIds) => [...prevIds, boxId]);

      if (shuffledBoxIds.includes(boxId)) {
        console.log("handleBoxClick found shuffled boxId!!");
        const audio = new Audio(gemSoundEffect);
        audio.play();
      } else if (revealedBoxIds.includes(boxId)) {
        const audioData = new Audio(explosionSoundEffect);
        audioData.play();
      }
    }
  };

  console.log("shuffleBox id is ", shuffledBoxIds);
  console.log("revealBox id is ", revealedBoxIds);
  console.log("viewBox id is ", viewBoxIds);


  const renderRow = (rowIndex) => {
    const boxes = [];
    for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
      const boxId = rowIndex * columns + columnIndex;
      // const isRevealed = revealedBoxIds.includes(boxId);

      const isClickedAndNotRevealedMine =
        viewBoxIds.includes(boxId) && revealedBoxIds.includes(boxId);
      const isClickedAndNotRevealed =
        viewBoxIds.includes(boxId) && !revealedBoxIds.includes(boxId);

      boxes.push(
        <div
          key={`box${boxId}`}
          id={`box${boxId}`}
          className={`box${columnIndex} boxes ${
            viewBoxIds.includes(boxId) ? "boxes-reveal" : ""
          }`}
          onClick={() => handleBoxClick(boxId)}
        >
          {isClickedAndNotRevealed && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2, ease: "easeIn" }}
            >
              <img src={gem} alt="gem" className="gem-img" />
            </motion.div>
          )}
          {isClickedAndNotRevealedMine && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2, ease: "easeIn" }}
            >
              <img src={mine} alt="mine" className="mine-img" />
            </motion.div>
          )}
          {isClickedAndNotRevealedMine && (
            <img src={mineEffect} alt="mine" className="mine-effect" />
          )}
        </div>
      );
    }
    return (
      <div key={`row${rowIndex}`} className={`row-${rowIndex}`}>
        {boxes}
      </div>
    );
  };

  const renderRows = () => {
    const rowsArray = [];
    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
      rowsArray.push(renderRow(rowIndex));
    }
    return rowsArray;
  };

  return <div className="mines">{renderRows()}</div>;
};

export default Mine;
