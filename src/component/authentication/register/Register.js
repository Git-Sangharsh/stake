import React, { useState } from "react";
import "./Register.css";
import CloseIcon from "@mui/icons-material/Close";
import LoginIcon from '@mui/icons-material/Login';
import { useDispatch, useSelector } from "react-redux";
import emailjs from "@emailjs/browser";


const Register = () => {
    const dispatch = useDispatch();
    const viewRegister = useSelector((state) => state.viewRegister);

    const [inputEmail, setInputEmail] = useState("");


    const closeRegister = () => {
        dispatch({ type: "SET_VIEW_REGISTER", payload: false });
    };

    const handleEmailInput = (e) => {
        setInputEmail(e.target.value);
    }

    const handleVerifyEmail = () => {
        console.log(inputEmail)
        emailjs
        .send(
            "service_kkmh1u7",
            "template_atl8jmp",
            { email: inputEmail, message: "This Shit Is working" },
            "GAP3a0IvtBETeKKPw"
        )
        .then(
            (result) => {
                console.log(result.text);
                alert("Email Sent");
                setInputEmail("");
            },
            (error) => {
                console.log(error, error.text);
            }
        );
    }
  return (
    <>
      {viewRegister && (
        <div className="register-blur-wrapper">
          <div className="register-wrapper">
            <div className="register-header">
              <h4 className="signin-header"> <LoginIcon className="wallet-icon"/> Sign In</h4>
              <CloseIcon className="user-icon" onClick={closeRegister} />
            </div>
            <div className="register-email-input-div">
              <h3 className="register-email-input-header">Email</h3>
              <input type="text" id="emailForm" className="register-email-input" onChange={handleEmailInput}/>
            </div>
            {/* <div className="register-email-input-div">
              <h3 className="register-email-input-header">Verification Code</h3>
              <input type="text" className="register-email-input" />
            </div> */}
            <div className="deposit-btn" onClick={handleVerifyEmail}>Verify</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
