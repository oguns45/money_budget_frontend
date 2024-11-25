

import React, { useContext, createContext, useState, useEffect, ReactNode } from 'react';

interface User {
  _id: string;
  email: string;
  username: string;
}

interface Income {
  _id: string;
  title: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

interface Expense {
  _id: string;
  title: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

interface Budget {
  _id: string;
  title: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

interface ContextProps {
  incomes: Income[];
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  getIncomes: () => void;
  addIncome: (income: Omit<Income, '_id'>) => Promise<void>;
  expenses: Expense[];
  deleteIncome: (id: string) => Promise<void>;
  totalIncome: () => number;
  addExpense: (expense: Omit<Expense, '_id'>) => Promise<void>;
  getExpenses: () => void;
  deleteExpense: (id: string) => void;
  budgets: Budget[];
  addBudget: (budget: Omit<Budget, '_id'>) => Promise<void>;
  getBudgets: () => void;
  deleteBudget: (id: string) => void;
  totalBudgets: () => number;
  totalExpense: () => number;
  totalBalance: () => number;
}

export const IncomeContext = createContext<ContextProps | null>(null);

export const IncomeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);
  const userId = '6736ff16f6c87efbf91b0c4b'; // Hardcoded user ID

  const getIncomes = async () => {
    if (!currentUser) return;

    try {
      const res = await fetch(`http://localhost:5000/api/income/${currentUser}`);
      const data = await res.json();
      setIncomes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching incomes:', err);
    }
  };

  const addIncome = async (income: Omit<Income, '_id'>) => {
    if (!currentUser) return;

    try {
      const res = await fetch(`http://localhost:5000/api/income`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...income, userId: currentUser._id }),
      });
      const newIncome = await res.json();
      setIncomes([newIncome.savedIncome, ...incomes]);
    } catch (err) {
      console.error('Error adding income:', err);
    }
  };

  const deleteIncome = async (id: string) => {
    if (!currentUser) return;

    try {
      await fetch(`http://localhost:5000/api/income/${id}/${currentUser}`, {
        method: 'DELETE',
      });
      setIncomes(incomes.filter(income => income._id !== id));
    } catch (err) {
      console.error('Error deleting income:', err);
    }
  };

  const getExpenses = async () => {
    if (!currentUser) return;
  
    try {
      const res = await fetch(`http://localhost:5000/api/expenses/${currentUser._id}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setExpenses(data.filter(expense => expense && typeof expense.amount === 'number'));
      } else {
        console.error('Unexpected data format:', data);
      }
    } catch (err) {
      console.error('Error fetching expenses:', err);
    }
  };
  

  const addExpense = async (expense: Omit<Expense, '_id'>) => {
    if (!currentUser) return;

    try {
      const res = await fetch(`http://localhost:5000/api/expenses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...expense, userId: currentUser._id }),
      });
      const newExpense = await res.json();
      setExpenses([newExpense.savedExpense, ...expenses]);
    } catch (err) {
      console.error('Error adding income:', err);
    }
  };

  const deleteExpense = async (id: string) => {
    if (!currentUser) return;

    try {
      await fetch(`http://localhost:5000/api/expenses/${id}/${currentUser}`, {
        method: 'DELETE',
      });
      setExpenses(expenses.filter(expense => expense._id !== id));
    } catch (err) {
      console.error('Error deleting expense:', err);
    }
  };

  const getBudgets = async () => {
    if (!currentUser) return;

    try {
      const res = await fetch(`http://localhost:5000/api/budget/${currentUser}`);
      const data = await res.json();
      setBudgets(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching budget:', err);
    }
  };

  const addBudget = async (budget: Omit<Budget, '_id'>) => {
    if (!currentUser) return;

    try {
      const res = await fetch(`http://localhost:5000/api/budget`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...budget, userId: currentUser._id }),
      });
      const newBudget = await res.json();
      setBudgets([newBudget.savedBudget, ...budgets]);
    } catch (err) {
      console.error('Error adding budget:', err);
    }
  };

  const deleteBudget = async (id: string) => {
    if (!currentUser) return;

    try {
      await fetch(`http://localhost:5000/api/budget/${currentUser}/${id}`, {
        method: 'DELETE',
      });
      setBudgets(budgets.filter(budget => budget._id !== id));
    } catch (err) {
      console.error('Error deleting budget:', err);
    }
  };

  // Calculate totals
  const totalIncome = () => incomes.reduce((acc, income) => acc + income.amount, 0);
  const totalExpense = () => expenses.reduce((acc, expense) => acc + expense.amount, 0);
  const totalBudgets = () => budgets.reduce((acc, budget) => acc + budget.amount, 0);
  const totalBalance = () => totalIncome() - totalExpense();


  return (
    <IncomeContext.Provider
      value={{
        incomes,
        currentUser,
        setCurrentUser,
        getIncomes,
        addIncome,
        deleteIncome,
        expenses,
        addExpense,
        getExpenses,
        deleteExpense,
        totalExpense,
        totalIncome,
        totalBalance,
        budgets,
        addBudget,
        getBudgets,
        deleteBudget,
        totalBudgets,
      }}
    >
      {children}
    </IncomeContext.Provider>
  );
};

export const useIncomeContext = () => useContext(IncomeContext);
