import React, { useEffect, useContext } from 'react';
import { IncomeContext } from '../../context/IncomeContext';

import BudgetForm from './BudgetForm';

import './Budgets.css';

const Budgets: React.FC = () => {
    const context = useContext(IncomeContext);

    const budgets = context?.budgets || [];
    const getBudgets = context?.getBudgets || (() => {});
    const deleteBudget = context?.deleteBudget || (() => {});
    const totalBudgets = context?.totalBudgets || (() => 0);

    useEffect(() => {
        getBudgets();
    }, [getBudgets]);

    if (!context) {
        return <div>Error: Context not available</div>;
    }
    // if (!incomes || incomes.length === 0) {
    //     return <p>No incomes found. Add some to get started!</p>;
    //   }
    
    const handleDelete = (id: string) => {
        deleteBudget(id);
      };
    

    return (
        <div className="budget-container">
            <div className="innerlayout">
                <h1>I</h1>
                <h2 className="total-budget">
                    
                    Total Budget: <span>#{totalBudgets()}</span>
                </h2>
                <div className="Budget-content">
                    <div className="form-container">
                        <BudgetForm />
                    </div>
                    <div className="budgets-list">
                    <ul>
                        {budgets.map(budget => (
                        <li key={budget._id}>
                            <strong>{budget.title}</strong> - #{budget.amount} ({budget.category})
                            <p>{budget.description}</p>
                            <small>Date: {new Date(budget.date).toLocaleDateString()}</small>
                            <button onClick={() => handleDelete(budget._id)}>Delete</button>
                        </li>
                        ))}
                    </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Budgets;
