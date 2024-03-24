import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import { Loader } from "../Layout/Loader";

const HighDemand = () => {
  const [highDemandProducts, setHighDemandProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/chart/high/demand/product`
        );
        setHighDemandProducts(response.data.highDemandProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching high demand products:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let chartInstance = null;

    const createChart = () => {
      const productLabels = highDemandProducts.map(
        (product) => product.product.name
      );
      const orderQuantities = highDemandProducts.map(
        (product) => product.totalOrders
      );

      const config = {
        type: "polarArea",
        data: {
          labels: productLabels,
          datasets: [
            {
              label: "High Demand Products",
              data: orderQuantities,
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
                "rgba(255, 159, 64, 0.6)",
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
              ],
              borderWidth: 1,
            },
          ],
        },
      };

      const ctx = document.getElementById("highDemandChart");
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
  }, [loading, highDemandProducts]);

  return (
    <div>
      <h2>High Demand Products</h2>
      {loading ? <Loader open={loading}/> : <canvas id="highDemandChart" />}
    </div>
  );
};

export default HighDemand;
