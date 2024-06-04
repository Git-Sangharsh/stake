import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Statistics = () => {
  const userEmail = useSelector((state) => state.userEmail);
  const betCounter = useSelector((state) => state.betCounter);
  const betCounterWin = useSelector((state) => state.betCounterWin);
  const betCounterLoss = useSelector((state) => state.betCounterLoss);
  // const betCounterWageredAmount = useSelector((state) => state.betCounterWageredAmount)

  // console.log("userEmail is ", userEmail);
  // console.log("totalBet is ", betCounter);
  // console.log("betCounterWin is", betCounterWin);
  // console.log("betCounterLoss is", betCounterLoss);
  // console.log("betCounterWageredAmount is", betCounterWageredAmount);

  useEffect(() => {
    const betCounterObj = {
      userEmail: userEmail,
      betCounter: betCounter,
      betCounterWin: betCounterWin,
      betCounterLoss: betCounterLoss
    };
    axios
      .post("https://stakeserver.onrender.com/betcounter", betCounterObj)
      .then((res) => console.log(res.data))
      .catch((err) =>
        console.log("error found on the Statistics Counter ", err)
      );
  }, [betCounter, betCounterWin, betCounterLoss]);

  return <div></div>;
};

export default Statistics;