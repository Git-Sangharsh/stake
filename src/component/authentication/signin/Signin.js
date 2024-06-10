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
  const [emailValid, setEmailValid] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);

  const closeSignIn = () => {
    dispatch({ type: "SET_VIEW_SIGNIN", payload: false });
    if (viewSignin) {
      dispatch({ type: "SET_VIEW_REGISTER", payload: false });
    }
    setEmailValid(false);
    setPasswordErr(false);
  };

  const handleEmailInput = (e) => {
    setEmailInput(e.target.value);
    setEmailValid(false);
  };

  const handlePassInput = (e) => {
    setPassInput(e.target.value);
    setPasswordErr(false);
  };
  const handleSigninBtn = async () => {
    const userSignObj = {
      sendSignEmail: emailInput,
      sendSignPass: passInput,
    };
    if (
      typeof emailInput === "string" &&
      emailInput !== "" &&
      emailInput.endsWith("@gmail.com")
    ) {
      try {
        const res = await axios.post(
          "https://stakeserver.onrender.com/signin",
          userSignObj
        );
        console.log(res.data);
        if (res.data.status === true) {
          console.log("login successful");
          dispatch({ type: "SET_LOG_IN", payload: true });

          const response = await axios.get(
            "https://stakeserver.onrender.com/betCounter",
            {
              params: { userEmail: emailInput }, // Note: Use an object for params
            }
          );
          console.log("Statistics Are", response.data);
          dispatch({
            type: "GET_SET_WALLETBALANCE",
            payload: response.data.walletBalance,
          });
          dispatch({
            type: "GET_SET_BET_COUNTER",
            payload: response.data.betCounter,
          });
          dispatch({
            type: "GET_SET_BET_COUNTER_WIN",
            payload: response.data.betCounterWin,
          });
          dispatch({
            type: "GET_SET_BET_COUNTER_LOSS",
            payload: response.data.betCounterLoss,
          });
          dispatch({
            type: "GET_SET_BET_COUNTER_WAGERED_AMOUNT",
            payload: response.data.betCounterWagered,
          });
        } else if (res.data.password === false) {
          setPasswordErr(true);
        }
      } catch (err) {
        console.log("error found on the sign in post ", err);
      }
    } else {
      console.log("Email is not valid");
      setEmailValid(true);
    }
  };

  const login = useSelector((state) => state.login);
  // console.log("from sign in login is ", login);
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
              {emailValid && (
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeIn" }}
                  className="red-warning registerErr"
                >
                  Email is Invalid!
                </motion.h1>
              )}
              {passwordErr && (
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeIn" }}
                  className="red-warning registerErr"
                >
                  Wrong Password!
                </motion.h1>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Signin;
