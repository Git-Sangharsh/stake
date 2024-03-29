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

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Wallet />
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Home />
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
        </Routes>
      </div>
    </Router>
  );
};

export default App;
