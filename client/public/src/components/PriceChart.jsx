// LineChart.jsx
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Ticks,
} from "chart.js";

import { useDispatch, useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const PriceChart = () => {
  const { data } = useSelector(
    (state) => state.historicalData
  );

  const labels = data.prices.map((price) => {
    return price[0]
  });

  const prices = data.prices.map((price) => {
    return price[1];
  });

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Price (in $)",
        data: prices,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
        pointBorderColor: "#fff",
        pointRadius: 0,
        pointHoverRadius: 5,
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Price Trend Over 365 Days",
      },
    },
    scales: {
      x: {
        title: {
          display: false,
          text: "Days",
        },
        ticks: {
          display: false,
          maxTicksLimit: 10,
        },
      },
      y: {
        title: {
          display: true,
          text: "Price ($)",
        },
        beginAtZero: true,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default PriceChart;
