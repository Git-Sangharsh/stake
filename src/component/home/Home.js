import React from "react";
import "./Home.css";
import poster1 from "../assets/home-casino-poster.avif";
import poster2 from "../assets/home-casino-poster-2.avif";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="home">
      <div className="home-wrapper">
        <div className="poster-div">
          <div className="poster-child">
            <motion.img
              initial={{ y: 0, boxShadow: "none" }}
              whileHover={{
                y: -5,
                boxShadow: "4px 5px 5px rgba(0, 0, 0, 0.3)",
              }}
              transition={{ duration: 0.1 }}
              src={poster1}
              alt=""
              className="poster-img"
            />

            <h4 className="poster-child-header">Leading Online Casino</h4>
            <p className="poster-child-p">
              Browse our giant range of casino games as Stake offers a fair and
              fun online gambling experience. Play Slots, Live Casino,
              Blackjack, Baccarat, Roulette, and thousands of classic casino
              games right from your browser, including your favourite Stake
              Originals.
            </p>
            <h1 className="casino-btn">Go To Casino</h1>
          </div>
          <div className="poster-child">
            <motion.img
              initial={{ y: 0, boxShadow: "none" }}
              whileHover={{
                y: -5,
                boxShadow: "4px 5px 5px rgba(0, 0, 0, 0.3)",
              }}
              transition={{ duration: 0.1 }}
              src={poster2}
              alt=""
              className="poster-img"
            />
            <h4 className="poster-child-header">Best Sports Betting Online</h4>
            <p className="poster-child-p">
              Bet on your favourite teams, players and leagues from all around
              the world on our sports betting platform. Gamble on a wide range
              of sports betting options and markets for live sports across MMA,
              Basketball, Soccer and more for an unbeatable sports betting
              experience.
            </p>
            <h1 className="casino-btn">Comming Soon!!!</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
