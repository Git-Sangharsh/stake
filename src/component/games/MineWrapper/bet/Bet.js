import React, { useState } from "react";
import "./Bet.css";
import rupeesSvg from "../../../assets/rs.svg";

const Bet = () => {

  const [betAmount, setBetAmount] = useState("0.00");

  // const [defaultMineNumb, setDefaultMineNumb] = useState(3);

  const handleBetAmount = (e) => {
    const input = e.target.value;

    if (!isNaN(input) && input !== "") {
      setBetAmount(input);
    }
  };

  const handleBetClick = () => {
    setBetAmount("");
  };

  const selectMineNumb = Array.from({ length: 20 }, (_, index) => index + 1);
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
    </div>
  );
};

export default Bet;
