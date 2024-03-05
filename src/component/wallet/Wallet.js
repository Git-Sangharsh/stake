import React, { useState } from "react";
import "./wallet.css";
import WalletIcon from "@mui/icons-material/Wallet";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";

const Wallet = () => {
  const dispatch = useDispatch();
  const viewWallet = useSelector((state) => state.viewWallet);

  const [depositOrWithdraw, setDepositOrWithdraw] = useState(false);

  const handleDepositOrWithdraw = () => {
    setDepositOrWithdraw(!depositOrWithdraw);
  };

  const handleCloseWallet = () => {
    dispatch({ type: "SET_VIEW_WALLET", payload: false });
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
            <div className="amount-conversion">
              {/* <img src={rupeesSvg} alt="" className="ruppes-svg"/> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Wallet;
