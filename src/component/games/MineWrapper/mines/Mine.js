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
  const profitBox = useSelector((state) => state.profitBox);
  const profitMultiplier = useSelector((state) => state.profitMultiplier);

  useEffect(() => {
    if (mineEncounter) {
      dispatch({ type: "SET_BET_ACTIVE", payload: false });
    }
  }, [dispatch, mineEncounter]);

  useEffect(() => {
    if (profitBox) {
      const timer = setTimeout(() => {
        dispatch({ type: "SET_PROFIT_BOX", payload: false });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [dispatch, profitBox]); // D

  // console.log("betActive is ", reduxBetActive);
  // console.log('mineEncounter is ', mineEncounter)
  const reduxBetAmount = useSelector((state) => state.betAmount);
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
      dispatch({ type: "SET_PROFIT_FROM_BET", payload: 0 });
      dispatch({ type: "SET_PROFIT_MULTIPLIER", payload: 0.0 });
      revealAllBoxes();
    }
  }, [dispatch, mineEncounter]);

  const revealAllBoxes = () => {
    setViewBoxIds(allBoxIds);
  };

  // console.log("revealBoxId is ", revealedBoxIds);

  const handleBoxClick = (boxId) => {
    if (reduxBetActive) {
      if (!viewBoxIds.includes(boxId)) {
        setViewBoxIds((prevIds) => [...prevIds, boxId]);

        if (shuffledBoxIds.includes(boxId)) {
          const audio = new Audio(gemSoundEffect);
          audio.volume = 0.5;
          audio.play();
          const gemMultiplier = getGemMultiplier(boxId); // Step 3
          const multipliedValue = reduxBetAmount * gemMultiplier; // Step 3
          dispatch({ type: "SET_PROFIT_MULTIPLIER", payload: gemMultiplier });
          dispatch({ type: "SET_PROFIT_FROM_BET", payload: multipliedValue });
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

  const getGemMultiplier = (boxId) => {
    const REWARD_1_MINE = [
      1.03, 1.08, 1.12, 1.18, 1.24, 1.37, 1.46, 1.55, 1.65, 1.77, 1.96, 2.06,
      2.25, 2.47, 2.75, 3.09, 3.54, 4.13, 4.45, 4.95, 6.19, 8.25, 12.38, 24.75,
    ];
    const REWARD_2_MINE = [
      1.08, 1.17, 1.29, 1.41, 1.56, 1.74, 1.94, 2.18, 2.48, 2.83, 3.26, 3.81,
      4.5, 5.4, 6.6, 8.25, 10.61, 14.14, 20.22, 29.7, 49.5, 99.31, 297.0,
    ];
    const REWARD_3_MINE = [
      1.1, 1.17, 1.29, 1.41, 1.56, 1.74, 1.94, 2.18, 2.48, 2.83, 3.26, 3.81,
      4.5, 5.4, 6.6, 8.25, 10.61, 20.22, 29.7, 49.5, 99.31, 350.45,
    ];

    const REWARD_4_MINE = [
      1.14, 1.25, 1.45, 1.7, 2.06, 2.6, 3.18, 4.26, 4.99, 5.67, 7.56, 9.25,
      14.7, 22.12, 28.23, 35, 40.12, 45.2, 60.24, 136.37, 438,
    ];

    const REWARD_5_MINE = [
      1.18, 1.45, 2.0, 2.14, 2.48, 3.35, 3.9, 4.26, 4.99, 5.67, 7.56, 9.25,
      14.7, 22.12, 28.23, 35.36, 50.12, 60.2, 140, 460,
    ];

    const REWARD_6_MINE = [
      1.22, 1.55, 2.14, 2.48, 3.35, 4.02, 4.99, 5.2, 5.69, 6.34, 7.02, 7.59,
      8.2, 8.89, 9.35, 25.12, 70.12, 150, 503.69,
    ];

    //!!!!!!!!!!!!!!!! completed till here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const REWARD_7_MINE = [
      1.45, 1.8, 2.14, 2.8, 3.5, 4.89, 5.12, 5.59, 6.5, 7.34, 7.99, 10.59,
      14.48, 21.15, 49.35, 80.56, 190.12, 580.56,
    ];

    const REWARD_8_MINE = [
      1.56, 3.12, 4.68, 6.24, 7.8, 8.8, 9.36, 10.92, 12.48, 18.04, 25.6, 32.16,
      44.12, 54.12, 86.45, 198.03, 620.69,
    ];

    const REWARD_9_MINE = [
      1.62, 1.99, 2.25, 2.68, 3.08, 3.36, 3.99, 4.92, 8.48, 12.04, 18.6, 25.16,
      120.16, 166.12, 250.45, 680.15,
    ];

    const REWARD_10_MINE = [
      1.68, 2.25, 2.68, 3.08, 3.36, 4.92, 8.48, 12.04, 18.6, 25.16, 37.64,
      120.16, 166.12, 250.45, 723.55,
    ];

    //!!!!!!!!!!!!!!!! completed till here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const REWARD_11_MINE = [
      1.72, 2.34, 3.08, 4.92, 6.46, 8.48, 12.04, 18.6, 25.16, 37.64, 120.16,
      166.12, 250.45, 756.55,
    ];

    const REWARD_12_MINE = [
      1.72, 2.34, 3.08, 4.92, 6.46, 8.48, 12.04, 18.6, 25.16, 37.64, 120.16,
      166.12, 770.45,
    ];

    const REWARD_13_MINE = [
      1.72, 2.34, 3.36, 4.92, 6.46, 8.48, 12.04, 18.6, 25.16, 37.64, 120.16,
      800.12,
    ];
    const REWARD_14_MINE = [
      1.72, 2.34, 3.08, 4.92, 6.46, 8.48, 12.04, 18.6, 25.16, 37.64, 650.69,
    ];
    const REWARD_15_MINE = [
      2.34, 3.08, 3.36, 4.92, 6.46, 8.48, 12.04, 18.6, 25.16, 540.69,
    ];
    const REWARD_16_MINE = [
      2.34, 3.08, 3.36, 4.92, 6.46, 8.48, 12.04, 18.6, 490.69,
    ];
    const REWARD_17_MINE = [3.08, 3.36, 4.92, 6.46, 8.48, 12.04, 99.15, 220.69];
    const REWARD_18_MINE = [3.36, 4.92, 6.46, 8.48, 12.04, 99.15, 150.69];
    const REWARD_19_MINE = [3.36, 4.92, 6.46, 12.04, 99.15, 136.69];
    const REWARD_20_MINE = [3.08, 3.36, 4.92, 6.46, 99.15];
    const REWARD_21_MINE = [3.36, 4.92, 6.46, 106.15];
    const REWARD_22_MINE = [4.92, 60.46, 130.15];
    const REWARD_23_MINE = [8.165, 97.21];
    const REWARD_24_MINE = [24.12];

    let MULTIPLIER_BASED_ON_MINE;
    switch (mineCounter) {
      case 1:
        MULTIPLIER_BASED_ON_MINE = REWARD_1_MINE;
        break;
      case 2:
        MULTIPLIER_BASED_ON_MINE = REWARD_2_MINE;
        break;
      case 3:
        MULTIPLIER_BASED_ON_MINE = REWARD_3_MINE;
        break;
      case 4:
        MULTIPLIER_BASED_ON_MINE = REWARD_4_MINE;
        break;
      case 5:
        MULTIPLIER_BASED_ON_MINE = REWARD_5_MINE;
        break;
      case 6:
        MULTIPLIER_BASED_ON_MINE = REWARD_6_MINE;
        break;
      case 7:
        MULTIPLIER_BASED_ON_MINE = REWARD_7_MINE;
        break;
      case 8:
        MULTIPLIER_BASED_ON_MINE = REWARD_8_MINE;
        break;
      case 9:
        MULTIPLIER_BASED_ON_MINE = REWARD_9_MINE;
        break;
      case 10:
        MULTIPLIER_BASED_ON_MINE = REWARD_10_MINE;
        break;
      case 11:
        MULTIPLIER_BASED_ON_MINE = REWARD_11_MINE;
        break;
      case 12:
        MULTIPLIER_BASED_ON_MINE = REWARD_12_MINE;
        break;
      case 13:
        MULTIPLIER_BASED_ON_MINE = REWARD_13_MINE;
        break;
      case 14:
        MULTIPLIER_BASED_ON_MINE = REWARD_14_MINE;
        break;
      case 15:
        MULTIPLIER_BASED_ON_MINE = REWARD_15_MINE;
        break;
      case 16:
        MULTIPLIER_BASED_ON_MINE = REWARD_16_MINE;
        break;
      case 17:
        MULTIPLIER_BASED_ON_MINE = REWARD_17_MINE;
        break;
      case 18:
        MULTIPLIER_BASED_ON_MINE = REWARD_18_MINE;
        break;
      case 19:
        MULTIPLIER_BASED_ON_MINE = REWARD_19_MINE;
        break;
      case 20:
        MULTIPLIER_BASED_ON_MINE = REWARD_20_MINE;
        break;
      case 21:
        MULTIPLIER_BASED_ON_MINE = REWARD_21_MINE;
        break;
      case 22:
        MULTIPLIER_BASED_ON_MINE = REWARD_22_MINE;
        break;
      case 23:
        MULTIPLIER_BASED_ON_MINE = REWARD_23_MINE;
        break;
      case 24:
        MULTIPLIER_BASED_ON_MINE = REWARD_24_MINE;
        break;
      default:
        MULTIPLIER_BASED_ON_MINE = REWARD_1_MINE;
        break;
    }

    // Ensure that boxId is within a valid range
    const validBoxId = viewBoxIds.length % MULTIPLIER_BASED_ON_MINE.length;
    return MULTIPLIER_BASED_ON_MINE[validBoxId];
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

  return (
    <div className={profitBox ? "mines bg-mines" : "mines"}>
      {renderRows()}
      <div className={profitBox ?"parent-profit-box" : ""}>
        {profitBox && (
          <div className="profit-box">
            <h1>{profitMultiplier}x</h1>
            <div className="brdr"></div>
            <h1>₹{(profitMultiplier * reduxBetAmount).toFixed(2)}</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mine;
