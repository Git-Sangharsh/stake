import React from "react";
import Limbo from "../Limbo/Limbo";
import "./LimboWrapper.css";
import LimboBet from "../LimboBet/LimboBet";


const LimboWrapper = () => {
  return (
    <div className="limbo-wrapper">
      <LimboBet />
      <Limbo />
    </div>
  );
};

export default LimboWrapper;
