import React, { useState } from "react";
import Gadget from "./Gadget";
import Sidebar from "../Sidebar/Sidebar";

function Dashboard(props) {
  const [chartName, setChartName] = useState("");

  const getChartName = (e) => {
    setChartName(e);
  };

  return (
    <>
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <Gadget chartName={chartName} />
            <Sidebar getChartName={getChartName} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
