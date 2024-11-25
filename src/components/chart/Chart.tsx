import React from 'react';
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import { useIncomeContext } from '../../context/IncomeContext';
import { dateFormat } from '../../utils/dateFormat';

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Chart() {
  const { incomes, expenses } = useIncomeContext() || {}; // Fallback in case context is null

  const data = {
    labels: incomes?.map((income) => {
      const { date } = income;
      return dateFormat(date);
    }) || [],
    datasets: [
      {
        label: 'Income',
        data: incomes?.map((income) => income.amount) || [],
        backgroundColor: 'green',
        tension: 0.2,
      },
      {
        label: 'Expenses',
        data: expenses?.map((expense) => expense.amount) || [],
        backgroundColor: 'red',
        tension: 0.2,
      },
    ],
  };

  return (
    <div className="chart-container">
      <Line data={data} />
    </div>
  );
}

export default Chart;
