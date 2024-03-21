import React, { useState } from "react";
import "./Casino.css";
import casinoMine from "../assets/casinoMine.avif";
import casinoLimbo from "../assets/casinoLimbo.avif";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
const Casino = () => {
  const navigate = useNavigate();

  const [loader, setLoader] = useState(false);

  const handleMineRoute = () => {
    setLoader(true);
    setTimeout(() => {
      navigate("/casino/mines");
      setLoader(false);
    }, 2000);
  };

  const handleLimboRoute = () => {
    setLoader(true);
    setTimeout(() => {
      navigate("/casino/limbo");
      setLoader(false);
    }, 2000);
  };
  return (
    <div className="casino">
      <div className="casino-wrapper">
        <div className="lobby-nav">
          <li className="lobby-nav-header lobby-nav-header-selected">Lobby</li>
          <li className="lobby-nav-header">Comming Soon!</li>
        </div>
        <div className="stake-originals">
          <motion.img
            initial={{ y: 0, boxShadow: "none" }}
            whileHover={{
              y: -5,
              boxShadow: "4px 5px 5px rgba(0, 0, 0, 0.3)",
            }}
            transition={{ duration: 0.1 }}
            src={casinoMine}
            className="stake-originals-img"
            alt=""
            onClick={handleMineRoute}
          />
          <motion.img
            initial={{ y: 0, boxShadow: "none" }}
            whileHover={{
              y: -5,
              boxShadow: "4px 5px 5px rgba(0, 0, 0, 0.3)",
            }}
            transition={{ duration: 0.1 }}
            src={casinoLimbo}
            className="stake-originals-img"
            alt=""
            onClick={handleLimboRoute}
          />
          <motion.div
            initial={{ y: 0, boxShadow: "none" }}
            whileHover={{
              y: -5,
              boxShadow: "4px 5px 5px rgba(0, 0, 0, 0.3)",
            }}
            className="stake-originals-img coming"
          >
            Coming Soon!!!
          </motion.div>
          <motion.div
            initial={{ y: 0, boxShadow: "none" }}
            whileHover={{
              y: -5,
              boxShadow: "4px 5px 5px rgba(0, 0, 0, 0.3)",
            }}
            className="stake-originals-img coming"
          >
            Coming Soon!!!
          </motion.div>{" "}
          <motion.div
            initial={{ y: 0, boxShadow: "none" }}
            whileHover={{
              y: -5,
              boxShadow: "4px 5px 5px rgba(0, 0, 0, 0.3)",
            }}
            className="stake-originals-img coming"
          >
            Coming Soon!!!
          </motion.div>{" "}
          <motion.div
            initial={{ y: 0, boxShadow: "none" }}
            whileHover={{
              y: -5,
              boxShadow: "4px 5px 5px rgba(0, 0, 0, 0.3)",
            }}
            className="stake-originals-img coming"
          >
            Coming Soon!!!
          </motion.div>{" "}
          <motion.div
            initial={{ y: 0, boxShadow: "none" }}
            whileHover={{
              y: -5,
              boxShadow: "4px 5px 5px rgba(0, 0, 0, 0.3)",
            }}
            className="stake-originals-img coming"
          >
            Coming Soon!!!
          </motion.div>{" "}
          <motion.div
            initial={{ y: 0, boxShadow: "none" }}
            whileHover={{
              y: -5,
              boxShadow: "4px 5px 5px rgba(0, 0, 0, 0.3)",
            }}
            className="stake-originals-img coming"
          >
            Coming Soon!!!
          </motion.div>
          {loader && (
            <div className="route-loader">
              <BarLoader color="#ffffff" height={4} width={200} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Casino;
