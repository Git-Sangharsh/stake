import React from "react";
import "./Navbar.css";
import logo from "../assets/MainGamble.png";
import PersonIcon from "@mui/icons-material/Person";
import bitCoinImg from "../assets/bitcoin.png";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {

  const dispatch = useDispatch();

  const viewWallet = useSelector((state) => state.viewWallet);

  const viewWalletOnClick = () => {
    dispatch({ type: "SET_VIEW_WALLET", payload: !viewWallet });
  };

  console.log('ViewWallet is ', viewWallet)

  const amount = "69.69";
  return (
    <nav className="nav">
      <img src={logo} alt="" className="logo-img" />

      <div className="nav-wallet" >
        <h4 className="wallet-Amount"> ₹ {amount}</h4>
        <img src={bitCoinImg} alt="" className="bitcoin-img" />
        <h4 className="wallet" onClick={viewWalletOnClick}>Wallet</h4>
      </div>
      <PersonIcon className="user-icon"/>
    </nav>
  );
};

export default Navbar;
