import React from 'react';

function TaskItem({ task, onToggle }) {
  return (
    <tr style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
      <td>{task.id}</td>
      <td>{task.text}</td>
      <td>{task.completed ? 'Da' : 'Nu'}</td>
      <td>
        <button onClick={() => onToggle(task.id)}>
          {task.completed ? 'Anulează' : 'Finalizează'}
        </button>
      </td>
    </tr>
  );
}

export default TaskItem;
