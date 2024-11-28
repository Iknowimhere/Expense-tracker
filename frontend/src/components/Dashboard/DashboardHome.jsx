import React, { useState, useEffect } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import axios from '../../axios';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);
import './Dashboard.css';
const DashboardHome = ({ user }) => {
  const [budgetData, setBudgetData] = useState([]);
  const [transactionData, setTransactionData] = useState([]);
  const [incomeData, setIncomeData] = useState(null);

  const fetchBudgetData = async () => {
    try {
      const response = await axios.get('/budget', {
        headers: {
          Authorization: `Bearer ₹{user.token}`,
        },
      });
      setBudgetData(response.data);
    } catch (error) {
      console.error('Error fetching budget data:', error);
    }
  };

  const fetchTransactionData = async () => {
    try {
      const response = await axios.get('/transaction', {
        headers: {
          Authorization: `Bearer ₹{user.token}`,
        },
      });
      setTransactionData(response.data);
    } catch (error) {
      console.error('Error fetching transaction data:', error);
    }
  };

  const fetchIncomeData = async () => {
    try {
      const response = await axios.get('/income/monthly', {
        headers: {
          Authorization: `Bearer ₹{user.token}`,
        },
      });

      setIncomeData(response.data);
    } catch (error) {
      console.error('Error fetching income data:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchBudgetData();
      fetchTransactionData();
      fetchIncomeData();
    }
  }, [user]);

  const pieChartData = {
    labels: [
      'Housing',
      'Utilities',
      'Groceries',
      'Transportation',
      'Health',
      'Entertainment',
      'Miscellaneous',
    ],
    datasets: [
      {
        data: budgetData.map((item) => item.amount),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
          'rgba(46, 204, 113, 0.8)',
        ],
        borderColor: 'rgba(255, 255, 255, 0.6)',
        borderWidth: 2,
      },
    ],
  };

  const barChartOptions = {
    plugins: {
      legend: {
        labels: {
          color: '#fff',
        },
      },
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#fff',
        },
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#fff',
        },
      },
    },
  };

  const barChartData = {
    labels: [
      'Housing',
      'Utilities',
      'Groceries',
      'Transportation',
      'Health',
      'Entertainment',
      'Miscellaneous',
    ],
    datasets: [
      {
        label: 'Budget',
        data: budgetData.map((item) => item.amount),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
      {
        label: 'Spent',
        data: budgetData.map((item) => item.currentSpent),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='dashboard-container'
    >
      <div className='glass-container'>
        <motion.div
          className='summary-cards'
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className='stat-card'>
            <div className='stat-icon'>💰</div>
            <h3>Total Budget</h3>
            <p className='stat-value'>
              ₹{budgetData.reduce((acc, curr) => acc + curr.amount, 0)}
            </p>
            <div className='stat-trend positive'>↑ 12%</div>
          </div>
          <div className='stat-card'>
            <div className='stat-icon'>💳</div>
            <h3>Total Spent</h3>
            <p className='stat-value'>
              ₹{budgetData.reduce((acc, curr) => acc + curr.currentSpent, 0)}
            </p>
            <div className='stat-trend negative'>↓ 5%</div>
          </div>
          <div className='stat-card'>
            <div className='stat-icon'>📈</div>
            <h3>Monthly Income</h3>
            <p className='stat-value'>₹{incomeData || 0}</p>
            <div className='stat-trend positive'>↑ 8%</div>
          </div>
        </motion.div>

        <div className='chart-grid'>
          <motion.div
            className='chart-card'
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2>Budget Distribution</h2>
            <Pie
              data={pieChartData}
              options={{ plugins: { legend: { labels: { color: '#fff' } } } }}
            />
          </motion.div>

          <motion.div
            className='chart-card'
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2>Budget vs Spending</h2>
            <Bar data={barChartData} options={barChartOptions} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardHome;
