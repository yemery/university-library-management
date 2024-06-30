import React from "react";
import { Chart } from "react-google-charts";

function PieChartType({ stat }) {
  const options = {
    legend: { position: "none" }, // hide the legend
  };
  return (
    <div className="flex flex-col items-center gap-4 w-1/2">
      <p className="font-semibold">{stat.title}</p>
      <Chart
        chartType="PieChart"
        width="100%"
        height="250px"
        data={stat.data}
        options={options}
      />
    </div>
  );
}

export default PieChartType;
