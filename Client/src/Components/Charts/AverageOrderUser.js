import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import { Loader } from "../Layout/Loader";

const AverageOrderUser = () => {
  const [averageOrderValuePerUser, setAverageOrderValuePerUser] = useState([]);
  const [loading, setLoading] = useState(true);

  function getRandomRGBA() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const alpha = Math.random();
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/chart/average/order/user`
        );
        setAverageOrderValuePerUser(response.data.averageOrderValuePerUser);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching average order value per user:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let chartInstance = null;

    const createChart = () => {
      const userNames = averageOrderValuePerUser.map((user) => user.user);
      const backgroundColors = userNames.map(() => getRandomRGBA());
      const averageOrderValues = averageOrderValuePerUser.map(
        (user) => user.averageOrderValue
      );

      const config = {
        type: "pie",
        data: {
          labels: userNames,
          datasets: [
            {
              label: "Average Order Value per User",
              data: averageOrderValues,
              backgroundColor: backgroundColors,
              borderWidth: 1,
            },
            {
              label: "Average Order Value per User",
              data: averageOrderValues,
              backgroundColor: "rgba(255, 99, 132, 0.6)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      };

      const ctx = document.getElementById("averageOrderUserChart");
      if (chartInstance) {
        chartInstance.destroy();
      }
      chartInstance = new Chart(ctx, config);
    };

    if (!loading) {
      createChart();
    }

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [loading, averageOrderValuePerUser]);

  return (
    <div>
      <h2>Average Order Value per User</h2>
      {loading ? (
        <Loader open={loading} />
      ) : (
        <canvas id="averageOrderUserChart" />
      )}
    </div>
  );
};

export default AverageOrderUser;
