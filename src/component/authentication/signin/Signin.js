import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Signin.css";
import "../register/Register.css";
import CloseIcon from "@mui/icons-material/Close";
import LoginIcon from "@mui/icons-material/Login";
const Signin = () => {
  const viewSignin = useSelector((state) => state.viewSignin);
  console.log("", viewSignin);
  const [emailInput, setEmailInput] = useState("");

  const closeSignIn = () => {

  }

  const handleEmailInput = (e) => {
    setEmailInput(e.target.value)
  }

  return (
    <>
      {viewSignin && (
        <div className="register-blur-wrapper">
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
                  onChange={handleEmailInput}
                />
              </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Signin;
