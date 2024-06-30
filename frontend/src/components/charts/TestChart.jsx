import React from "react";
import { Chart } from "react-google-charts";
function TestChart({data}) {

  return (
    <Chart
      chartType="Bar"
      width="95%"
      height="250px"
      data={data}
    />
  );
}

export default TestChart;
