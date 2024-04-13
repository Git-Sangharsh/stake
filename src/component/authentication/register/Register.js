import React, { useEffect, useState } from "react";
import "./Register.css";
import CloseIcon from "@mui/icons-material/Close";
import LoginIcon from "@mui/icons-material/Login";
import { useDispatch, useSelector } from "react-redux";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import bcrypt from "bcryptjs";

const Register = () => {
  const dispatch = useDispatch();
  const viewRegister = useSelector((state) => state.viewRegister);
  const userEmail = useSelector((state) => state.userEmail);
  const login = useSelector((state) => state.login);
  // console.log('login status is ', login);

  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [inputVerifyCode, setInputVerifyCode] = useState("");
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [routeToRegister, setRouteToRegister] = useState(false);
  const [seconds, setSeconds] = useState(120);

  console.log("showVerificationInput is ", showVerificationInput);
  console.log("routeToRegister is ", routeToRegister);

  const genrateVerificationCode = () => {
    const code = Math.floor(1000 + Math.random() * 9000); //genrating random number
    setVerificationCode(code);
  };

  const closeRegister = () => {
    dispatch({ type: "SET_VIEW_REGISTER", payload: false });
    console.log("closing icon");
    setShowVerificationInput(false);
    setRouteToRegister(false);
  };

  const handleEmailInput = (e) => {
    dispatch({ type: "SET_USER_EMAIL", payload: e.target.value });
    genrateVerificationCode(); // Generate the verification code
  };

  const handleUsernameInput = (e) => {
    setInputUsername(e.target.value);
  };

  const handlePasswordInput = (e) => {
    setInputPassword(e.target.value);
  };

  const handleVerifyEmail = () => {
    if (userEmail !== "") {
      emailjs
        .send(
          "service_kkmh1u7",
          "template_atl8jmp",
          {
            email: userEmail,
            message: `Your verification code is: ${verificationCode}`,
          },
          "GAP3a0IvtBETeKKPw"
        )
        .then(
          (result) => {
            if (userEmail !== "") {
              setShowVerificationInput(true);
            }
          },
          (error) => {
            console.log(error, error.text);
          }
        );

      if (userEmail !== "") {
        setShowVerificationInput(true);
        setShowVerificationInput(true);
        setSeconds(120);
      }
    } else {
      console.log("Please enter your email address.");
    }
  };

  console.log("verification code is ", verificationCode);
  // console.log("seconds left is ", seconds);

  const handleVerifyInput = (e) => {
    setInputVerifyCode(parseInt(e.target.value)); // Converting input value to number
  };

  //   console.log( typeof inputVerifyCode)
  const handleVerifyCodeBtn = () => {
    if (inputVerifyCode === verificationCode) {
      setRouteToRegister(true);
      console.log("this verification code is true");
    } else {
      setRouteToRegister(false);
    }
  };

  useEffect(() => {
    if (showVerificationInput && !routeToRegister) {
      const timer = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds > 1) {
            return prevSeconds - 1;
          } else {
            clearInterval(timer); // Stopping the timer
            setTimeout(() => {
              setShowVerificationInput(false); // Set showVerificationInput to false after 10 seconds
              console.log(
                "showVerificationInput set to false after 10 seconds"
              );
            }, 0);
            return 0;
          }
        });
      }, 1000);

      return () => clearInterval(timer); // Cleanup function to clear interval when component unmounts
    }
  }, [showVerificationInput, routeToRegister]);

  const handleRegister = async () => {
    // console.log("login status is ", login);
    // gonna replace with render server domain
    // console.log("input email is ", userEmail, inputUsername, inputPassword);

    const hashedPassword = await bcrypt.hash(inputPassword, 10);

    const registerData = {
      sendRegisterEmail: userEmail,
      sendRegisterUsername: inputUsername,
      sendRegisterPassword: hashedPassword,
    };
    axios
      .post("https://stakeserver.onrender.com/register", registerData)
      .then((res) => {
        if (res.data.registerStatus === true) {
          console.log(res.data.info);
          dispatch({ type: "SET_LOG_IN", payload: true });
        } else {
          console.log("register failed");
          dispatch({ type: "SET_LOG_IN", payload: false });
        }
      })
      .catch((err) =>
        console.log("Error found while posting data in register endpoint", err)
      );
  };

  console.log("login is ", login);
  return (
    <>
      <AnimatePresence>
        {viewRegister && (
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
                <CloseIcon className="user-icon close-icon" onClick={closeRegister} />
              </div>
              <div className="register-email-input-div">
                <h3 className="register-email-input-header">Email</h3>
                <input
                  type="text"
                  id="emailForm"
                  className="register-email-input"
                  onChange={handleEmailInput}
                  // disabled={showVerificationInput}
                  style={{
                    pointerEvents: showVerificationInput ? "none" : "auto",
                  }}
                />
              </div>
              {/* after sending verfication code on email */}
              {showVerificationInput && (
                <div className="register-email-input-div">
                  {!routeToRegister ? (
                    <h3 className="register-email-input-header">
                      Verification Code
                      {seconds > 0 ? `Timer: ${seconds} sec` : "Time expired"}
                    </h3>
                  ) : (
                    <h3 className="register-email-input-header">
                      Verification Code
                    </h3>
                  )}
                  <input
                    type="number"
                    className="register-email-input"
                    onChange={handleVerifyInput}
                    disabled={routeToRegister}
                  />
                </div>
              )}
              {/* after showing this after verification of otp is correct */}
              {routeToRegister && (
                <div className="register-wrapper-username-password">
                  <div className="register-email-input-div">
                    <h3 className="register-email-input-header">Username</h3>
                    <input
                      type="text"
                      className="register-email-input"
                      onChange={handleUsernameInput}
                    />
                  </div>
                  <div className="register-email-input-div">
                    <h3 className="register-email-input-header">Password</h3>
                    <input
                      type="password"
                      className="register-email-input"
                      onChange={handlePasswordInput}
                    />
                  </div>
                </div>
              )}

              {showVerificationInput ? (
                routeToRegister ? (
                  // onClick sending email, username and password
                  <div>
                    <div className="deposit-btn btn-green" onClick={handleRegister}>
                      Register
                    </div>
                    <h4 className="red">*Rememeber this website is still under construction</h4 >
                  </div>
                ) : (
                  <div className="deposit-btn btn-green" onClick={handleVerifyCodeBtn}>
                    Verify
                  </div>
                )
              ) : (
                <div className="deposit-btn btn-green" onClick={handleVerifyEmail}>
                  Verify Email
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Register;
