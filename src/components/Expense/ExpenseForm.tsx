import React, { useContext, useState } from 'react';
import { IncomeContext } from '../../context/IncomeContext'; // Assuming IncomeContext manages both incomes and expenses
import './ExpenseForm.css';

const ExpenseForm: React.FC = () => {
  const context = useContext(IncomeContext);

  // Provide a default fallback for the destructured `addExpense` method
  const addExpense = context?.addExpense || (() => {});

  const [formData, setFormData] = useState({
    user: '6736ff16f6c87efbf91b0c4b', // Replace with dynamic user ID if needed
    title: '',
    amount: 0,
    category: '',
    description: '',
    date: '',
  });

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || formData.amount <= 0 || !formData.date || !formData.category) {
      setError('All fields are required and must be valid.');
      return;
    }

    try {
      addExpense(formData);
      setFormData({ user: '6736ff16f6c87efbf91b0c4b', title: '', amount: 0, category: '', description: '', date: '' });
      setError(null);
    } catch (err) {
      console.error('Error adding income:', err);
      setError('Failed to add income. Please try again.');
    }
  };

  //   addExpense(formData);
  //   setFormData({
  //     user: '6736ff16f6c87efbf91b0c4b',
  //     title: '',
  //     amount: 0,
  //     category: '',
  //     description: '',
  //     date: '',
  //   });
  // };

  // If the context is null, display an error message
  if (!context) return <p className="error">Error: Context is unavailable</p>;

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <h2>Add Expense</h2>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={e => setFormData({ ...formData, title: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={formData.amount}
        onChange={e => setFormData({ ...formData, amount: +e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Category"
        value={formData.category}
        onChange={e => setFormData({ ...formData, category: e.target.value })}
        required
      />
      <input
        type="date"
        value={formData.date}
        onChange={e => setFormData({ ...formData, date: e.target.value })}
        required
      />
      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={e => setFormData({ ...formData, description: e.target.value })}
      />
      <button type="submit"  className="add-button">Add </button>
    </form>
  );
};

export default ExpenseForm;
