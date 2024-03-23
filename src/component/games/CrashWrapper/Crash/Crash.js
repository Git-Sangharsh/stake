import React from "react";
import "./Crash.css";
import { LineChart } from "@mui/x-charts";

const Crash = () => {
  const uData = [10, 20, 30, 40, 50];
  const xLabels = ["Jan", "Feb", "Mar", "Apr", "May"];

  return (
    <div className="crash">
      <h1>Hello World</h1>
      <LineChart
        width={500}
        height={300}
        series={[{ data: uData, label: "uv", area: true, showMark: false }]}
        xAxis={[{ scaleType: "point", data: xLabels }]}
        sx={{
          ".MuiLineElement-root": {
            stroke: "#FFFFFF",
            strokeWidth: 6,

          },
        }}
      />
    </div>
  );
};

export default Crash;
