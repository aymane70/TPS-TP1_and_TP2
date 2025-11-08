import React from 'react';

export default function TaskList({ tasks, onToggle, onRemove }) {
  if (!tasks || tasks.length === 0) return <p className="empty">No tasks found.</p>;

  return (
    <ul className="task-list">
      {tasks.map(t => (
        <li key={t._id} className={t.done ? 'done' : ''}>
          <span onClick={() => onToggle(t._id, !t.done)} role="button" tabIndex={0}>
            {t.text}
          </span>
          <button className="delete" onClick={() => onRemove(t._id)}>Trash</button>
        </li>
      ))}
    </ul>
  );
}
