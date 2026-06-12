import React, { useState } from 'react';
import './App.css';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false
      }]);
      setInputValue('');
    }
  };

  const toggleTodo = (id) => {
    // Find the todo to complete
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex !== -1) {
      const completedTodo = todos[todoIndex];

      // Remove from active todos
      const newTodos = todos.filter(todo => todo.id !== id);
      setTodos(newTodos);

      // Add to completed todos
      setCompletedTodos([completedTodo, ...completedTodos]);
    }
  };

  return (
    <div className="App">
      <div className="glass-menu">
        <h1>✨ Todo App</h1>
        <form onSubmit={handleAddTodo} className="add-form">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="What needs to be done?"
            className="todo-input"
          />
          <button type="submit" className="add-btn">Add</button>
        </form>
      </div>

      {/* Active Todos */}
      <div className="todos-section">
        <h2>📋 Active Tasks ({todos.length})</h2>
        <ul className="todos-list">
          {todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  id={`todo-${todo.id}`}
                  checked={false} // Always false for active todos
                  onChange={() => toggleTodo(todo.id)}
                  className="todo-checkbox"
                />
                <label htmlFor={`todo-${todo.id}`} className="checkbox-label"></label>
              </div>
              <div className="content-wrapper">
                <div className="progress-bg">
                  <div className="progress-fill"></div>
                </div>
                <span className="todo-text">{todo.text}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Completed Todos */}
      <div className="todos-section">
        <h2>✅ Completed Tasks ({completedTodos.length})</h2>
        <ul className="todos-list completed-list">
          {completedTodos.map((todo) => (
            <li key={todo.id} className="todo-item completed-item">
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  id={`completed-${todo.id}`}
                  checked={true}
                  onChange={() => { }} // Disabled for completed
                  className="todo-checkbox"
                  disabled
                />
                <label htmlFor={`completed-${todo.id}`} className="checkbox-label"></label>
              </div>
              <div className="content-wrapper">
                <div className="progress-bg">
                  <div className="progress-fill completed"></div>
                </div>
                <span className="todo-text completed strike-delay">{todo.text}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
