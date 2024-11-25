import React, { useContext, useState } from 'react';
import { IncomeContext } from '../../context/IncomeContext'; // Adjust the path as needed
import './BudgetForm.css';

const BudgetForm: React.FC = () => {
  const context = useContext(IncomeContext);

  // Provide a default fallback for the `addbedget` method
  const addBudget = context?.addBudget || (() => {});

  const [formData, setFormData] = useState({
    user: '6736ff16f6c87efbf91b0c4b',
    title: '',
    amount: 0,
    category: '',
    description: '',
    date: '',
  });

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.title || formData.amount <= 0 || !formData.date || !formData.category) {
      setError('All fields are required and must be valid.');
      return;
    }

    try {
      addBudget(formData);
      setFormData({ user: '6736ff16f6c87efbf91b0c4b', title: '', amount: 0, category: '', description: '', date: '' });
      setError(null);
    } catch (err) {
      console.error('Error adding income:', err);
      setError('Failed to add income. Please try again.');
    }
  };

  // Show an error if the context is unavailable
  if (!context) return <p className="error">Error: Context is unavailable</p>;

  return (
    <form onSubmit={handleSubmit} className="budget-form">
      <h2>Add Budget</h2>
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
      <button type="submit" className="add-button">Add</button>
    </form>
  );
};

export default BudgetForm;
