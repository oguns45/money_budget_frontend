import React, { useEffect } from 'react';
import { useIncomeContext } from '../../context/IncomeContext';
// import History from '../../history/History';
import Chart from '../chart/Chart';
 import './Dashboard.css'; // Import external CSS

const Dashboard: React.FC = () => {
    const {
        totalExpense,
        totalIncome,
        totalBalance,
        getIncomes,
        getExpenses,
    } = useIncomeContext()|| {};

    // Fetch incomes and expenses when the component mounts
    useEffect(() => {
        if (getIncomes) getIncomes(); // Fetch income data from the backend
        if (getExpenses) getExpenses(); // Fetch expense data from the backend
    }, [getIncomes, getExpenses]);

    // Calculate the total income by summing up all the incomes
    // const getTotalIncome = () => {
    //     return incomes.reduce((acc, income) => acc + income.amount, 0);
    // };

    return (
        <div className="dashboard">
            <div className='innerlayout'>
                <h1>All Transactions</h1>
                <div className="stats-con">
                    <div className="chart-con">
                        <Chart />
                        <div className="amount-con">
                            <div className="income">
                                <h2>Total Income</h2>
                                <p>
                                    # {totalIncome ? totalIncome() : 0}  {/* Display total income calculated from the fetched data */}
                                </p>
                            </div>
                            <div className="expense">
                                <h2>Total Expense</h2>
                                <p>
                                    # {totalExpense ? totalExpense() : 0} {/* # ${totalExpenses()}  This should come from the context */}
                                </p>
                            </div>
                            <div className="balance">
                                <h2>Total Balance</h2>
                                <p>
                                    # {totalBalance ? totalBalance() : 0}  {/* # ${totalBalance()}  This should come from the context */}
                                </p>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
