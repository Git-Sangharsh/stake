import React, { useState, useEffect } from "react";
import "./Mine.css";
import gem from "../../assets/gem.svg";
import mine from "../../assets/mine.svg";

const Mine = () => {
  const rows = 5;
  const columns = 5;

  // Generate an array with all box IDs
  const allBoxIds = Array.from({ length: rows * columns }, (_, index) => index);

  // State for revealed box IDs
  const [revealedBoxIds, setRevealedBoxIds] = useState([]);

  // State for shuffled box IDs
  const [shuffledBoxIds, setShuffledBoxIds] = useState([]);

  console.log("revealedBoxIds", revealedBoxIds)

  // Fisher-Yates shuffle function
  const fisherYatesShuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    console.log(array)
    return array;
  };

  useEffect(() => {
    // Shuffle the array of all box IDs
    const shuffledIds = fisherYatesShuffle([...allBoxIds]);

    // Select the first 5 box IDs from the shuffled array
    const selectedIds = shuffledIds.slice(0, 5);

    // Set the shuffled and selected box IDs in state
    setShuffledBoxIds(shuffledIds);
    setRevealedBoxIds(selectedIds);

    // Add your custom logic here
  }, []); // Empty dependency array ensures this effect runs once on component mount

  const handleBoxClick = (boxId) => {
    console.log(`Clicked on box with id: ${boxId}`);
    // Add your custom logic here
  };

  const renderRow = (rowIndex) => {
    const boxes = [];
    for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
      const boxId = rowIndex * columns + columnIndex;
      const isRevealed = revealedBoxIds.includes(boxId);
      const isShuffled = shuffledBoxIds.includes(boxId);

      boxes.push(
        <div
          key={`box${boxId}`}
          id={`box${boxId}`}
          className={`box${columnIndex} boxes ${
            isRevealed ? "boxes-reveal" : ""
          } ${isShuffled ? "boxes-shuffled" : ""}`}
          onClick={() => handleBoxClick(boxId)}
        >
          {/* {isRevealed ? (
            <img src={mine} alt="mine" className="mine-img" />
          ) : (
            <img src={gem} alt="gem" className="gem-img" />
          )} */}
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

  return <div className="mine-wrapper">{renderRows()}</div>;
};

export default Mine;
