import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Pie_chart from "../../../assets/images/Pie_chart.png";
import Line_chart from "../../../assets/images/Line_chart.png";
import Funnel_chart from "../../../assets/images/Funnel_chart.png";

function Chart(props) {
  const [chartName, setChartName] = useState(props.chart);

  const drag = (e) => {
    e.dataTransfer.setData("chart", e.target.id);
  };

  return (
    <>
      <div className="main-boxwap">
        <div className="gadget-image">
          <img
            src={
              chartName === "Pie"
                ? Pie_chart
                : chartName === "Line"
                ? Line_chart
                : Funnel_chart
            }
            id={chartName}
            onDragStart={drag}
            alt="add_chart"
          />
          <Button
            variant="primary"
            onClick={(e) => props.getChartName(chartName)}
          >
            Add
          </Button>
        </div>
        <div className="gadget-text">
          <p>{chartName} Chart</p>
        </div>
      </div>
    </>
  );
}

export default Chart;
