import React, { useEffect, useState } from "react";
import "./DiceBet.css";
import rupeesSvg from "../../../assets/rs.svg";
import { useDispatch, useSelector } from "react-redux";
import betSoundEffect from "../../../audio/betSoundEffect.mp3";

const DiceBet = () => {
  const dispatch = useDispatch();
  const walletBalance = useSelector((state) => state.walletBalance);
  // const reduxBetActive = useSelector((state) => state.betActive);
  const diceBetActice = useSelector((state) => state.diceBetActive);
  const betProfit = useSelector((state) => state.profitFromBet).toFixed(2);
  const profitMultiplier = useSelector((state) => state.profitMultiplier);
  const notEnoughBalance = useSelector((state) => state.notEnoughBalance);
  const diceEstimatedProfit = useSelector((state) => state.diceEstimatedProfit);
  const betCounter = useSelector((state) => state.betCounter);

  const [betAmount, setBetAmount] = useState(10);
  const [showEstimatedProfit, setShowEstimatedProfit] = useState("669");

  const handleBetAmount = (e) => {
    const input = parseInt(e.target.value);
    if (!isNaN(input) || input === "") {
      setBetAmount(input);
      // dispatch({ type: "SET_BET_AMOUNT", payload: input });
    }
  };

  const handleBetClick = () => {
    setBetAmount("");
    // dispatch({ type: "SET_BET_AMOUNT", payload: "" });
  };

  const handleIncreaseByOneTwoX = () => {
    const halfAmount = parseFloat(betAmount) / 2;
    if (halfAmount < 1) {
      setBetAmount(0);
    } else {
      setBetAmount(halfAmount);
    }
  };

  const handleIncreaseByTwoX = () => {
    const multipliedAmount = parseFloat(betAmount) * 2;
    if (multipliedAmount > walletBalance) {
      setBetAmount(walletBalance);
    } else {
      setBetAmount(multipliedAmount);
    }
    console.log(multipliedAmount);
  };

  // console.log("betAmount: ", betAmount)
  // console.log("walletBalance: ", walletBalance)

  const handleBet = () => {
    // if (betAmount.toString().startsWith("0") || betAmount === "") {
    if (betAmount.toString().startsWith("0") || betAmount === "") {
      console.log("bet starting with zero value");
      dispatch({ type: "SET_DICE_BET_ACTIVE", payload: false });
    } else if (betAmount > walletBalance) {
      console.log("not enough balance in wallet");
      dispatch({ type: "SET_NOT_ENOUGH_BALANCE", payload: true });
    } else {
      const audio = new Audio(betSoundEffect);
      audio.volume = 0.4;
      audio.play();
      dispatch({ type: "SET_BET_AMOUNT", payload: betAmount });
      dispatch({ type: "SET_DICE_BET_ACTIVE", payload: true });
      dispatch({ type: "SET_NOT_ENOUGH_BALANCE", payload: false });
      dispatch({ type: "SET_BET_COUNTER" });
      dispatch({ type: "SET_BET_COUNTER_WAGERED_AMOUNT", payload: betAmount})
    }
  };

  useEffect(() => {
    setShowEstimatedProfit(betAmount * diceEstimatedProfit);
  }, [betAmount, diceEstimatedProfit]);


  return (
    // <div className="bet limbo-bet dice-bet">
    <div className="bet dice-bet">
      <div className="parent-manual">
        <h4 className="manual">Manual</h4>
      </div>
      <div className="bet-title">
        <li className="bet-title-child">Bet Amount</li>
        <li className="bet-title-child">00 BTC</li>
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
            disabled={diceBetActice}
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

      {diceBetActice ? (
        <h1 className="disabled-bet-btn">Bet</h1>
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
        <h4>{showEstimatedProfit}</h4>
        <img src={rupeesSvg} alt="" className="rupeesSvg" />
      </div>
    </div>
  );
};

export default DiceBet;
