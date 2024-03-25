import React from "react";
import "./Keno.css";

const Keno = () => {
  const boxes = Array.from({ length: 40 }, (_, index) => index + 1);

  return (
    <div className="keno">
      <div className="keno-grid">
        {boxes.map((box) => (
          <div key={box} className="keno-box">
            <div className="keno-box-number">{box}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Keno;
