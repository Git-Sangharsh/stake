import React, { useEffect, useState } from "react";
import "./Register.css";
import CloseIcon from "@mui/icons-material/Close";
import LoginIcon from "@mui/icons-material/Login";
import { useDispatch, useSelector } from "react-redux";
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
  const [loginSuccess, setLoginSuccess] = useState(true);
  const [registerErr, setRegisterErr] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  // console.log("showVerificationInput is ", showVerificationInput);
  // console.log("routeToRegister is ", routeToRegister);
  // console.log("registerErr is", registerErr);

  const genrateVerificationCode = () => {
    const code = Math.floor(1000 + Math.random() * 9000); //genrating random number
    setVerificationCode(code);
  };

  const closeRegister = () => {
    dispatch({ type: "SET_VIEW_REGISTER", payload: false });
    setShowVerificationInput(false);
    setRouteToRegister(false);
    setLoginSuccess(false);
    setRegisterErr(false);
    setEmailValid(false);
  };

  const closeRegisterAfterSuccessSignIn = () => {
    dispatch({ type: "SET_VIEW_REGISTER", payload: false });
  };

  const handleEmailInput = (e) => {
    dispatch({ type: "SET_USER_EMAIL", payload: e.target.value });
    genrateVerificationCode(); // Generate the verification code
    setRegisterErr(false);
    setEmailValid(false);
  };

  const handleUsernameInput = (e) => {
    setInputUsername(e.target.value);
  };

  const handlePasswordInput = (e) => {
    setInputPassword(e.target.value);
  };

  const handleVerifyEmail = () => {
    const registerData = {
      sendVerifyEmail: userEmail,
      sendVerificationCode: verificationCode,
    };

    if (userEmail !== "" && userEmail.endsWith("@gmail.com")) {
      // Send userEmail to the backend
      axios
        .post("https://stakeserver.onrender.com/verifyemail", registerData)
        // .post("http://localhost:5000/verifyemail", registerData )
        .then((response) => {
          if (response.data.userEmailExist === "exist") {
            setRegisterErr(true);
            console.log("The UserEmail is registered");
          } else if (response.data.success) {
            setShowVerificationInput(true);
            setSeconds(120);
            setRegisterErr(false);
            // console.log(response.data);
          } else {
            console.log(
              "Error sending verification email:",
              response.data.error
            );
          }
        })
        .catch((error) => {
          console.error(
            "Error sending request to verifyemail endpoint:",
            error
          );
        });
    } else {
      console.log("Please enter your email address.");
      setEmailValid(true);
    }
  };
  // console.log("emailvalid ", emailValid)

  // console.log("verification code is ", verificationCode);
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
    const hashedPassword = await bcrypt.hash(inputPassword, 10);

    const registerData = {
      sendRegisterEmail: userEmail,
      sendRegisterUsername: inputUsername,
      sendRegisterPassword: hashedPassword,
      // sendRegisterPassword: inputPassword,
    };
    axios
      .post("https://stakeserver.onrender.com/register", registerData)
      // .post("http://localhost:5000/register", registerData)
      .then((res) => {
        console.log("res data is ", res.data);
        if (res.data.registerStatus === "success") {
          console.log(res.data.info);
          console.log("login success");
          dispatch({ type: "SET_LOG_IN", payload: true });
          setLoginSuccess(true);
        } else {
          console.log("else res data", res.data);
          console.log(res.data.info);
          console.log("register failed");
          dispatch({ type: "SET_LOG_IN", payload: false });
          setLoginSuccess(false);
        }
      })
      .catch((err) =>
        console.log("Error found while posting data in register endpoint", err)
      );
  };

  useEffect(() => {
    if (!login) {
      setLoginSuccess(false);
    }
  }, [login]);

  // console.log("login is ", login);
  // console.log("loginSucess is ", loginSuccess);
  // console.log("verification code is", verificationCode);

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
                  <LoginIcon className="wallet-icon close-icon" /> Register
                </h4>
                <CloseIcon
                  className="user-icon close-icon"
                  onClick={closeRegister}
                />
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
                      disabled={loginSuccess}
                    />
                  </div>
                  <div className="register-email-input-div">
                    <h3 className="register-email-input-header">Password</h3>
                    <input
                      type="password"
                      className="register-email-input"
                      onChange={handlePasswordInput}
                      disabled={loginSuccess}
                    />
                  </div>
                </div>
              )}

              {showVerificationInput ? (
                routeToRegister ? (
                  // onClick sending email, username and password
                  <div>
                    {loginSuccess ? (
                      <div
                        className="deposit-btn btn-green"
                        //  onClick={handleRegister}
                        onClick={closeRegisterAfterSuccessSignIn}
                      >
                        Done
                      </div>
                    ) : (
                      <div
                        className="deposit-btn btn-green"
                        onClick={handleRegister}
                      >
                        Register Account
                      </div>
                    )}

                    <h4 className="red-warning">
                      *Rememeber this website is still under construction
                    </h4>
                  </div>
                ) : (
                  <div
                    className="deposit-btn btn-green"
                    onClick={handleVerifyCodeBtn}
                  >
                    Verify
                  </div>
                )
              ) : (
                <div>
                  <div
                    className="deposit-btn btn-green"
                    onClick={handleVerifyEmail}
                  >
                    Verify Email
                  </div>
                  {registerErr && (
                    <motion.h1
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, ease: "easeIn" }}
                      className="red-warning registerErr"
                    >
                      Email is already in use try signin!
                    </motion.h1>
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
