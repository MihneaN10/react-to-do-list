import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import './App.css';

function App() {
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem('todoAppUsers');
    return storedUsers ? JSON.parse(storedUsers) : [
      { id: 1, name: 'Utilizator 1', tasks: [] },
      { id: 2, name: 'Utilizator 2', tasks: [] },
    ];
  });

  const [selectedUserId, setSelectedUserId] = useState(1);
  const [newTask, setNewTask] = useState('');
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUserName, setEditedUserName] = useState('');

  const selectedUser = users.find(user => user.id === selectedUserId);

  useEffect(() => {
    localStorage.setItem('todoAppUsers', JSON.stringify(users));
  }, [users]);

  const addTask = () => {
    if (newTask.trim() !== '') {
      const updatedUsers = users.map(user =>
        user.id === selectedUserId
          ? { ...user, tasks: [...user.tasks, { id: user.tasks.length + 1, text: newTask, completed: false }] }
          : user
      );
      setUsers(updatedUsers);
      setNewTask('');
    }
  };

  const toggleTask = (taskId) => {
    const updatedUsers = users.map(user =>
      user.id === selectedUserId
        ? { ...user, tasks: user.tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task) }
        : user
    );
    setUsers(updatedUsers);
  };

  const addUser = () => {
    const newUser = {
      id: users.length + 1,
      name: `Utilizator ${users.length + 1}`,
      tasks: []
    };
    setUsers([...users, newUser]);
  };

  const deleteUser = (userId) => {
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
  };

  const startEditingUser = (userId) => {
    setEditingUserId(userId);
    setEditedUserName(users.find(user => user.id === userId).name);
  };

  const saveEditedUser = () => {
    const updatedUsers = users.map(user =>
      user.id === editingUserId
        ? { ...user, name: editedUserName }
        : user
    );
    setUsers(updatedUsers);
    setEditingUserId(null);
  };

  const cancelEditingUser = () => {
    setEditingUserId(null);
  };

  const filteredTasks = selectedUser ? selectedUser.tasks : [];

  return (
    <div className="app-container">
      <h1>To-Do List Manager</h1>
      
      <div className="user-management">
        <label>Selectează utilizator:</label>
        <select value={selectedUserId} onChange={(e) => setSelectedUserId(parseInt(e.target.value))}>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <button onClick={addUser}>Adaugă Utilizator</button>
        {editingUserId === null ? (
          <button onClick={() => startEditingUser(selectedUserId)}>Editează Nume</button>
        ) : (
          <div className="edit-controls">
            <input
              type="text"
              value={editedUserName}
              onChange={(e) => setEditedUserName(e.target.value)}
            />
            <button onClick={saveEditedUser}>Salvează</button>
            <button onClick={cancelEditingUser}>Anulează</button>
          </div>
        )}
        <button onClick={() => deleteUser(selectedUserId)}>Șterge Utilizator</button>
      </div>

      <div className="task-management">
        <input
          type="text"
          placeholder="Adaugă o sarcină nouă"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Adaugă</button>
      </div>

      <TaskList tasks={filteredTasks} onToggle={toggleTask} />
    </div>
  );
}

export default App;
