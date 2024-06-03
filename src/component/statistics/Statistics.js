import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Statistics = () => {
  const userEmail = useSelector((state) => state.userEmail);
  const betCounter = useSelector((state) => state.betCounter);
  console.log("userEmail is ", userEmail);
  console.log("totalBet is ", betCounter);

  useEffect(() => {
    const betCounterObj = {
      userEmail: userEmail,
      betCounter: betCounter,
    };
    axios
      .post("https://stakeserver.onrender.com/betcounter", betCounterObj)
      .then((res) => console.log(res.data))
      .catch((err) =>
        console.log("error found on the Statistics Counter ", err)
      );
  }, [betCounter]);

  return <div></div>;
};

export default Statistics;
