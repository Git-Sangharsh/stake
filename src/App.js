import React from "react";
import MineWrapper from "./component/games/MineWrapper/mineWrapper/MineWrapper";
import Navbar from "./component/navbar/Navbar";
import Wallet from "./component/wallet/Wallet";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LimboWrapper from "./component/games/LimboWrapper/LimboWrapper/LimboWrapper";
import Home from "./component/home/Home";
import Casino from "./component/casino/Casino";
import Crash from "./component/games/CrashWrapper/Crash/Crash";
import Keno from "./component/games/kenoWrapper/keno/Keno";
import Register from "./component/authentication/register/Register";
import Signin from "./component/authentication/signin/Signin";
import DiceWrapper from "./component/games/DiceWrapper/diceWrapper/diceWrapper";
import Statistics from "./component/statistics/Statistics";

const App = () => {


  return (
    <Router>
      <div className="App">
        <Navbar />
        <Wallet />
        <Statistics />
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Home />
                <Register />
                <Signin />
              </div>
            }
          />
          <Route path="/casino" element={<Casino />} />

          <Route
            path="/casino/mines"
            element={
              <div>
                <MineWrapper />
                <Wallet />
              </div>
            }
          />
          <Route path="/casino/limbo" element={<LimboWrapper />} />
          <Route path="/casino/crash" element={<Crash />} />
          <Route path="/casino/keno" element={<Keno />} />
          <Route path="/casino/dice" element={<DiceWrapper />}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
