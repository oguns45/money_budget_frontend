import React, { useEffect, useContext } from 'react';
import { IncomeContext } from '../../context/IncomeContext';

import IncomeForm from './IncomeForm';

import './Incomes.css';

const Incomes: React.FC = () => {
    const context = useContext(IncomeContext);

    const incomes = context?.incomes || [];
    const getIncomes = context?.getIncomes || (() => {});
    const deleteIncome = context?.deleteIncome || (() => {});
    const totalIncomes = context?.totalIncome || (() => 0);

    useEffect(() => {
        getIncomes();
    }, [getIncomes]);

    if (!context) {
        return <div>Error: Context not available</div>;
    }
    // if (!incomes || incomes.length === 0) {
    //     return <p>No incomes found. Add some to get started!</p>;
    //   }
    
    const handleDelete = (id: string) => {
        deleteIncome(id);
      };
    

    return (
        <div className="income-container">
            <div className="innerlayout">
                <h1>I</h1>
                <h2 className="total-income">
                    
                    Total Income: <span>#{totalIncomes()}</span>
                </h2>
                <div className="income-content">
                    <div className="form-container">
                        <IncomeForm />
                    </div>
                    <div className="incomes-list">
                    <ul>
                        {incomes.map(income => (
                        <li key={income._id}>
                            <strong>{income.title}</strong> - #{income.amount} ({income.category})
                            <p>{income.description}</p>
                            <small>Date: {new Date(income.date).toLocaleDateString()}</small>
                            <button onClick={() => handleDelete(income._id)}>Delete</button>
                        </li>
                        ))}
                    </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Incomes;
