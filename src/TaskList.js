import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onToggle }) {
  return (
    <div>
      <h2>Sarcinile Utilizatorului</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Sarcină</th>
            <th>Finalizată</th>
            <th>Acțiuni</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} onToggle={onToggle} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;
