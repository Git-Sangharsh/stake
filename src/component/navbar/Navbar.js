import React, { useEffect } from "react";
import "./Navbar.css";
import logo from "../assets/MainGamble.png";
import PersonIcon from "@mui/icons-material/Person";
import bitCoinImg from "../assets/bitcoin.png";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  const viewWallet = useSelector((state) => state.viewWallet);
  const walletBalance = useSelector((state) => state.walletBalance);
  const notEnoughBalance = useSelector((state) => state.notEnoughBalance);

  const viewWalletOnClick = () => {
    dispatch({ type: "SET_VIEW_WALLET", payload: !viewWallet });
  };

  useEffect(() => {
    if (notEnoughBalance) {
      setTimeout(() => {
        dispatch({ type: "SET_NOT_ENOUGH_BALANCE", payload: false });
      }, 2000); // 2 seconds
    }
  }, [notEnoughBalance, dispatch]);

  return (
    <nav className="nav">
      <img src={logo} alt="" className="logo-img" />
      <div className="nav-wallet">
        <h4 className={notEnoughBalance ? "wallet-Amount wallet-amount-notEnoughBalance" :"wallet-Amount"}> ₹ {walletBalance}</h4>
        <img src={bitCoinImg} alt="" className="bitcoin-img" />
        <h4 className="wallet" onClick={viewWalletOnClick}>
          Wallet
        </h4>
      </div>
      <PersonIcon className="user-icon" />
    </nav>
  );
};

export default Navbar;
