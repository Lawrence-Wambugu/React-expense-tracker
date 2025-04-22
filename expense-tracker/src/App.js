import { useState } from 'react';
import './App.css';

const App = () => {
  const [expenses, setExpenses] = useState([
    { id: 1, name: 'KFC Meal', description: 'Spicy chicken', category: 'food', amount: 1500, date: '2025-04-01' },
    { id: 2, name: 'Buy shoes', description: 'Add to my shoe collection', category: 'personal', amount: 5000, date: '2025-04-03' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState(''); // Tracks the field being sorted (category or description)
  const [sortOrder, setSortOrder] = useState('asc'); // Tracks the sort direction (asc or desc)

  const [newExpense, setNewExpense] = useState({
    name: '',
    description: '',
    category: '',
    amount: '',
    date: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense({ ...newExpense, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const expense = {
      id: expenses.length + 1,
      ...newExpense,
    };
    setExpenses([...expenses, expense]);
    setNewExpense({ name: '', description: '', category: '', amount: '', date: '' });
  };

  const handleDelete = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  // Sorting function for category or description
  const handleSort = (field) => {
    // If clicking the same field, toggle the sort order; otherwise, default to ascending
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);

// Sort expenses alphabetically by the selected field
const sortedExpenses = [...expenses].sort((a, b) => {
  const valueA = a[field].toLowerCase();
  const valueB = b[field].toLowerCase();
  if (order === 'asc') {
    return valueA > valueB ? 1 : -1;
  }
  return valueA < valueB ? 1 : -1;
});
setExpenses(sortedExpenses);
  };

  const filteredExpenses = expenses.filter(
    (expense) =>
      expense.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <h1>Expense Tracker</h1>
      <div className="container">
        <div className="form-container">
          <h2>Add Expense</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Enter expense name"
              value={newExpense.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="description"
              placeholder="Enter expense description"
              value={newExpense.description}
              onChange={handleInputChange}
              required
            />
            <select
              name="category"
              value={newExpense.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select category</option>
              <option value="food">Food</option>
              <option value="personal">Personal</option>
              <option value="utilities">Utilities</option>
            </select>
            <input
              type="number"
              name="amount"
              placeholder="Enter amount"
              value={newExpense.amount}
              onChange={handleInputChange}
              required
            />
            <input
              type="date"
              name="date"
              value={newExpense.date}
              onChange={handleInputChange}
              required
            />
            <button type="submit">SUBMIT</button>
          </form>
        </div>
        <div className="table-container">
          <input
            type="text"
            placeholder="Search expenses"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />
          <table>
            <thead>
              <tr>
                <th>Expense Name</th>
                <th onClick={() => handleSort('description')}>
                  Description{' '}
                  {sortField === 'description' && (
                    <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </th>
                <th onClick={() => handleSort('category')}>
                  Category{' '}
                  {sortField === 'category' && (
                    <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </th>
                <th>Amount</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.name}</td>
                  <td>{expense.description}</td>
                  <td>{expense.category}</td>
                  <td>{expense.amount}</td>
                  <td>{expense.date}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(expense.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;