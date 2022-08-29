import React, { useState, useEffect } from "react";
import axios from "axios";
import add_chart from "../../assets/images/add-chart.png";
import { Pie, Line } from "react-chartjs-2";
import { RiDeleteBin5Line } from "react-icons/ri";
import { CgMaximizeAlt } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";
import { FunnelChart, Funnel, Tooltip as TP, LabelList } from "recharts";
import Modal from "react-bootstrap/Modal";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Line Chart",
    },
  },
};

export const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

function Gadget(props) {
  const [chartName1, setChartName1] = useState("");
  const [chartName2, setChartName2] = useState("");
  const [flag, setFlag] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  const [lineData, setLineData] = useState({});

  const getLineData = () => {
    axios.get("https://graphdata-api.herokuapp.com/graphs").then((res) => {
      let labels = res.data.map((e) => e[0]?.markdate);
      setLineData({
        labels,
        datasets: [
          {
            label: "Temp",
            data: res.data.map((e) => e[0]?.temp),
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      });
    });
  };

  useEffect(() => {
    getLineData();
    if (flag) {
      setChartName1(props.chartName);
      if (props.chartName != "") {
        setFlag(false);
      }
    } else {
      setChartName2(props.chartName);
      if (props.chartName != "") {
        setFlag(true);
      }
    }
  }, [props.chartName]);

  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop1 = (e) => {
    e.preventDefault();
    const chart = e.dataTransfer?.getData("chart");
    setChartName1(chart);
  };

  const handleDrop2 = (e) => {
    e.preventDefault();
    const chart = e.dataTransfer?.getData("chart");
    setChartName2(chart);
  };

  const funnelData = [
    {
      value: 3,
      name: "Initiated",
      fill: "#1f4f77",
      display: `Initiated - 3`,
    },
    {
      value: 2,
      name: "Submitted",
      display: "Submitted - 2",
      fill: "#488bb6",
    },
    {
      value: 2,
      name: "Result Declared",
      display: "Result Declared - 2",
      fill: "#d1e4f2",
    },
  ];
  return (
    <>
      <div className="col-md-8">
        <div className="main-box">
          <div className="row">
            <div className="col-md-6">
              <div
                className="gadget-box"
                id="gadget-box"
                onDragOver={handleOnDragOver}
                onDrop={handleDrop1}
              >
                {chartName1 != "" && (
                  <div className="chart-icons">
                    <CgMaximizeAlt onClick={() => setModalShow(true)} />
                    <RiDeleteBin5Line onClick={(e) => setChartName1("")} />
                  </div>
                )}
                {chartName1 === "Pie" ? (
                  <div className="gadget-imag" style={{ padding: "65px 0px" }}>
                    <Pie data={data} />
                  </div>
                ) : chartName1 === "Line" ? (
                  <div className="gadget-imag" style={{ padding: "125px 0px" }}>
                    <Line options={options} data={lineData} />
                  </div>
                ) : chartName1 === "Funnel" ? (
                  <div className="gadget-imag" style={{ padding: "120px 0px" }}>
                    <FunnelChart width={350} height={250}>
                      <TP />
                      <Funnel
                        dataKey="value"
                        data={funnelData}
                        isAnimationActive
                      >
                        <LabelList fill="#fff" stroke="none" dataKey="name" />
                      </Funnel>
                    </FunnelChart>
                  </div>
                ) : (
                  <div className="gadget-imag">
                    <img src={add_chart} alt="add_chart" />
                    <p>
                      Drag a gadget to this column or{" "}
                      <span>add a new gadget</span>
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div
                className="gadget-box"
                id="gadget-box"
                onDragOver={handleOnDragOver}
                onDrop={handleDrop2}
              >
                {chartName2 != "" && (
                  <div className="chart-icons">
                    <CgMaximizeAlt onClick={() => setModalShow2(true)} />
                    <RiDeleteBin5Line onClick={(e) => setChartName2("")} />
                  </div>
                )}
                {chartName2 === "Pie" ? (
                  <div className="gadget-imag" style={{ padding: "65px 0px" }}>
                    <Pie data={data} />
                  </div>
                ) : chartName2 === "Line" ? (
                  <div className="gadget-imag" style={{ padding: "125px 0px" }}>
                    <Line options={options} data={lineData} />
                  </div>
                ) : chartName2 === "Funnel" ? (
                  <div className="gadget-imag" style={{ padding: "120px 0px" }}>
                    <FunnelChart width={350} height={250}>
                      <TP />
                      <Funnel
                        dataKey="value"
                        data={funnelData}
                        isAnimationActive
                      >
                        <LabelList fill="#fff" stroke="none" dataKey="name" />
                      </Funnel>
                    </FunnelChart>
                  </div>
                ) : (
                  <div className="gadget-imag">
                    <img src={add_chart} alt="add_chart" />
                    <p>
                      Drag a gadget to this column or{" "}
                      <span>add a new gadget</span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header><IoMdClose onClick={() => setModalShow(false)}/></Modal.Header>
        <Modal.Body>
          {chartName1 != "" ? (
            chartName1 === "Pie" ? (
              <Pie data={data} />
            ) : chartName1 === "Line" ? (
              <Line options={options} data={lineData} />
            ) : chartName1 === "Funnel" ? (
              <FunnelChart width={770} height={550}>
                <TP />
                <Funnel dataKey="value" data={funnelData} isAnimationActive>
                  <LabelList fill="#fff" stroke="none" dataKey="name" />
                </Funnel>
              </FunnelChart>
            ) : null
          ) : null}
        </Modal.Body>
      </Modal>
      <Modal
        show={modalShow2}
        onHide={() => setModalShow2(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header><IoMdClose onClick={() => setModalShow2(false)}/></Modal.Header>
        <Modal.Body>
          {chartName2 != "" ? (
            chartName2 === "Pie" ? (
              <Pie data={data} />
            ) : chartName2 === "Line" ? (
              <Line options={options} data={lineData} />
            ) : chartName2 === "Funnel" ? (
              <FunnelChart width={750} height={550}>
                <TP />
                <Funnel dataKey="value" data={funnelData} isAnimationActive>
                  <LabelList fill="#fff" stroke="none" dataKey="name" />
                </Funnel>
              </FunnelChart>
            ) : null
          ) : null}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Gadget;
