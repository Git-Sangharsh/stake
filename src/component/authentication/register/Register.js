import React, { useEffect, useState } from "react";
import "./Register.css";
import CloseIcon from "@mui/icons-material/Close";
import LoginIcon from "@mui/icons-material/Login";
import { useDispatch, useSelector } from "react-redux";
// import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";

const Register = () => {
  const dispatch = useDispatch();
  const viewRegister = useSelector((state) => state.viewRegister);
  const userEmail = useSelector((state) => state.userEmail);
  console.log("userEmail is ", userEmail);

  const [inputEmail, setInputEmail] = useState("");
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [inputVerifyCode, setInputVerifyCode] = useState("");
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [routeToRegister, setRouteToRegister] = useState(false);

  const genrateVerificationCode = () => {
    const code = Math.floor(1000 + Math.random() * 9000); //genrating random number
    setVerificationCode(code);
  };

  const closeRegister = () => {
    dispatch({ type: "SET_VIEW_REGISTER", payload: false });
  };

  const handleEmailInput = (e) => {
    dispatch({ type:"SET_USER_EMAIL", payload: e.target.value});
    genrateVerificationCode(); // Generate the verification code
  };

  const handleUsernameInput = (e) => {
    setInputUsername(e.target.value);
  }

  const handlePasswordInput = (e) => {
    setInputPassword(e.target.value);
  }

  const handleVerifyEmail = () => {
    if (userEmail !== "") {
      // Your existing logic for sending verification code (uncomment here)
      //   .send(
      //     "service_kkmh1u7",
      //     "template_atl8jmp",
      //     {
      //       email: userEmail,
      //       message: `Your verification code is: ${verificationCode}`,
      //     },
      //     "GAP3a0IvtBETeKKPw"
      //   )
      //   .then(
      //     (result) => {
      //       if (userEmail !== "") {
      //         setShowVerificationInput(true);
      //       }
      //       setInputEmail("");
      // dispatch({ type:"SET_USER_EMAIL", payload: e.target.value});
      //     },
      //     (error) => {
      //       console.log(error, error.text);
      //     }
      //   );

      if (userEmail !== "") {
        setShowVerificationInput(true);
      }
    } else {
      console.log("Please enter your email address.");
    }
  };


  console.log("verification code is ", verificationCode);

  const handleVerifyInput = (e) => {
    setInputVerifyCode(parseInt(e.target.value)); // Converting input value to number
  };

  //   console.log( typeof inputVerifyCode)
  const handleVerifyCodeBtn = () => {
    if (inputVerifyCode === verificationCode) {
      setRouteToRegister(true);
    } else {
      setRouteToRegister(false);
    }
  };

  const handleRegister = () => {
    console.log("input email is ", userEmail , inputUsername, inputPassword)
  };

  // console.log("input email is ",inputEmail)

  // useEffect(() => {
  //   console.log("inputEmail has changed:", inputEmail);
  // }, [inputEmail]);

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
                  <LoginIcon className="wallet-icon" /> Sign In
                </h4>
                <CloseIcon className="user-icon" onClick={closeRegister} />
              </div>
              <div className="register-email-input-div">
                <h3 className="register-email-input-header">Email</h3>
                <input
                  type="text"
                  id="emailForm"
                  className="register-email-input"
                  onChange={handleEmailInput}
                  // disabled={showVerificationInput}
                  style={{ pointerEvents: showVerificationInput ? "none" : "auto" }}
                />
              </div>
              {/* after sending verfication code on email */}
              {showVerificationInput && (
                <div className="register-email-input-div">
                  <h3 className="register-email-input-header">
                    Verification Code
                  </h3>
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
                  <div className="deposit-btn" onClick={handleRegister}>
                    Register
                  </div>
                ) : (
                  <div className="deposit-btn" onClick={handleVerifyCodeBtn}>
                    Verify
                  </div>
                )
              ) : (
                <div className="deposit-btn" onClick={handleVerifyEmail}>
                  Verify before otp
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
