import React, { useState, useEffect } from "react";
import gem from "../../../assets/gem.svg";
import mine from "../../../assets/mine.svg";
import "./Mine.css";
import gemSoundEffect from "../../../audio/gemCollect1.mp3";
import explosionSoundEffect from "../../../audio/crash.mp3";
import mineEffect from "../../../assets/mineEffect.webp";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

const Mine = () => {
  const dispatch = useDispatch();
  const reduxBetActive = useSelector((state) => state.betActive);
  const mineEncounter = useSelector((state) => state.mineEncounter);
  const mineCounter = useSelector((state) => state.mineCounter);

  useEffect(() => {
    if (mineEncounter) {
      dispatch({ type: "SET_BET_ACTIVE", payload: false });
    }
  }, [dispatch, mineEncounter]);

  // console.log("betActive is ", reduxBetActive);
  // console.log('mineEncounter is ', mineEncounter)
  // const reduxBetAmount = useSelector((state) => state.betAmount);
  // console.log( "active is" , reduxBetActive)
  // console.log( "bet amount is " , reduxBetAmount)

  const rows = 5;
  const columns = 5;
  const allBoxIds = Array.from({ length: rows * columns }, (_, index) => index);

  const [revealedBoxIds, setRevealedBoxIds] = useState([]);
  const [shuffledBoxIds, setShuffledBoxIds] = useState([]);
  const [viewBoxIds, setViewBoxIds] = useState([]);

  const fisherYatesShuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    const shuffledIds = fisherYatesShuffle([...allBoxIds]);
    const selectedIds = shuffledIds.slice(0, mineCounter);
    const remainingShuffledIds = shuffledIds.slice(mineCounter);

    setShuffledBoxIds(remainingShuffledIds);
    setRevealedBoxIds(selectedIds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetGame = () => {
    const shuffledIds = fisherYatesShuffle([...allBoxIds]);
    const selectedIds = shuffledIds.slice(0, mineCounter);
    const remainingShuffledIds = shuffledIds.slice(mineCounter);

    setShuffledBoxIds(remainingShuffledIds);
    setRevealedBoxIds(selectedIds);
    setViewBoxIds([]);
  };

  useEffect(() => {
    if (reduxBetActive) {
      resetGame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduxBetActive]);

  useEffect(() => {
    if (mineEncounter) {
      dispatch({ type: "SET_BET_ACTIVE", payload: false });
      revealAllBoxes();
    }
  }, [dispatch, mineEncounter])

  const revealAllBoxes = () => {
    setViewBoxIds(allBoxIds);
  };

  const handleBoxClick = (boxId) => {
    if (reduxBetActive) {
      if (!viewBoxIds.includes(boxId)) {
        setViewBoxIds((prevIds) => [...prevIds, boxId]);

        if (shuffledBoxIds.includes(boxId)) {
          const audio = new Audio(gemSoundEffect);
          audio.volume = 0.5;

          audio.play();
        } else if (revealedBoxIds.includes(boxId)) {
          const audio = new Audio(explosionSoundEffect);
          audio.volume = 0.5;
          audio.play();
        }
      }
    } else {
      console.log("pls place a bet first");
    }
  };

  useEffect(() => {
    const hasCommonElements = viewBoxIds.some((id) =>
      revealedBoxIds.includes(id)
    );
    dispatch({ type: "SET_MINE_ENCOUNTER", payload: hasCommonElements });
  }, [viewBoxIds, revealedBoxIds, dispatch]);

  const renderRow = (rowIndex) => {
    const boxes = [];
    for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
      const boxId = rowIndex * columns + columnIndex;
      // const isRevealed = revealedBoxIds.includes(boxId);
      const isClickedAndNotRevealedMine =
        viewBoxIds.includes(boxId) && revealedBoxIds.includes(boxId);
      const isClickedAndNotRevealed =
        viewBoxIds.includes(boxId) && !revealedBoxIds.includes(boxId);
      // console.log('mine image are ', isClickedAndNotRevealed);

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
