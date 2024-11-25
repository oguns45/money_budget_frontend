import React, { useContext, useEffect } from 'react';
import { IncomeContext } from '../../context/IncomeContext';

const IncomeList: React.FC = () => {
  const context = useContext(IncomeContext);

  useEffect(() => {
    if (context) {
      context.getIncomes();
    }
  }, [context]);

  if (!context) {
    return <p>Loading...</p>;
  }

  const { incomes, deleteIncome } = context;

  if (!incomes || incomes.length === 0) {
    return <p>No incomes found. Add some to get started!</p>;
  }

  const handleDelete = (id: string) => {
    deleteIncome(id);
  };

  return (
    <div>
      <h2>Your Incomes</h2>
      <ul>
        {incomes.map(income => (
          <li key={income._id}>
            <strong>{income.title}</strong> - ${income.amount} ({income.category})
            <p>{income.description}</p>
            <small>Date: {new Date(income.date).toLocaleDateString()}</small>
            <button onClick={() => handleDelete(income._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IncomeList;
