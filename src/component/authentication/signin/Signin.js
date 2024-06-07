import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Signin.css";
import "../register/Register.css";
import CloseIcon from "@mui/icons-material/Close";
import LoginIcon from "@mui/icons-material/Login";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
const Signin = () => {
  const dispatch = useDispatch();
  const viewSignin = useSelector((state) => state.viewSignin);
  const [emailInput, setEmailInput] = useState("");
  const [passInput, setPassInput] = useState("");

  const closeSignIn = () => {
    dispatch({ type: "SET_VIEW_SIGNIN", payload: false });
    if (viewSignin) {
      dispatch({ type: "SET_VIEW_REGISTER", payload: false });
    }
  };

  const handleEmailInput = (e) => {
    setEmailInput(e.target.value);
  };

  const handlePassInput = (e) => {
    setPassInput(e.target.value);
  };
  const handleSigninBtn = async () => {
    const userSignObj = {
      sendSignEmail: emailInput,
      sendSignPass: passInput,
    };

    try {
      const res = await axios.post("https://stakeserver.onrender.com/signin", userSignObj);
      if (res.data.status === true) {
        console.log("login successful");
        dispatch({ type: "SET_LOG_IN", payload: true });

        const response = await axios.get("https://stakeserver.onrender.com/betCounter", {
          params: { userEmail: emailInput } // Note: Use an object for params
        });

        console.log("Statistics Are", response.data);

        dispatch({ type: "SET_BET_COUNTER_VALUE", payload: response.data.betCounter });
        dispatch({ type: "SET_BET_COUNTER_WIN_VALUE", payload: response.data.betCounterWin });
        dispatch({ type: "SET_BET_COUNTER_LOSS_VALUE", payload: response.data.betCounterLoss });
        dispatch({ type: "SET_BET_COUNTER_WAGERED_VALUE", payload: response.data.betCounterWagered });
      }
    } catch (err) {
      console.log("error found on the sign in post ", err);
    }
  };

  const login = useSelector((state) => state.login);
  console.log("from sign in login is ", login);
  return (
    <>
      <AnimatePresence>
        {viewSignin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, ease: "easeIn" }}
            exit={{ opacity: 0 }}
            className="register-blur-wrapper"
          >
            <div className="register-wrapper">
              <div className="register-header">
                <h4 className="signin-header">
                  <LoginIcon className="wallet-icon close-icon" /> Sign In
                </h4>
                <CloseIcon
                  className="user-icon close-icon"
                  onClick={closeSignIn}
                />
              </div>
              <div className="register-email-input-div">
                <h3 className="register-email-input-header">Email</h3>
                <input
                  type="email"
                  id="emailForm"
                  className="register-email-input"
                  onChange={handleEmailInput}
                  // disabled={showVerificationInput}
                  //   style={{
                  //     pointerEvents: showVerificationInput ? "none" : "auto",
                  //   }}
                />
              </div>
              <div className="register-email-input-div">
                <h3 className="register-email-input-header">Password</h3>
                <input
                  type="password"
                  id="emailForm"
                  className="register-email-input"
                  onChange={handlePassInput}
                />
              </div>
              {login ? (
                <button
                  className="deposit-btn btn-green btn-padding"
                  onClick={closeSignIn}
                >
                  Done
                </button>
              ) : (
                <button
                  className="deposit-btn btn-green btn-padding"
                  onClick={handleSigninBtn}
                >
                  Sign In
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Signin;
