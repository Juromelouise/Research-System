import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { Loader } from '../Layout/Loader';

const TotalSaleUser = () => {
  const [totalSalesPerUser, setTotalSalesPerUser] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/chart/total/sale/user`);
        setTotalSalesPerUser(response.data.totalSalesPerUser);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching total sales per user:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let chartInstance = null;

    const createChart = () => {
      const userNames = totalSalesPerUser.map(user => user.user);
      const totalSales = totalSalesPerUser.map(user => user.totalSales);

      const config = {
        type: 'bar',
        data: {
          labels: userNames,
          datasets: [{
            label: 'Total Sales per User',
            data: totalSales,
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderWidth: 1
          }]
        }
      };

      const ctx = document.getElementById('totalSaleUserChart');
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
      {loading ? <Loader open={loading}/> : <canvas id="totalSaleUserChart" />}
    </div>
  );
};

export default TotalSaleUser;
