import React from "react";
import {
  Chart as chartjs,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useAuthContext } from "../../contexts/AuthContext";
import "./DataBar.css";

chartjs.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function DataBar({ mostPlayedData }) {
  const { user } = useAuthContext();

  const totalCurrentWeek = mostPlayedData.totalCurrentWeek || 0;
  const totalCurrentMonth = mostPlayedData.totalCurrentMonth || 0;
  const totalLastWeek = mostPlayedData.totalLastWeek || 0;
  const totalLastMonth = mostPlayedData.totalLastMonth || 0;

  const chartData = {
    labels: ["This Week", "Last Week", "This Month", "Last Month"],
    datasets: [
      {
        label: `${user.userName}'s charts`,
        backgroundColor: ["#edeaf7bb", "#7a788a83", "#edeaf7bb", "#7a788a83"],
        hoverBackgroundColor: [
          "#edeaf7ee",
          "#7a788ad2",
          "#edeaf7ee",
          "#7a788ad2",
        ],
        data: [
          totalCurrentWeek,
          totalLastWeek,
          totalCurrentMonth,
          totalLastMonth,
        ],
      },
    ],
  };

  const maxBarValue = Math.max(
    totalCurrentWeek,
    totalLastWeek,
    totalCurrentMonth,
    totalLastMonth
  );

  let steps = maxBarValue <= 5 ? 1 : undefined;

  const chartOptions = {
    height: 300,

    scales: {
      y: {
        type: "linear",
        ticks: {
          beginAtZero: true,
          suggestedMin: 0,
          stepSize: steps,
        },
      },
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
}

export default DataBar;
