import React, { useState } from 'react';

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [history, setHistory] = useState<TodoItem[][]>([]);

  const handleAddTodo = (todoText: string) => {
    const newTodo: TodoItem = {
      id: Date.now(),
      text: todoText,
      completed: false,
    };

    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    setHistory([...history, newTodos]);
    setCurrentIndex(currentIndex + 1);
  };

  const handleToggleTodo = (id: number) => {
    
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    const updatehistory=[...history,updatedTodos];
    setHistory(updatehistory)
      
  };

  const handleUndo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setTodos(history[currentIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setTodos(history[currentIndex + 1]);
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <button onClick={handleUndo} disabled={currentIndex <= 0}>Undo</button>
      <button onClick={handleRedo} disabled={currentIndex >= history.length - 1}>Redo</button>
      {currentIndex <= 0 && <h2>Kindly add todo items</h2>}
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleTodo(todo.id)}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Add Todo"
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter') {
            handleAddTodo(e.currentTarget.value);
            e.currentTarget.value = '';
          }
        }}
      />
    </div>
  );
};

export default TodoList;
