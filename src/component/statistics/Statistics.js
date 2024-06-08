import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Statistics = () => {
  const userEmail = useSelector((state) => state.userEmail);
  const betCounter = useSelector((state) => state.betCounter);
  const betCounterWin = useSelector((state) => state.betCounterWin);
  const betCounterLoss = useSelector((state) => state.betCounterLoss);
  const betCounterWagered = useSelector((state) => state.betCounterWagered);

  const login = useSelector((state) => state.login);
  const walletBalance = useSelector((state) => state.walletBalance);

  // console.log("userEmail is ", userEmail);
  // console.log("betCounter is ", betCounter);
  // console.log("betCounterWin is", betCounterWin);
  // console.log("betCounterLoss is", betCounterLoss);
  // console.log("betCounterWagered is", betCounterWagered);
  // console.log("login is ", login);
  console.log("walletBalance is ", walletBalance);

  useEffect(() => {
    if (login) {
      const betCounterObj = {
        userEmail: userEmail,
        betCounter: betCounter,
        betCounterWin: betCounterWin,
        betCounterLoss: betCounterLoss,
        betCounterWagered: betCounterWagered,
        walletBalance: Number(walletBalance)
      };
      axios
        .post("https://stakeserver.onrender.com/betcounter", betCounterObj)
        .then((res) => console.log(res.data))
        .catch((err) =>
          console.log("error found on the Statistics Counter ", err)
        );
    }
  }, [userEmail, betCounter, betCounterWin, betCounterLoss, betCounterWagered]);

  return <div></div>;
};

export default Statistics;
