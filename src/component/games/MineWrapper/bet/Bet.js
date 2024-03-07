import React, { useState } from "react";
import "./Bet.css";
import rupeesSvg from "../../../assets/rs.svg";
import { useDispatch, useSelector } from "react-redux";

const Bet = () => {
  const dispatch = useDispatch();
  const walletBalance = useSelector((state) => state.walletBalance);
  const reduxBetAmount = useSelector((state) => state.betAmount);

  console.log('reduxBetAmount is', reduxBetAmount);
  console.log("walletBalance is ", walletBalance);

  const [betAmount, setBetAmount] = useState("0.00");

  // const rewardValue = [
  //   1.24, 1.54, 2.0, 2.58, 3.39, 4.52, 6.14, 8.5, 12.04, 17.52, 26.17, 40.87,
  //   66.41, 113.85, 184.83, 275.82, 380.94, 532, 748, 803.77,
  // ];
  const selectMineNumb = Array.from({ length: 20 }, (_, index) => index + 1);

  console.log("bet Amount is", betAmount);
  const handleBetAmount = (e) => {
    const input = e.target.value;

    // If the input is a valid number or an empty string, update the state
    if (!isNaN(input) || input === "") {
      setBetAmount(input);
    }
  };

  const handleBetClick = () => {
    setBetAmount("");
  };

  const handleBet = () => {
    dispatch({ type: "SET_BET_AMOUNT", payload: betAmount });
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
      <select className="numberSelect">
        {selectMineNumb.map((number) => (
          <option key={number} value={number} className="numbs">
            {number}
          </option>
        ))}
      </select>
      <h1 className="bet-btn" onClick={handleBet}>Bet</h1>
      <div className="show-profit-percent">
        <h6 className="show-profit-text">Total profit (1.00x)</h6>
        <h6 className="show-profit-text">0.0000000 BTC</h6>
      </div>
      <div className="profit-amount-div">
        <h4>0.00</h4>
        <img src={rupeesSvg} alt="" className="rupeesSvg" />
      </div>
    </div>
  );
};

export default Bet;
