import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import { Loader } from "../Layout/Loader";

const TotalSaleUser = () => {
  const [totalSalesPerUser, setTotalSalesPerUser] = useState([]);
  const [loading, setLoading] = useState(true);

  function getRandomRGBA() {
    const r = Math.floor(Math.random() * 256); // Random value for red (0-255)
    const g = Math.floor(Math.random() * 256); // Random value for green (0-255)
    const b = Math.floor(Math.random() * 256); // Random value for blue (0-255)
    const alpha = Math.random(); // Random value for alpha (0-1)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`; // Construct the RGBA color string
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/chart/total/sale/user`
        );
        setTotalSalesPerUser(response.data.totalSalesPerUser);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching total sales per user:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let chartInstance = null;

    const createChart = () => {
      const userNames = totalSalesPerUser.map((user) => user.user);
      const backgroundColors = userNames.map(() => getRandomRGBA());
      const totalSales = totalSalesPerUser.map((user) => user.totalSales);

      const config = {
        type: "bar",
        data: {
          labels: userNames,
          datasets: [
            {
              label: "Total Sales per User",
              data: totalSales,
              backgroundColor: backgroundColors,
              borderWidth: 1,
            },
          ],
        },
      };

      const ctx = document.getElementById("totalSaleUserChart");
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
  }, [loading, totalSalesPerUser]);

  return (
    <div>
      <h2>Total Sales per User</h2>
      {loading ? <Loader open={loading} /> : <canvas id="totalSaleUserChart" />}
    </div>
  );
};

export default TotalSaleUser;
