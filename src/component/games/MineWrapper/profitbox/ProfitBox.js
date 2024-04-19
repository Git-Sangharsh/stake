import React from "react";
import './ProfitBox.css';
import { useSelector } from "react-redux";

const ProfitBox = () => {
  const reduxBetAmount = useSelector((state) => state.betAmount);
  const profitMultiplier = useSelector((state) => state.profitMultiplier);
  const profitBox = useSelector((state) =>  state.profitBox);
  // console.log("reduxBetAmount is ", reduxBetAmount);
  // console.log("profitMultiplier is ", profitMultiplier);
  // console.log("profitBox is ", profitBox);

  return <div>
    {profitBox && (
            <div className="profit-box">
                <h1>{profitMultiplier}x</h1>
                <div className="brdr"></div>
                <h1>₹{(profitMultiplier * reduxBetAmount).toFixed(2)}</h1>
            </div>
    )}
  </div>;
};

export default ProfitBox;
