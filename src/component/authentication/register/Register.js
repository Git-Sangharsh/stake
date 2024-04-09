import React, { useEffect, useState } from "react";
import "./Register.css";
import CloseIcon from "@mui/icons-material/Close";
import LoginIcon from "@mui/icons-material/Login";
import { useDispatch, useSelector } from "react-redux";
import emailjs from "@emailjs/browser";

const Register = () => {
  const dispatch = useDispatch();

  const viewRegister = useSelector((state) => state.viewRegister);

  const [inputEmail, setInputEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [inputVerifyCode, setInputVerifyCode] = useState("");
  const [showVerificationInput, setShowVerificationInput] = useState(false);

  const genrateVerificationCode = () => {
    const code = Math.floor(1000 + Math.random() * 9000); //genrating random number
    setVerificationCode(code);
  };

  const closeRegister = () => {
    dispatch({ type: "SET_VIEW_REGISTER", payload: false });
  };

  const handleEmailInput = (e) => {
    setInputEmail(e.target.value);
    genrateVerificationCode(); // Generate the verification code
  };

  const handleVerifyEmail = () => {
    if (inputEmail !== "") {
      emailjs
        .send(
          "service_kkmh1u7",
          "template_atl8jmp",
          {
            email: inputEmail,
            message: `Your verification code is: ${verificationCode}`,
          },
          "GAP3a0IvtBETeKKPw"
        )
        .then(
          (result) => {
            if (inputEmail !== "") {
              setShowVerificationInput(true);
            }
            setInputEmail("");
          },
          (error) => {
            console.log(error, error.text);
          }
        );
    } else {
      console.log("showVerificationInput is true");
      console.log(showVerificationInput);
    }
  };

  console.log("verification code is ",  verificationCode)

  const handleVerifyInput = (e) => {
    setInputVerifyCode(parseInt(e.target.value)); // Converting input value to number
  }


//   console.log( typeof inputVerifyCode)
    const handleVerifyCodeBtn = () => {
    if(inputVerifyCode == verificationCode){
        console.log("verification code is successfully working");
    }else{
        console.log("verification code is successfully not working");
    }
    console.log("u click on real verification code")
}

  return (
    <>
      {viewRegister && (
        <div className="register-blur-wrapper">
          <div className="register-wrapper">
            <div className="register-header">
              <h4 className="signin-header">
                {" "}
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
                disabled={showVerificationInput}
              />
            </div>
            {showVerificationInput && (
              <div className="register-email-input-div">
                <h3 className="register-email-input-header">
                  Verification Code
                </h3>
                <input type="number" className="register-email-input" onChange={handleVerifyInput}/>
              </div>
            )}
            {showVerificationInput ? (
              <div className="deposit-btn" onClick={handleVerifyCodeBtn}>
                Verify
              </div>
            ) : (
              <div className="deposit-btn" onClick={handleVerifyEmail}>
                Verify
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
