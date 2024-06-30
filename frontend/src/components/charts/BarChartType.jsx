import React from "react";
import { Chart } from "react-google-charts";
import H5 from "../atoms/H5";
function BarChartType({stat}) {
  const options = {
    // legend: { position: 'none' }, // hide the legend
  };
  return (
    <div className="flex flex-col  gap-4 w-1/2">
      <H5 label={stat.title} />
      <Chart
      chartType="Bar"
      width="100%"
      height="250px"
      data={stat.data}
      options={options}
    />
    </div>
  );
}

export default BarChartType;
