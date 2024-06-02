import React, { useEffect, useState } from "react";
import "./wallet.css";
import WalletIcon from "@mui/icons-material/Wallet";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import rupeesSvg from "../assets/rs.svg";
import upiImg from "../assets/upi-img.png";
import { MoonLoader } from "react-spinners";
import { motion, AnimatePresence } from "framer-motion";

const Wallet = () => {
  const dispatch = useDispatch();
  const viewWallet = useSelector((state) => state.viewWallet);
  // console.log("view Wallet is ", viewWallet);
  // const profitBox = useSelector((state) => state.profitBox);
  // console.log("profitBox is ", profitBox);
  // console.log("viewWallet is ", viewWallet);
  // const walletBalance = useSelector((state) => state.walletBalance);
  // console.log('walletBalance', walletBalance)

  const [depositOrWithdraw, setDepositOrWithdraw] = useState(false);
  const [routeDeposit, setRouteDeposit] = useState(false);
  const [AmountBtn, setAmountBtn] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showLoaderWhileSetAmount, setshowLoaderWhileSetAmount] =
    useState(false);
  const [minimumDeposit, setMinimumDeposit] = useState(false);
  useEffect(() => {
    if (viewWallet) {
      document.body.classList.add("walletOpen");
    } else {
      document.body.classList.remove("walletOpen");
    }
  }, [viewWallet]);

  const handleDepositOrWithdraw = () => {
    setDepositOrWithdraw(!depositOrWithdraw);
  };

  const handleCloseWallet = () => {
    dispatch({ type: "SET_VIEW_WALLET", payload: false });
    setRouteDeposit(false);
  };

  const handleRouteDeposit = () => {
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
      // console.log("show loader is ", showLoader);
      setTimeout(() => {
        setRouteDeposit(true);
      }, 0);
    }, 2000);
  };

  const handleAddMoneyInWallet = () => {
    if (selectedAmount >= 500) {
      setshowLoaderWhileSetAmount(true);
      setTimeout(() => {
        setshowLoaderWhileSetAmount(false);
        setTimeout(() => {
          const amountToAdd = parseFloat(selectedAmount);
          dispatch({ type: "SET_WALLET_BALANCE", payload: amountToAdd });
        }, 0);
      }, 2000);
    } else {
      console.log("this thing is not working");
      setMinimumDeposit(true);
    }
  };

  // console.log('setShowLoader is', showLoaderWhileSetAmount)

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

  useEffect(() => {
    if (selectedAmount.length > 0 && !selectedAmount.startsWith("0")) {
      setAmountBtn(true);
    } else if (selectedAmount.length === 0) {
      setAmountBtn(false);
    }
  }, [selectedAmount, AmountBtn]);

  useEffect(() => {
    if (minimumDeposit) {
      const timer = setTimeout(() => {
        setMinimumDeposit(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [minimumDeposit]);

  // console.log("amount btn is ", AmountBtn)
  // console.log('selectedAmount length is ', selectedAmount.length);

  // console.log("routeDeposit is", routeDeposit);
  // console.log("Selected Amount is", selectedAmount);
  // console.log("minmimDeposit is", minimumDeposit);
  return (
    <AnimatePresence>
      {viewWallet && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, ease: "easeIn" }}
          exit={{ opacity: 0 }}
        >
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
              <p className={routeDeposit ? "paragraph-none" : "paragraph"}>
                Stake will require you to enter and verify your Aadhaar number
                before transacting with INR. For INR withdrawals, you must use a
                bank account in your personal name. Attempting to withdraw
                through another bank account not in your name can lead to INR
                withdrawals being revoked.
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

                  {minimumDeposit ? (
                    <motion.h3
                      className="minimum-text"
                      initial={{ color: "#aab0b5" }}
                      animate={{ color: "#ff0000" }}
                      transition={{ duration: 0.5 }}
                    >
                      Minimum: ₹500 | Maximum: ₹49,999
                    </motion.h3>
                  ) : (
                    <h3 className="minimum-text">
                      Minimum: ₹500 | Maximum: ₹49,999
                    </h3>
                  )}
                  {AmountBtn && (
                    <div className="final-amount">
                      <h5 className="final-amount-header">Total</h5>
                      <h5 className="final-amount-header">
                        ₹ {selectedAmount}
                      </h5>
                    </div>
                  )}

                  {/* here to apply shit */}

                  {showLoaderWhileSetAmount ? (
                    <div className="loader-div-set">
                      <MoonLoader
                        color="#000000"
                        size={23}
                        className="moon-loader"
                      />
                    </div>
                  ) : (
                    <button
                      className={`set-amount ${
                        AmountBtn ? "before-set-amount" : ""
                      }`}
                      onClick={handleAddMoneyInWallet}
                    >
                      Set amount
                    </button>
                  )}
                </div>
              ) : (
                <div>
                  {showLoader ? (
                    <div className="loader-div">
                      <MoonLoader
                        color="#000000"
                        size={23}
                        className="moon-loader"
                      />
                    </div>
                  ) : (
                    <h1 className="deposit-btn" onClick={handleRouteDeposit}>
                      Deposit
                    </h1>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Wallet;
