import React, { useState } from "react";
import "./Navbar.css";
import logo from "../assets/MainGamble.png";
import PersonIcon from "@mui/icons-material/Person";
import bitCoinImg from "../assets/bitcoin.png";

const Navbar = () => {
  const amount = "69.69";
  return (
    <nav className="nav">
      <img src={logo} alt="" className="logo-img" />

      <div className="nav-wallet">
        <h4 className="wallet-Amount"> ₹ {amount}</h4>
        <img src={bitCoinImg} alt="" className="bitcoin-img" />
        <h4 className="wallet">Wallet</h4>
      </div>
      <PersonIcon className="user-icon"/>
    </nav>
  );
};

export default Navbar;
