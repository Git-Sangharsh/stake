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

  // console.log("userEmail is ", userEmail);
  // console.log("betCounter is ", betCounter);
  // console.log("betCounterWin is", betCounterWin);
  // console.log("betCounterLoss is", betCounterLoss);
  // console.log("betCounterWagered is", betCounterWagered);
  // console.log("login is ", login);

  useEffect(() => {
    if (login) {
      const betCounterObj = {
        userEmail: userEmail,
        betCounter: betCounter,
        betCounterWin: betCounterWin,
        betCounterLoss: betCounterLoss,
        betCounterWagered: betCounterWagered,
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
