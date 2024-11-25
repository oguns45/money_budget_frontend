import React, { useEffect, useContext } from 'react';
import { IncomeContext } from '../../context/IncomeContext';

import ExpenseForm from './ExpenseForm';

import './Expenses.css';

const Expenses: React.FC = () => {
    const context = useContext(IncomeContext);

    const expenses = context?.expenses || [];
    const getExpenses = context?.getExpenses || (() => {});
    const deleteExpense = context?.deleteExpense || (() => {});
    const totalExpenses = context?.totalExpense || (() => 0);

    useEffect(() => {
        getExpenses();
    }, [getExpenses]);

    if (!context) {
        return <div>Error: Context not available</div>;
    }
    // if (!expenses || expenses.length === 0) {
    //     return <p>No incomes found. Add some to get started!</p>;
    //   }
    
    const handleDelete = (id: string) => {
        deleteExpense(id);
      };
    

    return (
        <div className="expense-container">
            <div className="innerlayout">
                <h1>E</h1>
                <h2 className="total-expense">
                    
                    Total Expense: <span>#{totalExpenses()}</span>
                </h2>
                <div className="expense-content">
                    <div className="form-container">
                        <ExpenseForm />
                    </div>
                    <div className="expenses-list">
                    <ul>
                        {expenses.map(expense => (
                        <li key={expense._id}>
                            <strong>{expense.title}</strong> - #{expense.amount} ({expense.category})
                            <p>{expense.description}</p>
                            <small>Date: {new Date(expense.date).toLocaleDateString()}</small>
                            <button onClick={() => handleDelete(expense._id)}>Delete</button>
                        </li>
                        ))}
                    </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Expenses;
