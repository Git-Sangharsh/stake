import React, { useState } from "react";
import "./Bet.css";
import rupeesSvg from "../../../assets/rs.svg";
import { useDispatch, useSelector } from "react-redux";
import betSoundEffect from "../../../audio/betSoundEffect.mp3";
import cashoutSoundEffect from "../../../audio/cashoutSoundEffect.mp3";

const Bet = () => {
  const dispatch = useDispatch();
  // const walletBalance = useSelector((state) => state.walletBalance);
  // const reduxBetAmount = useSelector((state) => state.betAmount);
  const reduxBetActive = useSelector((state) => state.betActive);
  const betProfit = useSelector((state) => state.profitFromBet).toFixed(2);
  // const mineEncounter = useSelector((state) =>  state.mineEncounter);
  // console.log('bet mine', mineEncounter)
  // console.log(reduxBetActive, "active is")
  // console.log("reduxBetAmount is", reduxBetAmount);
  // console.log("walletBalance is ", walletBalance);

  const [betAmount, setBetAmount] = useState("0.00");
  const [stateMineSet, setStateMineSet] = useState(1);


  // const rewardValue = [
  //   1.24, 1.54, 2.0, 2.58, 3.39, 4.52, 6.14, 8.5, 12.04, 17.52, 26.17, 40.87,
  //   66.41, 113.85, 184.83, 275.82, 380.94, 532, 748, 803.77,
  // ];
  const selectMineNumb = Array.from({ length: 24 }, (_, index) => index + 1);

  // console.log(selectMineNumb)

  const handleBetAmount = (e) => {
    const input = e.target.value;
    if (!isNaN(input) || input === "") {
      setBetAmount(input);
    }
  };

  const handleBetClick = () => {
    setBetAmount("");
  };

  // console.log("bet amount is ", betAmount);

  const handleBet = () => {
    if (betAmount.startsWith(0)) {
      console.log("bet starting with zero value");
      dispatch({ type: "SET_BET_ACTIVE", payload: false });
    } else {
      const audio = new Audio(betSoundEffect);
      audio.volume = 0.5;
      audio.play();
      dispatch({ type: "SET_BET_AMOUNT", payload: betAmount });
      dispatch({ type: "SET_BET_ACTIVE", payload: true });
      dispatch({ type: "SET_MINE_COUNTER", payload: stateMineSet });
      dispatch({ type: "SET_PROFIT_FROM_BET", payload: 0});
    }
  };

  const handleCashout = () => {
    dispatch({ type: "SET_BET_ACTIVE", payload: false });
    dispatch({ type: "SET_CASH_OUT_AMOUNT" });
    const audio = new Audio(cashoutSoundEffect);
    audio.volume = 0.5;
    audio.play();
  };


  const handleSetMines = (e) => {
    const selectedValue = parseInt(e.target.value, 10); // Ensure it's an integer
    setStateMineSet(selectedValue);
    dispatch({ type: "SET_MINE_COUNTER", payload: selectedValue });
  };

  return (
    <div className="bet">
      <div className="parent-manual">
        <h4 className="manual">Manual</h4>
      </div>
      <div className="bet-title">
        <li className="bet-title-child">Bet Amount</li>
        <li className="bet-title-child">0.000BTC</li>
      </div>
      <div className="bet-amount">
        <div className="bet-amount-row-1">
          <input
            type="text"
            value={betAmount}
            onChange={handleBetAmount}
            onClick={handleBetClick}
            className="bet-amount-input"
          />
          <img src={rupeesSvg} alt="" className="rupeesSvg" />
        </div>
        <div className="bet-amount-row-2">
          <h4 className="bet-amount-btn">1/2x</h4>
          <h4 className="bet-amount-btn left-border">2x</h4>
        </div>
      </div>
      <h4 className="select-mines">Mines</h4>
      <select className="numberSelect" onChange={handleSetMines} value={stateMineSet}>
        {selectMineNumb.map((number) => (
          <option key={number} value={number} className="numbs">
            {number}
          </option>
        ))}
      </select>
      {reduxBetActive ? (
        <h1 className="bet-btn cashout-btn" onClick={handleCashout}>
          Cashout
        </h1>
      ) : (
        <h1 className="bet-btn" onClick={handleBet}>
          Bet
        </h1>
      )}

      <div className="show-profit-percent">
        <h6 className="show-profit-text">Total profit (1.00x)</h6>
        <h6 className="show-profit-text">{betProfit} BTC</h6>
      </div>
      <div className="profit-amount-div">
        <h4>0.00</h4>
        <img src={rupeesSvg} alt="" className="rupeesSvg" />
      </div>
    </div>
  );
};

export default Bet;
