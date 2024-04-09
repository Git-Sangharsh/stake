import React, { useEffect } from "react";
import "./Navbar.css";
import logo from "../assets/mines.png";
import PersonIcon from "@mui/icons-material/Person";
import bitCoinImg from "../assets/bitcoin.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import WalletIcon from "@mui/icons-material/Wallet";
import LoginIcon from '@mui/icons-material/Login';
import CloseIcon from "@mui/icons-material/Close";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { motion, AnimatePresence  } from "framer-motion";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const viewWallet = useSelector((state) => state.viewWallet);
  const walletBalance = useSelector((state) => state.walletBalance);
  const notEnoughBalance = useSelector((state) => state.notEnoughBalance);
  const viewProfileDropDown = useSelector((state) => state.viewProfileDropDown);

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

  const handleRouteLimbo = () => {
    navigate("/");
  }

  const handleProfileDropDown = () => {
    dispatch({ type: "SET_VIEW_PROFILE_DROPDOWN", payload: !viewProfileDropDown})
  }

  const closeProfileDropDown = () => {
    dispatch({ type: "SET_VIEW_PROFILE_DROPDOWN", payload: false})
  }

  return (
    <div className="parent-nav">
      <nav className="nav">
        <img src={logo} alt="" className="logo-img" onClick={handleRouteLimbo}/>
        <div className="nav-wallet">
          <h4 className={notEnoughBalance ? "wallet-Amount wallet-amount-notEnoughBalance" :"wallet-Amount"}> ₹ {walletBalance}</h4>
          <img src={bitCoinImg} alt="" className="bitcoin-img" />
          <h4 className="wallet" onClick={viewWalletOnClick}>
            Wallet
          </h4>
        </div>
        <div className="right-nav">
            <motion.div
            initial={{scale: 1}}
            whileHover={{scale: 1.3}}
            transition={{duration: 0.2, ease: "easeIn"}}
            >
              <PersonIcon className="user-icon" onClick={handleProfileDropDown}/>
            </motion.div>
            <motion.div
            initial={{scale: 1}}
            whileHover={{scale: 1.3}}
            transition={{duration: 0.1, ease: "easeIn"}}
            >
            <NotificationsIcon  className="user-icon"/>
            </motion.div>

        </div>
      </nav>
      <AnimatePresence>
      {
        viewProfileDropDown && (
          <motion.div className="profile-dropdown"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.2, ease: "easeIn"}}
            exit={{ opacity: 0 }}
          >
            <li className="profile-dropdown-li" onClick={viewWalletOnClick}><WalletIcon className="wallet-icon profile-dropdown-li-icon-color"/> WALLET </li>
            <li className="profile-dropdown-li" onClick={viewWalletOnClick}><LoginIcon className="wallet-icon profile-dropdown-li-icon-color"/> LOGIN </li>
            <li className="profile-dropdown-li" onClick={closeProfileDropDown}><CloseIcon className="wallet-icon profile-dropdown-li-icon-color"/> CLOSE  </li>
          </motion.div>
        )
      }
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
