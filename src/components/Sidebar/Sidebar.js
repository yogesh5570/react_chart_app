import React from "react";
import Chart from "./Charts/Chart";

function Sidebar(props) {
  return (
    <>
      <div className="col-md-4">
        <div className="add-gadget">
          <h6>Add a Gadget</h6>
          <Chart chart={"Pie"} getChartName={props.getChartName} />
          <Chart chart={"Line"} getChartName={props.getChartName} />
          <Chart chart={"Funnel"} getChartName={props.getChartName} />
        </div>
      </div>
    </>
  );
}

export default Sidebar;
