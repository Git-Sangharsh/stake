import React, { useEffect, useState } from "react";
import "./Bet.css";
import rupeesSvg from "../../../assets/rs.svg";
import { useDispatch, useSelector } from "react-redux";
import betSoundEffect from "../../../audio/betSoundEffect.mp3";
import cashoutSoundEffect from "../../../audio/cashoutSoundEffect.mp3";

const Bet = () => {
  const dispatch = useDispatch();
  const walletBalance = useSelector((state) => state.walletBalance);
  const reduxBetActive = useSelector((state) => state.betActive);
  const betProfit = useSelector((state) => state.profitFromBet).toFixed(2);
  const mineCounter = useSelector((state) => state.mineCounter);
  const profitMultiplier = useSelector((state) => state.profitMultiplier);
  const notEnoughBalance = useSelector((state) => state.notEnoughBalance);
  const mineEncounter = useSelector((state) => state.mineEncounter);
  const betActive = useSelector((state) => state.betActive);
  // console.log("mineEncouter is ", mineEncounter);
  // console.log("active is", reduxBetActive);
  // console.log("profitFrom bet is", betProfit);
  // const reduxBetAmount = useSelector((state) => state.betAmount);
  // const profitBox = useSelector((state) =>  state.profitBox);
  // console.log("profitBox is", profitBox)
  // console.log('mineCounter', mineCounter);
  // console.log('bet mine', mineEncounter)
  // console.log("reduxBetAmount is", reduxBetAmount);
  // console.log("walletBalance is ", walletBalance);

  const [betAmount, setBetAmount] = useState(() => {
    return localStorage.getItem("betAmount") || "0.00";
  });
  const [stateMineSet, setStateMineSet] = useState(1);


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

  const handleIncreaseByOneTwoX = () => {
    if (!reduxBetActive) {
      const multipliedAmount = parseFloat(betAmount) * 1.5;
      if (multipliedAmount > walletBalance) {
        setBetAmount(walletBalance);
      } else {
        setBetAmount(multipliedAmount.toFixed(2));
      }
    }
  };

  const handleIncreaseByTwoX = () => {
    if (!reduxBetActive) {
      const multipliedAmount = parseFloat(betAmount) * 2;
      if (multipliedAmount > walletBalance) {
        console.log("not enough balance in wallet");
        setBetAmount(walletBalance);
      } else {
        setBetAmount(multipliedAmount.toFixed(2));
      }
    }
  };

  const convertToBitcoin = (amountInRupees) => {
    const conversionRate = 0.000000182311;
    return (amountInRupees * conversionRate).toFixed(8);
  };

  const handleBet = () => {
    if (betAmount.toString().startsWith("0") || betAmount === "") {
      console.log("bet starting with zero value");
      dispatch({ type: "SET_BET_ACTIVE", payload: false });
    } else if (betAmount > walletBalance) {
      console.log("not enough balance in wallet");
      dispatch({ type: "SET_NOT_ENOUGH_BALANCE", payload: true });
    } else {
      const audio = new Audio(betSoundEffect);
      audio.volume = 0.5;
      audio.play();
      dispatch({ type: "SET_PROFIT_MULTIPLIER", payload: 0.0 });
      dispatch({ type: "SET_BET_AMOUNT", payload: betAmount });
      dispatch({ type: "SET_BET_ACTIVE", payload: true });
      dispatch({ type: "SET_MINE_COUNTER", payload: stateMineSet });
      dispatch({ type: "SET_PROFIT_FROM_BET", payload: 0 });
      dispatch({ type: "SET_NOT_ENOUGH_BALANCE", payload: false });
      dispatch({ type: "SET_PROFIT_BOX", payload: false });
    }
  };

  const handleCashout = () => {
    dispatch({ type: "SET_BET_ACTIVE", payload: false });
    dispatch({ type: "SET_CASH_OUT_AMOUNT" });
    dispatch({ type: "SET_BET_COUNTER_WIN"})
    const audio = new Audio(cashoutSoundEffect);
    audio.volume = 0.5;
    audio.play();
    if (!mineEncounter && reduxBetActive) {
      dispatch({ type: "SET_PROFIT_BOX", payload: true });
    } else {
      dispatch({ type: "SET_PROFIT_BOX", payload: false });
    }
  };

  const handleSetMines = (e) => {
    const selectedValue = parseInt(e.target.value, 10);
    setStateMineSet(selectedValue);
    dispatch({ type: "SET_MINE_COUNTER", payload: selectedValue });
  };

  useEffect(() => {
    localStorage.setItem("betAmount", betAmount);
  }, [betAmount]);

  // console.log("bet Active is ", betActive);

  useEffect(() => {
    if (betActive) {
      dispatch({ type: "SET_BET_COUNTER" });
      dispatch({ type: "SET_BET_COUNTER_WAGERED_AMOUNT", payload: betAmount});
    }
  }, [betActive]);
  return (
    <div className="bet">
      <div className="parent-manual">
        <h4 className="manual">Manual</h4>
      </div>
      <div className="bet-title">
        <li className="bet-title-child">Bet Amount</li>
        <li className="bet-title-child">{convertToBitcoin(betAmount)} BTC</li>
      </div>
      <div className="bet-amount">
        <div className="bet-amount-row-1">
          <input
            type="text"
            value={betAmount}
            onChange={handleBetAmount}
            onClick={handleBetClick}
            className={
              notEnoughBalance
                ? "bet-amount-input-notEnoughBalance bet-amount-input"
                : "bet-amount-input"
            }
            disabled={reduxBetActive}
          />
          <img src={rupeesSvg} alt="" className="rupeesSvg" />
        </div>
        <div className="bet-amount-row-2">
          <button className="bet-amount-btn" onClick={handleIncreaseByOneTwoX}>
            1/2x
          </button>
          <button
            className="bet-amount-btn left-border"
            onClick={handleIncreaseByTwoX}
          >
            2x
          </button>
        </div>
      </div>
      <h4 className="select-mines">Mines</h4>
      <select
        className="numberSelect"
        onChange={handleSetMines}
        value={mineCounter}
        disabled={reduxBetActive}
      >
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
        <h6 className="show-profit-text">Total profit ({profitMultiplier})x</h6>
        <h6 className="show-profit-text">{betProfit} BTC</h6>
      </div>
      <div className="profit-amount-div">
        <h4>{betProfit}</h4>
        <img src={rupeesSvg} alt="" className="rupeesSvg" />
      </div>
    </div>
  );
};

export default Bet;
