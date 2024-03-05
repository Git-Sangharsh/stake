import React, { useState } from "react";
import "./wallet.css";
import WalletIcon from "@mui/icons-material/Wallet";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import rupeesSvg from "../assets/rs.svg";
import loader from '../assets/loader.gif';

const Wallet = () => {
  const dispatch = useDispatch();
  const viewWallet = useSelector((state) => state.viewWallet);

  const [depositOrWithdraw, setDepositOrWithdraw] = useState(false);

  const [enableLoader, setEnableLoader] = useState(false);

  const handleDepositOrWithdraw = () => {
    setDepositOrWithdraw(!depositOrWithdraw);
  };

  const handleCloseWallet = () => {
    dispatch({ type: "SET_VIEW_WALLET", payload: false });
  };

  const handleLoader = () => {
    setEnableLoader(true);
  };


  return (
    <>
      {viewWallet && (
        <div className="wallet-blur-wrapper">
          <div className="wallet-wrapper">
            <div className="wallet-header">
              <div className="wallet-header-left">
                <WalletIcon className="wallet-icon" />
                <h4 className="wallet-title">Wallet</h4>
              </div>
              <CloseIcon className="close-icon" onClick={handleCloseWallet} />
            </div>
            <div className="parent-deposit-or-withdraw">
              <div className="deposit-or-withdraw">
                <h3
                  className={depositOrWithdraw ? "click" : "default"}
                  onClick={handleDepositOrWithdraw}
                >
                  Deposit
                </h3>
                <h3
                  className={depositOrWithdraw ? "default" : "click"}
                  onClick={handleDepositOrWithdraw}
                >
                  Withdraw
                </h3>
              </div>
            </div>
            <div className="parent-amount-conversion">
              <div className="amount-conversion">
                <img src={rupeesSvg} alt="" className="rupeesSvg" />
                <h4 className="inr">INR</h4>
              </div>
            </div>
            <p className="paragraph">
              Stake will require you to enter and verify your Aadhaar number
              before transacting with INR. For INR withdrawals, you must use a
              bank account in your personal name. Attempting to withdraw through
              another bank account not in your name can lead to INR withdrawals
              being revoked.
            </p>
            {
              enableLoader ?
              <div className="parent-gif">
                <img src={loader} alt="" className="deposit-btn load-gif"/>
              </div>
              :
              <h1 className="deposit-btn" onClick={handleLoader}>Deposit</h1>
            }
          </div>
        </div>
      )}
    </>
  );
};

export default Wallet;
