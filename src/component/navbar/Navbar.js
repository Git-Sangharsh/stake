import React, { useEffect } from "react";
import "./Navbar.css";
import logo from "../assets/winwell.png";
import PersonIcon from "@mui/icons-material/Person";
import bitCoinImg from "../assets/bitcoin.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import WalletIcon from "@mui/icons-material/Wallet";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const viewWallet = useSelector((state) => state.viewWallet);
  const walletBalance = useSelector((state) => state.walletBalance);
  const notEnoughBalance = useSelector((state) => state.notEnoughBalance);
  const viewProfileDropDown = useSelector((state) => state.viewProfileDropDown);
  const login = useSelector((state) => state.login);
  const viewRegister = useSelector((state) => state.viewRegister);
  const viewSignIn = useSelector((state) => state.viewSignin);
  // const userEmail = useSelector((state) => state.userEmail);
  // console.log("userEmail", userEmail);
  // console.log("viewRegister is ", viewRegister);

  const viewWalletOnClick = () => {
    dispatch({ type: "SET_VIEW_WALLET", payload: !viewWallet });
  };

  const viewRegisterOnClick = () => {
    dispatch({ type: "SET_VIEW_REGISTER", payload: true });
  };

  const handleLogout = () => {
    dispatch({ type: "SET_LOG_IN", payload: false });
    dispatch({ type: "SET_VIEW_PROFILE_DROPDOWN", payload: false });
    dispatch({ type: "RESET_BET_COUNTER_ON_LOGOUT"});
  };

  // console.log("log out is ", login)
  useEffect(() => {
    if (notEnoughBalance) {
      setTimeout(() => {
        dispatch({ type: "SET_NOT_ENOUGH_BALANCE", payload: false });
      }, 2000); // 2 seconds
    }
  }, [notEnoughBalance, dispatch]);

  const handleRouteLimbo = () => {
    navigate("/");
  };

  const handleProfileDropDown = () => {
    dispatch({
      type: "SET_VIEW_PROFILE_DROPDOWN",
      payload: !viewProfileDropDown,
    });
  };

  const closeProfileDropDown = () => {
    dispatch({ type: "SET_VIEW_PROFILE_DROPDOWN", payload: false });
  };

  useEffect(() => {
    if (viewRegister) {
      document.body.classList.add("walletOpen");
    } else {
      document.body.classList.remove("walletOpen");
    }
  }, [viewRegister]);

  const handleNavRegister = () => {
    dispatch({ type: "SET_VIEW_REGISTER", payload: true });
  };

  const handleNavSignin = () => {
    dispatch({ type: "SET_VIEW_SIGNIN", payload: !viewSignIn });
  };

  return (
    <div className="parent-nav">
      {login ? (
        <nav className="nav">
          <img
            src={logo}
            alt=""
            className="logo-img"
            onClick={handleRouteLimbo}
          />
          <div className="nav-wallet">
            <h4
              className={
                notEnoughBalance
                  ? "wallet-Amount wallet-amount-notEnoughBalance"
                  : "wallet-Amount"
              }
            >
              ₹ {walletBalance}
            </h4>
            <img src={bitCoinImg} alt="" className="bitcoin-img" />
            <h4 className="wallet" onClick={viewWalletOnClick}>
              Wallet
            </h4>
          </div>

          <div className="right-nav">
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.3 }}
              transition={{ duration: 0.2, ease: "easeIn" }}
            >
              <PersonIcon
                className="user-icon"
                onClick={handleProfileDropDown}
              />
            </motion.div>
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.3 }}
              transition={{ duration: 0.1, ease: "easeIn" }}
            >
              <NotificationsIcon className="user-icon" />
            </motion.div>
          </div>
        </nav>
      ) : (
        <div className="nav">
          <img
            src={logo}
            alt=""
            className="logo-img"
            onClick={handleRouteLimbo}
          />
          <div className="nav-up-in-btn">
            <h3 className="nav-login" onClick={handleNavSignin}>
              Sign In
            </h3>
            <h3 className="nav-register" onClick={handleNavRegister}>
              Register
            </h3>
          </div>
        </div>
      )}

      <AnimatePresence>
        {viewProfileDropDown && (
          <motion.div
            className="profile-dropdown"
            initial={{ opacity: 0, y: "-100%", filter: "blur(1px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.3, ease: "easeIn" }}
            exit={{ opacity: 0, y: "-100%", filter: "blur(1px)" }}
          >
            <li className="profile-dropdown-li">
              <ManageAccountsIcon className="wallet-icon profile-dropdown-li-icon-color" />
              PROFILE
            </li>
            <li className="profile-dropdown-li">
              <AnalyticsIcon className="wallet-icon profile-dropdown-li-icon-color" />
              STATISTICS
            </li>
            <li className="profile-dropdown-li" onClick={viewWalletOnClick}>
              <WalletIcon className="wallet-icon profile-dropdown-li-icon-color" />
              WALLET
            </li>
            {login ? (
              <li className="profile-dropdown-li" onClick={handleLogout}>
                <LogoutIcon className="wallet-icon profile-dropdown-li-icon-color" />
                LOGOUT
              </li>
            ) : (
              <li className="profile-dropdown-li" onClick={viewRegisterOnClick}>
                <LoginIcon className="wallet-icon profile-dropdown-li-icon-color" />
                LOGIN
              </li>
            )}
            <li className="profile-dropdown-li" onClick={closeProfileDropDown}>
              <CloseIcon className="wallet-icon profile-dropdown-li-icon-color" />{" "}
              CLOSE{" "}
            </li>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
