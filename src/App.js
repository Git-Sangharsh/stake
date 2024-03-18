import React from "react";
import MineWrapper from "./component/games/MineWrapper/mineWrapper/MineWrapper";
import Navbar from "./component/navbar/Navbar";
import Wallet from "./component/wallet/Wallet";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LimboWrapper from "./component/games/LimboWrapper/LimboWrapper/LimboWrapper";

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
                <MineWrapper />
                <Wallet />
              </div>
            }
          />
          <Route path="/limbo" element={<LimboWrapper />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
