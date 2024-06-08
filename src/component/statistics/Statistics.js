import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import "./Statistics.css";

const Statistics = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.userEmail);
  const betCounter = useSelector((state) => state.betCounter);
  const betCounterWin = useSelector((state) => state.betCounterWin);
  const betCounterLoss = useSelector((state) => state.betCounterLoss);
  const betCounterWagered = useSelector((state) => state.betCounterWagered);
  const login = useSelector((state) => state.login);
  const walletBalance = useSelector((state) => state.walletBalance);
  const viewStatistics = useSelector((state) => state.viewStatistics);

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
        walletBalance: Number(walletBalance),
      };
      axios
        .post("https://stakeserver.onrender.com/betcounter", betCounterObj)
        .then((res) => console.log(res.data))
        .catch((err) =>
          console.log("error found on the Statistics Counter ", err)
        );
    }
  }, [userEmail, betCounter, betCounterWin, betCounterLoss, betCounterWagered]);

  const handleCloseStatistics = () => {
    dispatch({ type: "SET_VIEW_STATISTICS", payload: false });
  };
  return (
    <AnimatePresence>
      {viewStatistics && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, ease: "easeIn" }}
          exit={{ opacity: 0 }}
        >
          <div className="wallet-blur-wrapper">
            <div className="wallet-wrapper">
              <div className="wallet-header">
                <div className="wallet-header-left">
                  <AnalyticsIcon className="wallet-icon" />
                  <h4 className="wallet-title">Statistics</h4>
                </div>
                <CloseIcon
                  className="close-icon"
                  onClick={handleCloseStatistics}
                />
              </div>
              <div className="all-statistics">
                <div className="card-statistics">
                  <h4 className="card-statistics-header">Total Bets</h4>
                  <h3 className="card-statistics-number">{betCounter}</h3>
                </div>
                <div className="card-statistics">
                  <h4 className="card-statistics-header">Number Of Wins</h4>
                  <h3 className="card-statistics-number">{betCounterWin}</h3>
                </div>
                <div className="card-statistics">
                  <h4 className="card-statistics-header">Number of Losses</h4>
                  <h3 className="card-statistics-number">{betCounterLoss}</h3>
                </div>
                <div className="card-statistics">
                  <h4 className="card-statistics-header">Wagered</h4>
                  <h3 className="card-statistics-number">{betCounterWagered}</h3>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Statistics;
