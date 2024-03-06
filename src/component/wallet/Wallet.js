import React, { useEffect, useState } from "react";
import "./wallet.css";
import WalletIcon from "@mui/icons-material/Wallet";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import rupeesSvg from "../assets/rs.svg";
import upiImg from "../assets/upi-img.png";

const Wallet = () => {
  const dispatch = useDispatch();
  const viewWallet = useSelector((state) => state.viewWallet);

  const [depositOrWithdraw, setDepositOrWithdraw] = useState(false);
  const [routeDeposit, setRouteDeposit] = useState(false);
  const [AmountBtn, setAmountBtn] = useState(false);

  const handleDepositOrWithdraw = () => {
    setDepositOrWithdraw(!depositOrWithdraw);
  };

  const handleCloseWallet = () => {
    dispatch({ type: "SET_VIEW_WALLET", payload: false });
    setRouteDeposit(false);
  };

  const handleRouteDeposit = () => {
    setRouteDeposit(true);
  };

  const [selectedAmount, setSelectedAmount] = useState(0);

  const handleAmountClick = (amount) => {
    setSelectedAmount(amount);
    setAmountBtn(true);
  };

  const handleEnterAmount = (e) => {
    const input = e.target.value;
    if (!isNaN(input) || input === "") {
      setSelectedAmount(input);
    }
  };

  const handleAmountToZero = () => {
    setSelectedAmount("");
  };

  useEffect (() => {
    if (selectedAmount.length > 0 && !selectedAmount.startsWith('0') ) {
      setAmountBtn(true)
    } else if( selectedAmount.length === 0){
      setAmountBtn(false)
    }
  }, [selectedAmount, AmountBtn])

  // console.log("amount btn is ", AmountBtn)
  // console.log('selectedAmount length is ', selectedAmount.length);


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

            {/* wrap this shit */}
            {routeDeposit ? (
              <div className="route-deposit-div">
            <div className="upi-style">
              <h4 className="upi-title">⚪ UPI</h4>
              <img src={upiImg} alt="" className="upi-img" />
            </div>
            <div className="default-amount-div">
              <h1
                className={`default-amount ${
                  selectedAmount === 500 ? "default-amount-click" : ""
                }`}
                onClick={() => handleAmountClick(500)}
              >
                500
              </h1>
              <h1
                className={`default-amount ${
                  selectedAmount === 5000 ? "default-amount-click" : ""
                }`}
                onClick={() => handleAmountClick(5000)}
              >
                5,000
              </h1>
              <h1
                className={`default-amount ${
                  selectedAmount === 30000 ? "default-amount-click" : ""
                }`}
                onClick={() => handleAmountClick(30000)}
              >
                30,000
              </h1>
            </div>
            <div className="amount-input-div">
              <h6 className="amount-input-header">Amount</h6>
              <input
                type="text"
                className="amount-input"
                value={selectedAmount}
                onChange={handleEnterAmount}
                onClick={handleAmountToZero}
              />
            </div>
            <h3 className="minimum-text">Minimum : ₹500 | Maximum : ₹49,999</h3>
            {AmountBtn && (
              <div className="final-amount">
                <h5 className="final-amount-header">Total</h5>
                <h5 className="final-amount-header">₹ {selectedAmount}</h5>
              </div>
            )}

            <button className={`set-amount ${AmountBtn ? "before-set-amount" : ""}`}>
                Set amount
            </button>

            </div>
            ) : (
              <h1 className="deposit-btn" onClick={handleRouteDeposit}>
              Deposit
            </h1>
            )}

          </div>
        </div>
      )}
    </>
  );
};

export default Wallet;
